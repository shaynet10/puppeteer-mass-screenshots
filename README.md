# puppeteer-mass-screenshots

## Common questions that you probably have

### Does it work when Chrome is in headless mode ?
Yes it does, it takes multiple screenshots when Chrome is in headless mode.
If you want you can also run Puppeeteer in headfull mode, we also support that.

### Does it support redirections in pages ?
Yes it does, because this solution is based on Chrome's API, 
which isn't affected by page's redirections.
Which means of course, you can do also whatever you like, 
to the page / browser objects.

### Does it use window object ?
No this solution is based on Chrome's API, and not on window object.
You can do whatever you want to the window object in the client side, 
we don't use it at all.

### Can it run with my own page / browser objects ?
Yes, of course you can.
In fact this was the idea in the first place, put the page object in the init function, 
And we will use it.
You can attach some browser.on(..) function before.
You can attach whatever you like to the browser object.
You can attach whatever you like to the page object.

## The manual
Using this package is very simple.
### Example:
