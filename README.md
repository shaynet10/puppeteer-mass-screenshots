# puppeteer-mass-screenshots
[Prerequisites](#Prerequisites "Prerequisites") | [Installation](#Installation "Installation") | [Manual](#Manual "Manual") | [InitOptions](InitOptions.md "InitOptions") | [StartOptions](StartOptions.md "StartOptions") | [FAQ](#FAQ "FAQ")

<p>
Puppeteer mass screenshots is a simple Puppeteer's plugin to create automatic screenshots for every new frame appears in the browser.
<p>

<h2> Why </h2>
<p>
Unlike the regular <a href="https://pptr.dev/#?product=Puppeteer&version=v5.4.1&show=api-pagescreenshotoptions"> screenshots function</a> supplied by Puppeteer,
our plugin runs on Chrome's API and doesn't affect Puppeteer's run time.
</p>
<p>So basically by using this plugin, you'll be able to create very fast screenshots, and it won't slow your run time </p> 

<a name="Prerequisites"></a>
<h2> Prerequisites </h2>
<p>In order to use this plugin:</p>
<p>
    <ul>
        <li>Puppeteer must be installed.</li>
        <li>Pupepteer's page object must be created.</li>
    </ul>
</p>

<a name="Installation"></a>
<h2>Installation</h2>
<p>To install the plugin to your project please use:</p>

```javascript
npm install puppeteer-mass-screenshots
```
<p>
You'll probably prefer to add it to your package.json file so you can use:</p>

```
npm install --save-prod puppeteer-mass-screenshots
```

<a name="Manual"></a>
<h2>Manual</h2>
<p>
Once Puppeteer mass screenshots is installed, you can require it in your project:

```javascript
const PuppeteerMassScreenshots = require('puppeteer-mass-screenshots');
```
</p>
<p>
In your constructor create:

```javascript
const screenshots = new PuppeteerMassScreenshots();
```
</p> 

<p>
After you have page object

```javascript
await screenshots.init(page, screenshotsPath);
```
<ul> 
<li><b>page</b> - Puppeteer page object (related to the browser).</li>
<li><b>screenshotsPath</b> - where to save the created images</li>
</ul>
</p>
<p>
To start the automatic screenshots:

```javascript
await screenshots.start();
```
</p>

<p>
To stop the automatic screenshots:

```javascript
await screenshots.stop();
```
<p>
    <b>Important</b> - call screenshots.stop before browser is closed.
</p>

<a name="FAQ"></a>
<h2> FAQ </h2>

<h3> Does it support Chrome in headless mode?</h3>
<p>
Yes, it does.
</p>
<p>
it supports Chrome in headless / headful mode.
</p>
<br/>
<h3> Does it support redirections in pages? </h3>
<p>Yes, it does.</p>
<p>This plugin is based on Chrome's API, </p>
<p>
which isn't affected by page's redirections.
</p>
<br/>
<h3> Does it use the window object? </h3>
<p>No, it doesn't use the window object.</p>
<br/>

<h3> Can I run this plugin with my own page/browser objects? </h3>
<p>
Yes.
</p>
<p>put the page object in the init function, and the plugin will use it.
</p>
<br/>

<h3> Will it change my browser/page/window objects? </h3>
<p>No, it won't.</p>
<p>We use Chrome's API only.</p>
<br/>

<h2> Other options to configure [ optional ] </h2>
<p> <b>init options</b> - see our <a href="InitOptions.md"> Init options page</a>
</p>

<p> <b>start options </b> - see our <a href="StartOptions.md"> Start options page</a>
</p>

