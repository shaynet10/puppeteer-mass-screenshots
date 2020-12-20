# puppeteer-mass-screenshots - init options
### beforeWritingImageFile
Add any async code you want to be executed before each image is written to the destination folder.

### afterWritingImageFile
Add any async code you want to be executed after each image is written to the destination folder.
The function should have **filename** as the first parameter, which will contain the created filename.

#### Example:
```javascript
const options = {
    afterWritingImageFile: async(filename) => console.log(`${filename} was written`)
};
await screenshots.init(page, screenshotsPath, options);
```

### beforeAck
After the file is written we send ack to the browser to inform it that the image was received, so here
you can put any async code you want to be executed before this ack is sent.

### afterAck
After the file is written we send ack to the browser to inform it that the image was received, so here
you can put any async code you want to be executed after this ack is sent.

### basic usage
See our [main page](./README.md "Puppeteer mass screenshots") 

