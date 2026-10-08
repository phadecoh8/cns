import {
  describe, expect, it 
} from 'vitest';
import {
  newsletterSchema, tokenSchema 
} from '../modules/newsletter/schema.js';

describe('newsletter input', () => {
  it('normalizes valid email addresses', () => {
    const result = newsletterSchema.safeParse({email: 'Reader@Example.test',});

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.email).toBe('reader@example.test');
    }
  });

  it('rejects malformed confirmation tokens', () => {
    expect(tokenSchema.safeParse({ token: 'short' }).success).toBe(false);
  });
});
