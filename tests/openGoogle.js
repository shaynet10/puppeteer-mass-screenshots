const PuppeteerMassScreenshots = require('../index');
const screenshots = new PuppeteerMassScreenshots();
const puppeteer = require('puppeteer');
const { join } = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = (await browser.pages())[0];
    const screenshotsPath = join(__dirname, 'images');
    const beforeWritingImageFile = () => console.log('writing new image');
    await screenshots.init(page, screenshotsPath, { beforeWritingImageFile });
    await page.goto('https://google.com');
    await screenshots.start();
    // await page.waitForNavigation({ waitUntil: 'domcontentloaded'});
    const input = await page.$('input[name=q]');
    await input.type('puppeteer-mass-screenshots', { delay: 100 });
    await input.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    setTimeout(() => console.log('Done'), 3000);
    await screenshots.stop();
    await browser.close();
  })();