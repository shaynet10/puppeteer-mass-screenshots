const { join } = require('path');
const fs = require('fs').promises;
const puppeteer = require('puppeteer');

class PuppeteerMassScreenshots {
    async init(outputFilesPath = '/tmp', page = null) {
        this.outputFilesPath = outputFilesPath;
        this.page = page || await this.getPage();
        this.client = await this.page.target().createCDPSession();
        this.canScreenshot = true;
        this.client.on('Page.screencastFrame', async (frameObject) => {
            console.log(`Page.screencastFrame ${this.canScreenshot}`)
            if (this.canScreenshot) {
                this.writeImageFilename(frameObject.data); 
                try {
                    await this.client.send('Page.screencastFrameAck', { sessionId: frameObject.sessionId});
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
        return fs.writeFile(filename, data, 'base64');
    }

    async start(
        format = 'jpeg',
        quality = 100,
        maxWidth = 1920,
        maxHeight = 1080,
        everyNthFrame = 1
    ) {
        return this.client.send('Page.startScreencast', { format, quality, maxWidth, maxHeight, everyNthFrame });
    }

    async stop() {
        return this.client.send('Page.stopScreencast');
    }
}

module.exports = PuppeteerMassScreenshots;
