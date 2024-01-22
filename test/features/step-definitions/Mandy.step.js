const util = require('../../utils/TestDataUtils');
require('dotenv').config();
const { Given, When, Then } = require('@wdio/cucumber-framework');

Given(`Open a Google page`, async () => {
    await webClient.url('https://www.google.com/');
    await webClient.maximizeWindow();
});

