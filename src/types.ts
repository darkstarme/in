export type Tier = 'unverified' | 'verified' | 'pro' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  verified: boolean;
  tier: Tier;
}