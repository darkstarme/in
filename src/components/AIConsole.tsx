import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { queryModel } from '../api/aiApi';
import { AI_PROVIDERS } from '../constants/aiProviders';

export default function AIConsole() {
  const [model, setModel] = useState(AI_PROVIDERS[0].id);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  async function onSend() {
    try {
      const res = await queryModel(model, prompt);
      setResponse(res);
    } catch {
      toast.error('AI request failed');
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl text-white font-semibold">AI Assistant</h2>
      <select
        value={model}
        onChange={e => setModel(e.target.value)}
        className="bg-gray-700 text-white px-3 py-2 rounded"
      >
        {AI_PROVIDERS.map(p => (
          <option key={p.id} value={p.id}>{p.label}</option>
        ))}
      </select>

      <textarea
        rows={4}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Type your prompt…"
        className="w-full bg-gray-800 text-gray-200 p-3 rounded"
      />

      <button onClick={onSend} className="bg-primary text-white px-4 py-2 rounded">
        Send
      </button>

      {response && (
        <div className="mt-4 p-4 bg-surface text-gray-100 rounded">
          <h3 className="font-semibold mb-2">Response</h3>
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </div>
  );
}