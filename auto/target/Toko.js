"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const ConfigDB_1 = require("./share/ConfigDB");
const Driver_1 = require("./Driver");
const Page_1 = require("./share/Page");
const Url_1 = require("./share/Url");
class Toko {
    constructor() {
        this.urlBeranda = 'http://localhost:3000';
    }
    async awalSampaiAkhir() {
        await Driver_1.d.navigate(this.urlBeranda + '/admin/anggota/hapus/nama/user_test/' + ConfigDB_1.configDB.admin.pass);
        await Driver_1.d.waitTime(2000);
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.auth.login.daftar));
        //buat anggota
        await this.buatAnggota('user_test', 'user_test');
        //login
        await this.login('user_test', 'user_test');
        //buat barang
        await Driver_1.d.waitTime(1000);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.tambahTbl));
        await this.buatBarang();
        await Driver_1.d.waitTime(1000);
        //check barang di toko
        //simpan id barang
        //check barang di lapak
        //check barang di barang
        //edit barang
        //validate
        //hapus barang
        //validate
        //hapus anggota
        await Driver_1.d.navigate(this.urlBeranda + '/admin/anggota/hapus/nama/user_test/' + ConfigDB_1.configDB.admin.pass);
        await Driver_1.d.waitTime(1000);
        //validasi login gagal
        await Driver_1.d.navigate(Url_1.url.urlAuthLogin);
        await this.login('user_test', 'user_test');
        await Driver_1.d.waitTime(1000);
        await Driver_1.d.checkTeks(selenium_webdriver_1.By.css(Page_1.Page2.Comp.dialog.box), 'username/password salah');
        //validasi lapak kosong
        //validasi gak bisa edit profile
        //validasi gak bisa tampilin profile
        //validasi gak bisa edit barang
        await Driver_1.d.quit();
    }
    async buatBarang(publish = true) {
        console.debug(">> BUAT BARANG");
        await Driver_1.d.waitTime(1000);
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.barangBaru.namaInput), 'barang_test');
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.barangBaru.deskripsiInput), 'deskripsi_test');
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.barangBaru.hargaBarangInput), '1000');
        // await d.sendKeys(By.css(Page2.Penjual.barangBaru.deskripsiPanjangInput), 'deskripsi panjang test');
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
        await Driver_1.d.checkTeks(selenium_webdriver_1.By.css(Page_1.Page2.Comp.dialog.box), "sukses");
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
    async checkNav() {
        console.debug(">> beranda => daftar lapak => beranda");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.daftarLapak));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.daftarLapak.beranda));
        console.debug(">> beranda => daftar lapak => login");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.daftarLapak));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.daftarLapak.login));
        console.debug(">> beranda => daftar lapak => lapak => barang");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.daftarLapak));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.daftarLapak.itemPertama));
        console.debug(">> beranda => daftar lapak => lapak => beranda");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.daftarLapak));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.daftarLapak.itemPertama));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.lapak.beranda));
        console.debug(">> beranda => daftar lapak => lapak => login");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.daftarLapak));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.daftarLapak.itemPertama));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.lapak.login));
        console.debug(">> beranda => barang => beranda");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.barang.beranda));
        console.debug(">> beranda => barang => lapak");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.barang.lapak));
        console.debug(">> beranda => barang => login");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.barangPertama));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.barang.login));
        console.debug(">> beranda => login => lupa");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.auth.login.lupa));
        console.debug(">> beranda => login => daftar");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.auth.login.daftar));
        console.debug(">> beranda => login => penjual => tambah => penjual");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await this.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.tambahTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.barangBaru.tutupTbl));
        console.debug(">> beranda => login => penjual => lapak");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await this.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.lihatTbl));
        console.debug(">> beranda => login => penjual => edit => penjual");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await this.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.barangPertama.editTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.editBarang.tutupTbl));
        console.debug(">> beranda => login => penjual => edit => foto => edit");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await this.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.barangPertama.editTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.editBarang.editFotoTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.foto.tutup));
        console.debug(">> beranda => login => penjual => profile => penjual");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await this.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menuTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menu.profile));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.profile.berandaLink));
        console.debug(">> beranda => login => penjual => profile => edit-profile => profile");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await this.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menuTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menu.profile));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.profile.editTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.editProfile.tutupTbl));
        console.debug(">> beranda => login => penjual => profile => edit-profile => beranda");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await this.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menuTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menu.profile));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.profile.editTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.editProfile.nav.berandaLink));
        console.debug(">> beranda => login => penjual => profile => edit-profile => profile (nav)");
        await Driver_1.d.navigate(this.urlBeranda);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.toko.beranda.login));
        await this.login();
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menuTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.beranda.menu.profile));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.profile.editTbl));
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.Penjual.editProfile.nav.profileLink));
    }
    async login(userName = 'mobil', password = 'mobil') {
        console.log(">> LOGIN");
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.login.userName), userName);
        await Driver_1.d.sendKeys(selenium_webdriver_1.By.css(Page_1.Page2.auth.login.password), password);
        await Driver_1.d.click(selenium_webdriver_1.By.css(Page_1.Page2.auth.login.submit));
    }
}
exports.Toko = Toko;
// (new Toko()).checkNav().then().catch();
