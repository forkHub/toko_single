"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Url_1 = require("./share/Url");
const selenium_webdriver_1 = require("selenium-webdriver");
const Data_1 = require("./Data");
const Driver_1 = require("./Driver");
const Page_1 = require("./share/Page");
class Step {
    async checkNamaBarangDiHalBeranda(nama) {
        console.debug('>> CHECK NAMA BARANG DI BERANDA');
        await Driver_1.d.navigate(Url_1.url.urlBase);
        let namaBarangDiHal = await Driver_1.d.getTeks(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama.namaBarang));
        if (namaBarangDiHal != nama) {
            console.debug('# nama barang di toko ' + namaBarangDiHal);
            console.debug('# nama barang seharusnya ' + nama);
            throw Error('# Barang tidak ditemukan');
        }
    }
    async checkNamaBarangDiHalLapak(nama) {
        console.debug('>> CHECK NAMA BARANG DI LAPAK');
        console.debug(Url_1.url);
        console.debug(Url_1.url.urlTokoLapak);
        await Driver_1.d.navigate(Url_1.url.getUrl(Url_1.url.urlTokoLapak, [Data_1.data.idLapak]));
        let namaBarangDiHal = await Driver_1.d.getTeks(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama.namaBarang));
        if (namaBarangDiHal != nama) {
            console.debug('# nama barang di toko ' + namaBarangDiHal);
            console.debug('# nama barang seharusnya ' + nama);
            throw Error('# Barang tidak ditemukan');
        }
    }
    async checkNamaBarangDiHalBarang(nama) {
        console.debug('>> CHECK NAMA BARANG DI HAL BARANG');
        await Driver_1.d.navigate(Url_1.url.getUrl(Url_1.url.urlTokoBarang, [Data_1.data.idLapak]));
        let namaBarangDiHal = await Driver_1.d.getTeks(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama.namaBarang));
        if (namaBarangDiHal != nama) {
            console.debug('# nama barang di toko ' + namaBarangDiHal);
            console.debug('# nama barang seharusnya ' + nama);
            throw Error('# Barang tidak ditemukan');
        }
    }
    async checkDialog(pesan) {
        await Driver_1.d.checkTeks(selenium_webdriver_1.By.css(Page_1.Page2.Comp.dialog.box), pesan);
    }
    async buatBarang(publish = true) {
        console.debug(">> BUAT BARANG");
        await Driver_1.d.waitTime(1000);
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.barangBaru.namaInput), Data_1.data.namaBarang);
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.barangBaru.deskripsiInput), 'deskripsi_test');
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.barangBaru.hargaBarangInput), '1000');
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.barangBaru.wa), '621234567890');
        if (publish) {
            await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.barangBaru.submitTbl));
            await Driver_1.d.waitTime(1000);
        }
        else {
            await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.barangBaru.draftTbl));
            await Driver_1.d.waitTime(1000);
        }
        //validate
        await this.checkDialog('sukses');
    }
    async editBarang(nama) {
        console.debug('>> EDIT BARANG DI HAL BARANG');
        await Driver_1.d.navigate(Url_1.url.getUrl(Url_1.url.urlPenjualEditBarangGet, [Data_1.data.idBarang]));
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.editBarang.namaInput), nama);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.editBarang.submitTbl));
        await Driver_1.d.waitTime(1000);
    }
    async buatAnggota(userName = 'user_test', password = 'user_test') {
        console.debug(">> BUAT ANGGOTA BARU");
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.daftar.userId), userName);
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.daftar.alamat), "alamat test");
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.daftar.deskripsi), "deskripsi test");
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.daftar.alamat), "alamat test");
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.daftar.email), "alamat@test");
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.daftar.lapak), "lapak test");
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.daftar.password1), password);
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.daftar.password2), password);
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.daftar.wa), "62123456789");
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.auth.daftar.kirimTbl));
        //validate
        await Driver_1.d.waitElement(selenium_webdriver_1.By.css(Page_1.Page2.Comp.dialog.el), 1000);
        await Driver_1.d.checkTeks(selenium_webdriver_1.By.css(Page_1.Page2.Comp.dialog.box), 'sukses');
        await Driver_1.d.waitElement(selenium_webdriver_1.By.css(Page_1.Page2.Comp.dialog.el), 2000);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Comp.dialog.okTbl));
    }
    async login(userName = 'mobil', password = 'mobil') {
        console.log(">> LOGIN");
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.login.userName), userName);
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.login.password), password);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.auth.login.submit));
        await Driver_1.d.waitTime(1000);
    }
}
exports.step = new Step();
