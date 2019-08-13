import puppeteer from 'puppeteer';
import { percySnapshot } from '@percy/puppeteer';

describe('Integration test with visual testing', () => {
  it('Loads the homepage', async () => {
    const browser = await puppeteer.launch({
      executablePath: './node_modules/puppeteer/.local-chromium/win64-674921/chrome-win/chrome.exe',
    });
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:8080/');
    await percySnapshot(page, 'Home');
  });
});
