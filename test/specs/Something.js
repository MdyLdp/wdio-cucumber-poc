const pg = require('../pageobjects/web/Google.page')
module.exports = {
    async doSomething(data) {

        console.log('data here is : ');
        console.log(data);
        await pg.open();
        await pg.doSearch(data.keyword);
        await pg.verifySearchSuccess(data.keyword);
        await pg.clearSearchTxt();
    }
}