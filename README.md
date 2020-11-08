# puppeteer-mass-screenshots
[FAQ](#FAQ "FAQ") | [Manual](#Manual "Manual") | [InitOptions](InitOptions.md "InitOptions") | [StartOptions](StartOptions.md "StartOptions")

<a name="FAQ"></a>
## FAQ

### Does it work when Chrome is in headless mode?
Yes, it does, it supports Chrome in headless mode, and in headful mode.

### Does it support redirections in pages?
Yes, it does, this solution is based on Chrome's API, 
which isn't affected by page's redirections.

### Does it use the window object?
No, it doesn't use the window object.

### Can I run it with my own page/browser objects?
Yes, put the page object in the init function, and we will use it.

### Will it change my browser/page/window objects?
No, it won't, we use Chrome's API only.

<a name="Manual"></a>
## Manual
### Example:
```javascript
// You'll probably want this code in some async init function
const screenshotsPath = join(__dirname, 'images');
const PuppeteerMassScreenshots = require('puppeteer-mass-screenshots');
const screenshots = new PuppeteerMassScreenshots();
await screenshots.init(page, screenshotsPath);

// Use the start function where you want to start taking screenshots
await screenshots.start();

// Do some things with the page
// Maybe some automation code

await screenshots.stop(); // Do this before browser is closed

```

### page 
the page object you already use with your Puppeteer run.

### outputFolder
a full path of an existing folder, to be used to save screenshots.

### init options
See our [Init options page](InitOptions.md "Puppeteer mass screenshots - init options") 

### start options
See our [Start options page](StartOptions.md "Puppeteer mass screenshots - start options")
