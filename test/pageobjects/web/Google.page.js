const Page = require('../page');
const Locators = require('../../resources/locators/locators.js')
const PageUtils = require('../../utils/PageUtils.js')
const report = require('@wdio/allure-reporter');
const { Browser } = require('selenium-webdriver');

class Google extends Page {

    async open(){
        await webClient.url('https://www.google.com.hk');
        await webClient.maximizeWindow();
    }

    async doSearch(str){

        await webClient.$(Locators.googleSearch.search_txtarea).setValue(str);
        await webClient.$(Locators.googleSearch.search_submit).click();
    
    }

    async verifySearchSuccess(str){
        await expect(webClient.$("//div[@id='rcnt']")).toBeDisplayed();
        report.addStep('STEP: Search results shown');
        await webClient.takeScreenshot();
    }

    async clearSearchTxt() {
        await webClient.$(Locators.googleSearch.search_txtarea).setValue('');
    }
}
module.exports = new Google();