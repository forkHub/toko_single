"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = __importStar(require("selenium-webdriver"));
class WebdriverWrapper {
    constructor() {
        this.until = selenium_webdriver_1.default.until;
        this._driverList = [];
    }
    get driver() {
        return this._driver;
    }
    get driverList() {
        return this._driverList;
    }
    async createBrowserChrome() {
        this._driver = await (new selenium_webdriver_1.default.Builder()
            .forBrowser('chrome')
            .withCapabilities(selenium_webdriver_1.Capabilities.chrome().set("acceptInsecureCerts", true).setAlertBehavior('dismiss')))
            .build();
        console.debug('# create browser chrome');
        console.debug("# this driver " + this.driver);
        this.driverList.push(this._driver);
    }
    async createBrowserFirefox() {
        this._driver = await (new selenium_webdriver_1.default.Builder()
            .forBrowser('firefox')
            .withCapabilities(selenium_webdriver_1.Capabilities.firefox().set("acceptInsecureCerts", true).setAlertBehavior('dismiss'))
            .build());
        this.driverList.push(this.driver);
    }
    async getTeks(l) {
        let el = (this.driver).findElement(l);
        let teksEl = await (await el).getText();
        return teksEl;
    }
    async checkTeksTidakSama(l, teks) {
        try {
            await this.checkTeks(l, teks);
        }
        catch (e) {
            return;
        }
        throw Error('Teks Sama: el ' + (await this.getTeks(l)) + '/teks tes ' + teks);
    }
    async checkTeks(l, teks) {
        let teksEl = await this.getTeks(l);
        if (teksEl.toLowerCase() == teks.toLowerCase()) {
            return;
        }
        else {
            console.debug('# Error: ');
            console.debug('#########');
            throw Error('teksEl: ' + teksEl + '/teks: ' + teks);
        }
    }
    getCurrentDriver() {
        return this.driver;
    }
    switchDriverByIdx(idx) {
        this._driver = this.driverList[idx];
        console.log("swicht driver, idx " + idx + "/total " + this.driverList.length);
    }
    async waitTime(n) {
        console.log("# delay, n: " + n);
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                // let _date: Date = new Date();
                resolve();
            }, n);
        });
    }
    async switchTo(idx) {
        await this.driver.switchTo().frame(idx);
    }
    async navigate(url) {
        console.debug("# navigate " + url);
        await this.waitTime(1000);
        await this.driver.get(url).catch((e) => {
            console.log('navigate error');
            console.log(e);
        });
    }
    async checkElementTidakAda(l) {
        try {
            await this.waitElement(l, 2000);
        }
        catch (e) {
            return;
        }
        throw Error('Element ditemukan: ' + l.toString());
    }
    async sendKeys(locator, str) {
        await this.waitElement(locator, 1000);
        console.debug("# send keys, loc " + locator + "/str " + str);
        await (await (await this.driver).findElement(locator)).clear();
        await this.driver.findElement(locator).sendKeys(str);
    }
    async waitElementInvisible(locator, timeOut) {
        console.log("wait elemetn invisible");
        let el = await this.driver.wait(this.until.elementLocated(locator), timeOut);
        await this.driver.wait(this.until.elementIsNotVisible(el), timeOut);
    }
    async waitElementEnable(locator, timeOut) {
        let el = await this.driver.wait(this.until.elementsLocated(locator), timeOut);
        await this.driver.wait(this.until.elementIsEnabled(el[0]));
    }
    async waitElementVisible(locator, timeOut) {
        let el = await this.driver.wait(this.until.elementsLocated(locator), timeOut);
        await this.driver.wait(this.until.elementIsVisible(el[0]), timeOut);
    }
    async waitElement(locator, timeOut) {
        console.log("# tunggu element, locator " + locator);
        await (await this.driver).wait(this.until.elementsLocated(locator), timeOut);
    }
    async click(locator) {
        console.log("# click, locator : " + locator);
        await (await (await this.driver).findElement(locator)).click();
    }
    async quit() {
        console.log("quit " + this.driver);
        await (await this.driver).quit();
    }
    get lastEl() {
        return this._lastEl;
    }
}
exports.d = new WebdriverWrapper();
