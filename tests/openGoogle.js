const PuppeteerMassScreenshots = require('../index');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = (await browser.pages())[0];
    const screenshots = new PuppeteerMassScreenshots();
    const screenshotsPath = __dirname;
    await screenshots.init(screenshotsPath, page);
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
