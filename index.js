const { join } = require('path');
const fs = require('fs').promises;
const emptyFunction = async() => {/**/};
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
        isSequentialFrameNaming: false,
        ...options
    }
        this.isSequentialFrameNaming = runOptions.isSequentialFrameNaming;
        this.page = page;
        this.outputFolder = outputFolder;
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

    async writeImageFilename(data) {
        this.frameNumber = this.frameNumber === undefined ? 0 : this.frameNumber + 1;
        const basename = this.isSequentialFrameNaming ? 'frame' + this.frameNumber.toString().padStart(6, '0') : Date.now();
        const filename = join(this.outputFolder, basename + this.extension);
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
        this.extension = `.${startOptions.format}`
        return this.client.send('Page.startScreencast', startOptions);
    }

    async stop() {
        return this.client.send('Page.stopScreencast');
    }
}

module.exports = PuppeteerMassScreenshots;
