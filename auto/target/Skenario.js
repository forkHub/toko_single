"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const ConfigDB_1 = require("./share/ConfigDB");
const Driver_1 = require("./Driver");
const Page_1 = require("./share/Page");
const Url_1 = require("./share/Url");
const Data_1 = require("./Data");
const Step_1 = require("./Step");
class Skenario {
    async skenarioAwalSampaiAkhir() {
        //hapus data
        await Driver_1.d.navigate(Url_1.url.urlBase + '/admin/anggota/hapus/nama/user_test/' + ConfigDB_1.configDB.admin.pass);
        await Driver_1.d.navigate(Url_1.url.urlBase + '/admin/barang/hapus/hapus/semua/' + ConfigDB_1.configDB.admin.pass);
        await Driver_1.d.waitTime(2000);
        //daftar
        await Driver_1.d.navigate(Url_1.url.urlBase + '/');
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.auth.login.daftar));
        //buat anggota
        await Step_1.step.buatAnggota('user_test', 'user_test');
        //login
        await Step_1.step.login('user_test', 'user_test');
        //buat barang
        await Driver_1.d.waitTime(1000);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.tambahTbl));
        await Step_1.step.buatBarang();
        await Driver_1.d.waitTime(1000);
        //check barang di toko ada
        await Step_1.step.checkNamaBarangDiHalBeranda(Data_1.data.namaBarang);
        //simpan id barang, id lapak
        Data_1.data.idBarang = await Driver_1.d.getTeks(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama.id));
        Data_1.data.idLapak = await Driver_1.d.getTeks(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama.lapakId));
        //check barang di lapak
        await Step_1.step.checkNamaBarangDiHalLapak(Data_1.data.namaBarang);
        //check barang di barang
        await Step_1.step.checkNamaBarangDiHalBarang(Data_1.data.namaBarang);
        //edit barang, simpan
        await Step_1.step.editBarang(Data_1.data.namaBarang2);
        //validate sukses
        await Step_1.step.checkDialog('sukses');
        //validate barang di halaman
        await Step_1.step.checkNamaBarangDiHalBeranda(Data_1.data.namaBarang2);
        await Step_1.step.checkNamaBarangDiHalLapak(Data_1.data.namaBarang2);
        await Step_1.step.checkNamaBarangDiHalBarang(Data_1.data.namaBarang2);
        //hapus barang
        //validate barang tidak ditemukan di hal barang
        await Driver_1.d.navigate(Url_1.url.urlBase + Url_1.url.getUrl(Url_1.url.urlPenjualEditBarangGet, [Data_1.data.idBarang]));
        await Driver_1.d.checkTeks(selenium_webdriver_1.By.css('document body'), "Barang tidak ditemukan");
        //validate barang tidak ditemukan di hal lapak
        await Driver_1.d.navigate(Url_1.url.urlBase + Url_1.url.getUrl(Url_1.url.urlTokoLapak, [Data_1.data.idLapak]));
        await Driver_1.d.checkTeksTidakSama(selenium_webdriver_1.By.css(Page_1.Page2.toko.lapak.barangPertama.namaBarang), Data_1.data.namaBarang2);
        //validate barang tidak ditemukan di hal beranda
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.checkElementTidakAda(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama.el));
        //hapus anggota
        await Driver_1.d.navigate(Url_1.url.urlBase + '/admin/anggota/hapus/nama/user_test/' + ConfigDB_1.configDB.admin.pass);
        await Driver_1.d.waitTime(1000);
        //validasi login gagal
        await Driver_1.d.navigate(Url_1.url.urlAuthLogin);
        await Step_1.step.login('user_test', 'user_test');
        await Driver_1.d.waitTime(1000);
        await Driver_1.d.checkTeks(selenium_webdriver_1.By.css(Page_1.Page2.Comp.dialog.box), 'username/password salah');
        //validasi lapak kosong
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.checkElementTidakAda(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama.el));
        //validasi gak bisa edit profile
        //validasi gak bisa tampilin profile
        //validasi gak bisa edit barang
        await Driver_1.d.quit();
    }
    async skenarioCheckNav() {
        console.debug(">> beranda => daftar lapak => beranda");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.daftarLapak));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.daftarLapak.beranda));
        console.debug(">> beranda => daftar lapak => login");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.daftarLapak));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.daftarLapak.login));
        console.debug(">> beranda => daftar lapak => lapak => barang");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.daftarLapak));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.daftarLapak.itemPertama));
        console.debug(">> beranda => daftar lapak => lapak => beranda");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.daftarLapak));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.daftarLapak.itemPertama));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.lapak.beranda));
        console.debug(">> beranda => daftar lapak => lapak => login");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.daftarLapak));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.daftarLapak.itemPertama));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.lapak.login));
        console.debug(">> beranda => barang => beranda");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama.el));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.barang.beranda));
        console.debug(">> beranda => barang => lapak");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama.el));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.barang.lapak));
        console.debug(">> beranda => barang => login");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama.el));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.barang.login));
        console.debug(">> beranda => login => lupa");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.auth.login.lupa));
        console.debug(">> beranda => login => daftar");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.auth.login.daftar));
        console.debug(">> beranda => login => penjual => tambah => penjual");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Step_1.step.login();
        await Driver_1.d.waitTime(1000);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.tambahTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.barangBaru.tutupTbl));
        console.debug(">> beranda => login => penjual => lapak");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Step_1.step.login();
        await Driver_1.d.waitTime(1000);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.lihatTbl));
        console.debug(">> beranda => login => penjual => edit => penjual");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Step_1.step.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.barangPertama.editTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.editBarang.tutupTbl));
        console.debug(">> beranda => login => penjual => edit => foto => edit");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Step_1.step.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.barangPertama.editTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.editBarang.editFotoTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.foto.tutup));
        console.debug(">> beranda => login => penjual => profile => penjual");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Step_1.step.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menuTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menu.profile));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.profile.berandaLink));
        console.debug(">> beranda => login => penjual => profile => edit-profile => profile");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Step_1.step.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menuTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menu.profile));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.profile.editTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.editProfile.tutupTbl));
        console.debug(">> beranda => login => penjual => profile => edit-profile => beranda");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Step_1.step.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menuTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menu.profile));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.profile.editTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.editProfile.nav.berandaLink));
        console.debug(">> beranda => login => penjual => profile => edit-profile => profile (nav)");
        await Driver_1.d.navigate(Url_1.url.urlBase);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Step_1.step.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menuTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menu.profile));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.profile.editTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.editProfile.nav.profileLink));
    }
}
exports.Skenario = Skenario;
// (new Toko()).checkNav().then().catch();
