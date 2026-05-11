const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:5173';
const API_URL = 'http://localhost:8000';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots');

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

async function screenshot(page, name) {
  const filePath = path.join(SCREENSHOT_DIR, `${name}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`  ✓ ${name}`);
}

async function takePublicScreenshots(browser) {
  console.log('\n📷 Frontend pages...');
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const pages = [
    { name: '01-home', url: '/' },
    { name: '02-projects', url: '/projects' },
    { name: '03-about', url: '/about' },
    { name: '04-skills', url: '/skills' },
    { name: '05-tools', url: '/tools' },
    { name: '06-blog', url: '/blog' },
  ];

  for (const { name, url } of pages) {
    await page.goto(`${BASE_URL}${url}`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(2500);
    await screenshot(page, name);
  }

  await context.close();
}

async function takeAdminScreenshots(browser) {
  console.log('\n📷 Admin pages...');

  const captchaResp = await fetch(`${API_URL}/api/admin/captcha`);
  const captchaData = await captchaResp.json();
  const { token: captchaToken, question } = captchaData;

  const match = question.match(/(\d+)\s*([+\-×])\s*(\d+)/);
  let answer;
  if (match) {
    const a = parseInt(match[1]), b = parseInt(match[3]);
    if (match[2] === '+') answer = a + b;
    else if (match[2] === '-') answer = a - b;
    else if (match[2] === '×') answer = a * b;
  }
  console.log(`  Captcha: ${question} = ${answer}`);

  const loginResp = await fetch(`${API_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: ADMIN_USER, password: ADMIN_PASS, captcha_token: captchaToken, captcha_answer: String(answer) }),
  });
  const loginData = await loginResp.json();
  const token = loginData.access_token;
  if (!token) { console.error('  Login failed:', loginData); return; }
  console.log('  Logged in');

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1000);
  await screenshot(page, '07-admin-login');

  await page.evaluate((t) => localStorage.setItem('admin_token', t), token);

  const adminPages = [
    { name: '08-admin-dashboard', url: '/admin' },
    { name: '09-admin-content', url: '/admin/content' },
    { name: '10-admin-stats', url: '/admin/stats' },
    { name: '11-admin-settings', url: '/admin/settings' },
  ];

  for (const { name, url } of adminPages) {
    await page.goto(`${BASE_URL}${url}`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(2000);
    await screenshot(page, name);
  }

  await context.close();
}

(async () => {
  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });

  try {
    await takePublicScreenshots(browser);
    await takeAdminScreenshots(browser);
    console.log(`\n✅ Screenshots saved to: ${SCREENSHOT_DIR}`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();
