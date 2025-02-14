import { chromium } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
import { JWT } from 'next-auth/jwt';
import { getSessionTokenForTest } from '__e2e-tests__/utils/auth';
import { ROLES } from '@/lib/constants';

dotenv.config();

const COOKIE_EXPIRY_DAYS = 1;
const DOMAIN = 'localhost';
const STORAGE_STATE_PATH = path.join(__dirname, '/state.json');

export default async function globalSetup() {
  const payload: JWT = {
    sub: '08515a82-a8e5-40f4-943e-f3d767752d97',
    role: ROLES[0],
  };

  let browser;
  let context;

  try {
    browser = await chromium.launch();
    context = await browser.newContext();

    const sessionToken = await getSessionTokenForTest(payload);

    await context.addCookies([
      {
        name: 'authjs.session-token',
        value: sessionToken,
        domain: DOMAIN,
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        expires: Math.round(
          (Date.now() + 86400000 * COOKIE_EXPIRY_DAYS) / 1000
        ),
      },
    ]);

    await context.storageState({ path: STORAGE_STATE_PATH });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in global setup:', error.message);
    }
    throw error;
  } finally {
    await context?.close();
    await browser?.close();
  }
}
