import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));

await page.goto('http://localhost:5183', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'C:/Users/VARIND~1/AppData/Local/Temp/claude/e--Projects-varinder-portfolio2/7e92eeb5-726e-4ec5-b8f1-77da159a8db2/scratchpad/hero.png' });

const fullHeight = await page.evaluate(() => document.body.scrollHeight);
await page.setViewportSize({ width: 1280, height: fullHeight });
await page.waitForTimeout(500);
await page.screenshot({ path: 'C:/Users/VARIND~1/AppData/Local/Temp/claude/e--Projects-varinder-portfolio2/7e92eeb5-726e-4ec5-b8f1-77da159a8db2/scratchpad/full.png', fullPage: true });

console.log('ERRORS:', JSON.stringify(errors));
await browser.close();
