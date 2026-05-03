#!/usr/bin/env node
import 'dotenv/config';
import { callGeminiStreams } from './src/callGemini.js';

console.log('Node.js version:', process.version);
console.log('API Key loaded:', process.env.GEMINI_API_KEY ? 'YES' : 'NO');

const mockRes = {
  write: (data) => console.log('Stream data:', data),
  end: () => console.log('Stream ended')
};

callGeminiStreams('Hello, explain AI simply', mockRes)
  .then(() => console.log('✅ SUCCESS: Streaming works!'))
  .catch(err => console.error('❌ Error:', err.message));
