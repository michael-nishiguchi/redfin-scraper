export const selectors = {
  type: ".col_icon",
  address: ".col_address",
  price: ".col_price",
  beds: ".col_beds",
  baths: ".col_baths",
  age: ".col_days",
};

export const xpaths = {
  searchBox: '//input[@id="search-box-input"]',
  searchSubmit: '//button[@data-rf-test-name="searchButton"]',
  //tableSwitch: '//span[@data-rf-test-name="tableOption"]/parent::button',
  tableSwitch: '(//button[@data-rf-test-name="mode-option"])[2]',
  tableRows: "(//table)[2]//tbody/tr",
};
