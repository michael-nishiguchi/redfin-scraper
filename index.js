// const puppeteer = require('puppeteer');

import puppeteer from "puppeteer";
import { clickWithXPath } from "./utils/page.mjs";
import { selectors, xpaths } from "./utils/selectors.mjs";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 50,
  });
  console.log("scrape started");
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://redfin.com/"),
    await page.setViewport({ width: 1080, height: 1024 });
  //const [searchBox] = await page.$x('//input[@id="search-box-input"]');
  const [searchBox] = await page.$x(xpaths.searchBox);
  if (searchBox) {
    await Promise.all([
      await searchBox.type("ingleside norfolk, va"),
      await clickWithXPath(page, xpaths.searchSubmit),
      await page.waitForNavigation(),
    ]);
  } else {
    console.log("can't find searchbox");
  }

  await Promise.all([await clickWithXPath(page, xpaths.tableSwitch)]);

  const properties = [];
  const tableRows = await page.$x(xpaths.tableRows);

  for (const property of properties) {
    // Check if the element has the class "nearbyHomesHeaderRow"
    const hasNearbyHomesHeaderRow = await page.evaluate(
      (el) => el.classList.contains("nearbyHomesHeaderRow"),
      property
    );

    // Exit the loop if the condition is met
    if (hasNearbyHomesHeaderRow) {
      break;
    }

    // Continue collecting information for other elements
    const type = await page.evaluate(
      (el) => el.getAttribute("data-type"),
      property
    );
    const address = await page.evaluate(
      (el) => el.getAttribute("data-address"),
      property
    );
    const price = await page.evaluate(
      (el) => el.getAttribute("data-price"),
      property
    );
    const beds = await page.evaluate(
      (el) => el.getAttribute("data-beds"),
      property
    );
    const baths = await page.evaluate(
      (el) => el.getAttribute("data-baths"),
      property
    );
    const age = await page.evaluate(
      (el) => el.getAttribute("data-age"),
      property
    );

    // Add the information to the array as an object with key/value pairs
    propertyInfoArray.push({
      type: type,
      address: address,
      price: price,
      beds: beds,
      baths: baths,
      age: age,
    });
  }

  /*
  for (let i = 0; i < Math.min(results.length, 5); i++) {
    const property = {};
    const result = results[i];

    property.price = await result.$eval(".homecardV2Price", (priceElement) =>
      priceElement.innerText.trim()
    );
    property.details = await result.$eval(".HomeStatsV2", (detailsElement) =>
      detailsElement.innerText.trim()
    );

    properties.push(property);
  }

  // Print the extracted information
  console.log("Extracted Information:");
  properties.forEach((property, index) => {
    console.log(`Property ${index + 1}:`);
    console.log(`  Price: ${property.price}`);
    console.log(`  Details: ${property.details}`);
    console.log("-----------------------");
  });
*/
  // Save the information to a PDF
  //await page.pdf({ path: "redfin_properties.pdf", format: "A4" });
  await page.pdf({ path: "test.pdf", format: "A4" });

  // wait for 30 seconds before closing browser
  await new Promise((resolve) => setTimeout(resolve, 30000));
  await browser.close();
})();
