# puppeteer-mass-screenshots - options
## Add your code before/after operations of puppeteer mass screenshots 
### beforeWritingImageFile
Add any async code you want to be executed before each image is written to the destination folder.

### afterWritingImageFile
Add any async code you want to be executed after each image is written to the destination folder.
The function should have **filename** as the first parameter, which will contain the created filename.

### beforeAck
After file is written we send ack to the browser to inform it that the image was received, so here
you can put any async code you want to be executed before this ack is sent.

### afterAck
After file is written we send ack to the browser to inform it that the image was received, so here
you can put any async code you want to be executed after this ack is sent.

### basic usage
See our [main page](./README.md "Puppeteer mass screenshots") 


