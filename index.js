const { join } = require('path');
const fs = require('fs').promises;
const emptyFunction = async() => {};
const defaultAfterWritingNewFile = async(filename) => console.log(`${filename} was written`);

class PuppeteerMassScreenshots {
    async init(
        page, 
        outputFolder,
        options = {}
) {
    const runOptions = {
        beforeWritingImageFile: emptyFunction,
        afterWritingImageFile: defaultAfterWritingNewFile,
        beforeAck: emptyFunction,
        afterAck: emptyFunction,
        ...options
    }
        this.page = page;
        this.outputFolder = outputFolder;
        this.client = await this.page.target().createCDPSession();
        this.canScreenshot = true;
        this.lastFrame = new Date();
        this.client.on('Page.screencastFrame', async (frameObject) => {
            if (this.canScreenshot) {
                await runOptions.beforeWritingImageFile();
                let duration = (new Date() - this.lastFrame) / 1000;
                this.lastFrame = new Date();
                const filename = await this.writeImageFilename(frameObject.data); 
                await runOptions.afterWritingImageFile(filename,duration);
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

    async writeImageFilename(data) {
        const filename = join(this.outputFolder, Date.now().toString() + '.jpg');
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
