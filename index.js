const { join } = require('path');
const fs = require('fs').promises;
const emptyFunction = async() => {/**/};
const defaultAfterWritingNewFile = async(filename) => console.log(`${filename} was written`);

const assert = (value, message) => {
    if (!value)
        throw new Error(message);
};

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
                if (this.isSequentialFrameNaming) {
                    this.cachedFrame = frameObject.data;
                } else {
                    const filename = await this.writeImageFilename(frameObject.data);
                    await runOptions.afterWritingImageFile(filename);
                }
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

    async writeImageFilename(data = this.cachedFrame) {
        if (!data) {
            data = await this.page.screenshot({
                type: this.format,
                clip: {
                    x: 0,
                    y: 0,
                    width: this.maxWidth,
                    height: this.maxHeight
                },
                omitBackground: false
            })
        }
        if (!this.cachedFrame) this.cachedFrame = data;
        this.frameNumber = this.frameNumber === undefined ? 0 : this.frameNumber + 1;
        const basename = this.isSequentialFrameNaming ? 'frame' + this.frameNumber.toString().padStart(6, '0') : Date.now();
        const filename = join(this.outputFolder, basename + '.' + this.format);
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
        assert(startOptions.format === 'png' || startOptions.format === 'jpeg', 'Unknown options.format value: ' + startOptions.format);
        this.format = startOptions.format;
        this.maxWidth = startOptions.maxWidth;
        this.maxHeight = startOptions.maxHeight;
        return this.client.send('Page.startScreencast', startOptions);
    }

    async stop() {
        this.frameNumber = undefined;
        return this.client.send('Page.stopScreencast');
    }
}

module.exports = PuppeteerMassScreenshots;
