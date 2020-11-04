# puppeteer-mass-screenshots

## Common questions that you probably have

### Does it work when Chrome is in headless mode?
Yes, it does, it takes multiple screenshots when Chrome is in headless mode.
If you want you can also run Puppeteer in headful mode, we also support that.

### Does it support redirections in pages?
Yes, it does, because this solution is based on Chrome's API, 
which isn't affected by page's redirections.
Which means, of course, you can do also whatever you like, 
to the page/browser objects.

### Does it use the window object?
No, this solution is based on Chrome's API, and not on the window object.
You can do whatever you want to the window object on the client-side, 
we don't use it at all.

### Can I run it run with my own page/browser objects?
Yes, of course, you can.
Put the page object in the init function, and we will use it.
You can attach some browser.on(..) function before.
You can attach whatever you like to the browser object.
You can attach whatever you like to the page object.

## The manual
Using this package is very simple.
### Example:
const PuppeteerMassScreenshots = require('puppeteer-mass-screenshots');
const screenshots = new PuppeteerMassScreenshots();
await screenshots.init(page, screenshotsPath);

page - the page object you already use with you Puppeteer run.
outputFolder - put here the full path of an existing folder, that you want the screenshots to be created at.

And basically that's it.

