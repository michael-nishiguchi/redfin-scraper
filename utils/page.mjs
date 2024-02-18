// export const click = async (selector) => {
//     const element = await getElement(page, selectors);
//     if (!element) throw new Error(`No element found for ${selectors}`);

//     isPuppeteerContext(element)
//       ? await element.click({ delay: 100 }) // Playwright and Puppeteer handle "click" differently
//       : await element.click({ delay: 100 }); // So, to make TypeScript happy, we have to split them up.
//   };

// export const clickWithXPath = async (page, selector) => {
const clickWithXPath = async (page, selector) => {
  // if (selector.startsWith("//")) {
  // If the selector starts with '//', treat it as an XPath expression
  const [elementHandle] = await page.$x(selector);
  if (elementHandle) {
    await elementHandle.click();
  } else {
    console.log(selector + " Element not found");
  }
  // } else {
  //   // Treat it as a CSS selector
  //   const elementHandle = await page.$(selector);
  //   if (elementHandle) {
  //     await elementHandle.click();
  //   } else {
  //     console.log("Element not found");
  //   }
  // }
};

export { clickWithXPath };
