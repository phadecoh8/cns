import {
  afterAll, beforeAll, describe, expect, it, vi 
} from 'vitest';
import type { AddressInfo } from 'node:net';

vi.mock('../modules/waitlist/service.js', () => ({
  createEntry: vi.fn(),
  listEntries: vi.fn(),
}));

import { createApp } from '../app.js';
import { createEntry } from '../modules/waitlist/service.js';

const app = createApp();
let server: ReturnType<typeof app.listen>;
let baseUrl = '';

beforeAll(async () => {
  server = app.listen(0);
  await new Promise<void>((resolve) => {
    server.once('listening', resolve);
  });

  const address = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

function makeEntry(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Demo Student',
    school: 'Example University',
    faculty: 'Engineering',
    department: 'Computer Engineering',
    level: '200',
    email: 'student@example.test',
    consent: 'true',
    website: '',
    startedAt: Date.now() - 5000,
    ...overrides,
  };
}

async function postWaitlist(body: Record<string, unknown>) {
  return fetch(`${baseUrl}/api/v1/waitlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('waitlist API', () => {
  it('requires consent', async () => {
    const response = await postWaitlist(makeEntry({ consent: 'false' }));

    expect(response.status).toBe(400);
  });

  it('rejects a filled honeypot field', async () => {
    const response = await postWaitlist(makeEntry({ website: 'filled' }));

    expect(response.status).toBe(400);
  });

  it('rejects submissions that arrive too quickly', async () => {
    const response = await postWaitlist(
      makeEntry({ startedAt: Date.now() - 500 }),
    );

    expect(response.status).toBe(400);
  });

  it('returns a clear response for a duplicate email', async () => {
    vi.mocked(createEntry).mockResolvedValue('already_registered');
    const response = await postWaitlist(makeEntry());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe('already_registered');
    expect(body.message).toBe('This email is already registered.');
  });

  it('rejects unauthenticated founder dashboard requests', async () => {
    const response = await fetch(`${baseUrl}/api/v1/admin/waitlist`);

    expect(response.status).toBe(401);
  });
});
