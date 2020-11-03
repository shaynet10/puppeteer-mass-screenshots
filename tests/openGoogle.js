const PuppeteerMassScreenshots = require('../index');
const puppeteer = require('puppeteer');
const { join } = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = (await browser.pages())[0];
    const screenshots = new PuppeteerMassScreenshots();
    const screenshotsPath = join(__dirname, 'images');
    const beforeWritingImageFile = () => console.log('writing new image');
    await screenshots.init(screenshotsPath, { page, beforeWritingImageFile });
    await page.goto('https://google.com');
    await screenshots.start();
    // await page.waitForNavigation({ waitUntil: 'domcontentloaded'});
    const input = await page.$('input[name=q]');
    await input.type('puppetter-mass-screenshots', { delay: 1000 });
    await input.press('Enter');
    // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await screenshots.stop();
    await browser.close();
  })();