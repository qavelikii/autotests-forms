const puppeteer = require('puppeteer');

(async () => {
  // Launching the browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Blocking the opening of new tabs
  await page.setDefaultNavigationTimeout(60000);
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.resourceType() === 'document' && request.isNavigationRequest() && request.frame() !== page.mainFrame()) {
      request.abort(); // Block opening a new tab
    } else {
      request.continue();
    }
  });

  // Navigating to the signup page
  await page.goto('https://pageaddress/', { waitUntil: 'domcontentloaded' });

  // Waiting for the page to load and entering registration data
  try {
    // Trying to use a more general selector
    await page.waitForSelector('input[type="email"]', { timeout: 60000 });
    await page.type('input[type="email"]', 'test@yourdomain.com');

    await page.waitForSelector('input[type="password"]', { timeout: 60000 });
    const passwordFields = await page.$$('input[type="password"]');
    if (passwordFields.length >= 2) {
      await passwordFields[0].type('yourpassword');
      await passwordFields[1].type('yourpassword');
    } else {
      throw new Error('Failed to find both password fields');
    }

    // Scrolling to the checkbox and clicking the terms acceptance checkbox
    await page.waitForSelector('.check-box.signup__check', { timeout: 60000 });
    const checkbox = await page.$('.check-box.signup__check .check-box__mark');
    if (checkbox) {
      await checkbox.evaluate(c => c.scrollIntoView({ behavior: 'smooth' }));
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500))); // Delay for stability
      await checkbox.click();
    } else {
      throw new Error('Failed to find the terms acceptance checkbox');
    }

    // Waiting for the popup window with text
    await page.waitForSelector('.popup_opened .accept-rules', { timeout: 60000 });

    // Scrolling to the checkboxes and clicking them in the popup window
    const popupCheckboxes = await page.$$('.accept-rules__check .check-box__mark');
    for (const popupCheckbox of popupCheckboxes) {
      await popupCheckbox.evaluate(c => c.scrollIntoView({ behavior: 'smooth' }));
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500))); // Delay for stability
      const isChecked = await popupCheckbox.evaluate(c => c.classList.contains('check-box__mark-inner_checked'));
      if (!isChecked) {
        await popupCheckbox.click();
      }
    }

    // Clicking the "Agree" button to accept the terms
    await page.waitForSelector('.accept-rules__buttons button.button:not([disabled]):not(.accept-rules__support button)', { timeout: 60000 });
    const agreeButton = await page.$('.accept-rules__buttons button.button:not([disabled]):not(.accept-rules__support button)');
    if (agreeButton) {
      await agreeButton.evaluate(button => button.scrollIntoView({ behavior: 'smooth' }));
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500))); // Delay for stability
      await agreeButton.click();
    }

    // Clicking the register button
    await page.waitForSelector('.signup__form button.button:not([disabled])', { timeout: 60000 });
    const registerButton = await page.$('.signup__form button.button:not([disabled])');
    if (registerButton) {
      await registerButton.evaluate(button => button.scrollIntoView({ behavior: 'smooth' }));
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500))); // Delay for stability
      await registerButton.click();
    }

    // Waiting some time to ensure the registration is successful
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5000)));
  } catch (error) {
    console.error('Error during autotest execution:', error);
  }

  // Closing the browser
  await browser.close();
})();