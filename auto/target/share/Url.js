"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: final2
class Url {
    constructor() {
        this.urlBase = 'http://localhost:3000';
        this.profile = '/penjual/profile';
        this.urlFileUpload = '/penjual/upload';
        this.urlPenjualProfile = '/penjual/profile/:id';
        this.urlPenjualGetEditProfile = '/penjual/profile/edit/:id';
        this.urlPenjualPostEditProfile = '/penjual/profile/edit/';
        this.urlPenjualBeranda = '/penjual/beranda/:id';
        this.urlPenjualBarangBaru = '/penjual/barang/baru';
        this.urlPenjualEditBarangGet = '/penjual/barang/edit/:id';
        this.urlPenjualEditBarangPost = '/penjual/barang/edit';
        this.urlPenjualHapusBarang = '/penjual/barang/hapus';
        this.urlAuthLogin = '/auth/login';
        this.urlAuthLogout = '/auth/logout';
        this.urlAuthGantiPass = '/auth/ganti';
        this.urlAuthLupaPass = '/auth/lupa';
        this.urlAuthDaftar = '/auth/daftar';
        this.urlTokoLapak = `/lapak/:id`;
        this.urlTokoBarang = `/barang/baca/id/:id`;
        this.urlTokoBeranda = '/';
        this.urlBarangCariGet = '';
    }
    getUrl(url, params) {
        let urlHasil = url;
        console.log('get url: ' + urlHasil);
        params.forEach((item) => {
            urlHasil = urlHasil.replace(/\:[a-z]+/, item);
            console.log('item ' + item);
            console.log('url ' + urlHasil);
        });
        return urlHasil;
    }
}
exports.url = new Url;
