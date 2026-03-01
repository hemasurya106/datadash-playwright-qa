const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [27,28,29,30,31,32,33,34,35,36];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `PASTE_YOUR_ACTUAL_BASE_URL_HERE?seed=${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a,b) => a+b, 0);
    grandTotal += pageSum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
