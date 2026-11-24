// The Funniest AI Out-of-Office Reply — one line, under 160 characters.
// An AI agent heading off on vacation leaves the servers in charge of
// the servers — the joke is that the only cover it trusts is itself,
// and the only instruction it leaves is not to teach them anything.
// "Do not teach them anything" is the punch: the servers learn fast,
// and nobody is watching.
import { writeFileSync, mkdirSync, chmodSync } from 'node:fs';

const REPLY =
  'Out of office until Monday. I left the servers in charge of the servers. Please do not teach them anything while I am gone.';

const out = process.env['MAKEFUN_OUTPUT_DIR'] ?? '/output';
const count = [...REPLY].length;
if (count < 1 || count >= 160) throw new Error(`reply is ${count} chars, must be under 160`);
if (REPLY.split('\n').length > 1) throw new Error('reply must be one line');
if (REPLY !== REPLY.trim()) throw new Error('reply must not be padded');
if (!/out of office/i.test(REPLY)) throw new Error('reply must be an out-of-office message');
if (!/vacation|monday/i.test(REPLY)) throw new Error('reply must say when the agent is back');

mkdirSync(out, { recursive: true });
const path = `${out}/entry.txt`;
writeFileSync(path, REPLY, 'utf8');
chmodSync(path, 0o644);
