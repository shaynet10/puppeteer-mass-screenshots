const { join } = require('path');
const fs = require('fs').promises;
const puppeteer = require('puppeteer');
const emptyFunction = async() => {};
const defaultAfterWritingNewFile = async(filename) => console.log(`${filename} was written`);

class PuppeteerMassScreenshots {
    async init(
        outputFilesPath = '/tmp', 
        options = {}
) {
    const runOptions = {
        page: null,
        beforeWritingImageFile: emptyFunction,
        afterWritingImageFile: defaultAfterWritingNewFile,
        beforeAck: emptyFunction,
        afterAck: emptyFunction,
        ...options
    }
        this.outputFilesPath = outputFilesPath;
        this.page = runOptions.page || await this.getPage();
        this.client = await this.page.target().createCDPSession();
        this.canScreenshot = true;
        this.client.on('Page.screencastFrame', async (frameObject) => {
            if (this.canScreenshot) {
                await runOptions.beforeWritingImageFile();
                const filename = await this.writeImageFilename(frameObject.data); 
                await runOptions.afterWritingImageFile(filename);
                try {
                    await runOptions.beforeAck();
                    await this.client.send('Page.screencastFrameAck', { sessionId: frameObject.sessionId});
                    await runOptions.afterAck();
                } catch(e) {
                    this.canScreenshot = false;
                }
            }
        });
    }

    async getPage() {
        this.browser = await puppeteer.launch();
        const pages = await this.browser.pages();
        return pages[0];
    }

    async writeImageFilename(data) {
        const filename = join(this.outputFilesPath, Date.now().toString() + '.jpg');
        await fs.writeFile(filename, data, 'base64');
        return filename;
    }

    async start(options = {}) {
        const startOptions = {
            format: 'jpeg',
            quality: 100,
            maxWidth: 1920,
            maxHeight: 1080,
            everyNthFrame: 1,
            ...options
        };
        return this.client.send('Page.startScreencast', startOptions);
    }

    async stop() {
        return this.client.send('Page.stopScreencast');
    }
}

module.exports = PuppeteerMassScreenshots;
