const PuppeteerMassScreenshots = require('../index');
const screenshots = new PuppeteerMassScreenshots();
const puppeteer = require('puppeteer');
const { join } = require('path');

/**
 * Open google.com web page,
 * take screen,
 * input text,
 * take screen,
 * search for result,
 * take screen,
 * finish.
 * Frames will be saved with sequential file names: file000000.jpeg - file000002.jpeg
 *
 * As another example, you can evaluate script and save frame in for loop:
 * for (const i = 0; i < endLoop; i++) {
 *     await page.evaluate(`myScript(${i})`);
 *     await screenshots.writeImageFilename();
 * }
 */
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = (await browser.pages())[0];
    const screenshotsPath = join(__dirname, 'images');
    await screenshots.init(page, screenshotsPath, {isSequentialFrameNaming: true});
    await page.goto('https://google.com');
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    await screenshots.start();
    const input = await page.$('input[name=q]');
    await screenshots.writeImageFilename();
    await input.type('puppeteer-mass-screenshots', { delay: 100 });
    await screenshots.writeImageFilename();
    await input.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await screenshots.writeImageFilename();
    setTimeout(() => console.log('Done'), 3000);
    await screenshots.stop();
    await browser.close();
  })();
