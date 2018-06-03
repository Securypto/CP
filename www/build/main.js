webpackJsonp([0],{

/***/ 117:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 158:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 158;

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_input__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_addresses__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_show__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_scan__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, http, httpc, alertCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.httpc = httpc;
        this.alertCtrl = alertCtrl;
        this.iType = checkCamera();
        window["ex2"] = [navCtrl, __WEBPACK_IMPORTED_MODULE_8__pages_scan__["a" /* ScanPage */], this];
        this.listData = [];
        /*
                 if(getCookie("ID")==""){
                    setCookie("ID","DIGISAFEGUARDID:" + makeid(),365);
                 }else{
                     if(getCookie("ID").split(":").length != 2){
                        setCookie("ID","DIGISAFEGUARDID:" + makeid(),365);
                     }
                 }
                 */
        if (getCookie("CUR") == "") {
            setCookie("CUR", "USD", 365);
        }
        this.cur = getCookie("CUR");
        if (getCookie("FIL") == "") {
            setCookie("FIL", "ALL", 365);
        }
        this.fil = getCookie("FIL");
        this.refreshData = false;
        this.getMarketPrice();
    }
    HomePage.prototype.filList = function () {
        return [
            "ALL", "BTC", "ETH", "LTC", "XMR"
        ];
    };
    HomePage.prototype.curList = function () {
        return [
            "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "USD", "ZAR"
        ];
    };
    HomePage.prototype.getBal = function (url, i) {
        var _this = this;
        this.http.get(url).map(function (res) { return res; }).subscribe(function (c) {
            var b = c["_body"];
            if (_this.listData[i].name == "BTC") {
                _this.listData[i].amount = parseInt(b) / 100000000;
                _this.listData[i].price = (parseInt(b) / 100000000 * window["btcPrice"]);
                if (_this.listData[i].amount > 0) {
                    _this.listData[i].color = "green";
                }
                else {
                    _this.listData[i].color = "black";
                }
            }
            else if (_this.listData[i].name == "ETH") {
                var bal = JSON.parse(b).balance;
                _this.listData[i].amount = parseInt(bal) / 1000000000000000000;
                _this.listData[i].price = (parseInt(bal) / 1000000000000000000 * window["ethPrice"]);
            }
            _this.totalPrice += _this.listData[i].price;
        });
    };
    HomePage.prototype.getBalance = function () {
        for (var i in this.listData) {
            if (this.listData[i].show == true) {
                var url = "";
                if (this.listData[i].name == "BTC") {
                    url = "https://blockchain.info/q/addressbalance/" + this.listData[i].address;
                }
                else if (this.listData[i].name == "ETH") {
                    url = "https://api.blockcypher.com/v1/eth/main/addrs/" + this.listData[i].address + "/balance";
                }
                else {
                    continue;
                }
                this.getBal(url, i);
            }
        }
    };
    HomePage.prototype.filterData = function (list) {
        var show = getCookie("FIL");
        for (var i in list) {
            //list[i] = {name:list[i].split(":")[0],address:list[i].split(":")[1],amount:0,price:0,label:"undefined",fav:1};
            list[i].show = true;
            if (show == "ALL") {
            }
            else if (show != list[i].name) {
                list[i].show = false;
            }
        }
        return list;
    };
    HomePage.prototype.filChange = function () {
        setCookie("FIL", this.fil, 365);
        this.getList();
    };
    HomePage.prototype.curChange = function () {
        setCookie("CUR", this.cur, 365);
        this.getMarketPrice();
    };
    HomePage.prototype.getList = function () {
        if (getCookie("ID") != "") {
            this.refreshData = false;
            this.listData = this.filterData(window["coinList"]);
            this.totalPrice = 0;
            this.getBalance();
        }
    };
    HomePage.prototype.getMarketPrice = function () {
        var _this = this;
        var c = getCookie("CUR");
        this.http.get("https://api.coinmarketcap.com/v1/ticker/?convert=" + c + "&limit=10").map(function (res) { return res.json(); }).subscribe(function (priceList) {
            window["btcPrice"] = priceList[0]["price_" + c.toLowerCase()];
            window["ethPrice"] = priceList[1]["price_" + c.toLowerCase()];
            _this.getList();
        });
    };
    HomePage.prototype.setFav = function (id, f) {
        var _this = this;
        this.http.get("setfav.php?id=" + getCookie("ID") + "&cid=" + id + "&fav=" + f).map(function (res) { return res; }).subscribe(function (list) {
            _this.getList();
        });
    };
    HomePage.prototype.removeCoin = function (id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete?',
            message: 'Are you sure want to delete?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Ok',
                    handler: function () {
                        _this.http.get("remove.php?id=" + getCookie("ID") + "&cid=" + id).map(function (res) { return res; }).subscribe(function (list) {
                            _this.getList();
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    HomePage.prototype.onReceive = function (t) {
        if (t.address.substr(0, 4) == "xpub") {
            try {
                var n = window["HD"]["fromBase58"](t.address);
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_addresses__["a" /* AddressesPage */], { t: t, show: "Unused", n: n });
            }
            catch (err) {
            }
        }
        else {
            this.showQR(t, "undefined");
        }
    };
    HomePage.prototype.onSend = function (t) {
        var _this = this;
        if (t.address.substr(0, 4) == "xpub") {
            try {
                var n = window["HD"]["fromBase58"](t.address);
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_addresses__["a" /* AddressesPage */], { t: t, show: "Funded", n: n });
            }
            catch (err) {
            }
        }
        else {
            this.http.get("https://blockchain.info/unspent?cors=true&active=" + t.address).map(function (res) { return res.json(); }).subscribe(function (unspent) {
                //this.navCtrl.push(InputPage,{address:t.address,unspent:unspent});
                _this.http.get("estimatesmartfee.json").map(function (res) { return res.json(); }).subscribe(function (fees) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_input__["a" /* InputPage */], { address: t.address, unspent: unspent, fees: fees });
                });
            });
        }
    };
    HomePage.prototype.showQR = function (t, i) {
        if (i == "undefined") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_show__["a" /* ShowQRPage */], { t: t.address, id: 2 });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_show__["a" /* ShowQRPage */], { t: t.address, id: 1 });
        }
    };
    HomePage.prototype.showID = function () {
        if (getCookie("ID") != "") {
            this.showQR({ address: getCookie("ID") }, "ID");
        }
    };
    HomePage.prototype.onCamera = function () {
        setwebcam();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_scan__["a" /* ScanPage */]);
    };
    HomePage.prototype.onKeyPad = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_input__["a" /* InputPage */]);
    };
    HomePage.prototype.onReload = function () {
        var _this = this;
        this.reload = true;
        this.getList();
        setTimeout(function () { _this.reload = false; }, 10000);
    };
    HomePage.prototype.onLogout = function () {
        setCookie("ID", "", 365);
        this.dID = getCookie("ID");
        this.totalPrice = 0;
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.dID = getCookie("ID");
        this.getList();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\digi\DSG-Wallet\src\pages\home.html"*/'<ion-header>\n  <ion-navbar text-center>\n<ion-item>\n      <img src="assets/imgs/logo80x100.png" width="50" height="40" (click)="showID()"/>\n\n      <button ion-button outline item-end icon-center *ngIf="dID != \'\'">\n      <ion-icon name="camera"></ion-icon><input type="file" onchange="handleFiles(this.files)" id="file-input-home" *ngIf="iType==1" value="Capturing QR"><input id="file-input-home" type="button" (click)="onCamera()" *ngIf="iType==0"  value="Capturing QR"> </button>\n      <button ion-button outline item-end icon-center (click)="onReload()" *ngIf="dID != \'\'" [disabled]="reload">\n      <ion-icon name="refresh"></ion-icon></button>\n      <button ion-button outline item-end icon-center (click)="onLogout()" *ngIf="dID != \'\'">\n      <ion-icon name="exit"></ion-icon></button>\n      <button ion-button outline item-end icon-center>\n      <ion-icon name="help"></ion-icon>\n      \n    </button>\n</ion-item>\n\n  </ion-navbar>\n</ion-header>\n\n\n \n \n\n<ion-content padding>\n\n<ion-card text-center *ngIf="dID == \'\'"><ion-card-header>\n\n              <ion-icon name="ios-camera" class="larger"></ion-icon><input type="file" onchange="handleFiles(this.files)" id="file-input-home" *ngIf="iType==1" value="Capturing QR"><input id="file-input-home" type="button" (click)="onCamera()" *ngIf="iType==0"  value="Capturing QR"> \n\n</ion-card-header><ion-card-content>\n\n</ion-card-content></ion-card>\n\n<ion-list *ngIf="dID != \'\'">\n<ion-item-sliding *ngFor="let item of listData">\n\n <ion-item *ngIf="item.show==true">\n\n     <h1><b> {{item.label}} </b></h1> <h3> <i class="cc {{item.name}}" title="{{item.name}}"></i> {{item.name}} : <font color="{{item.color}}">{{item.address}}</font></h3> <h4><ion-icon ios="ios-at" md="md-at"></ion-icon> {{item.amount}} </h4> <h4><ion-icon name="cash"></ion-icon> {{item.price | currency:cur}}</h4>\n</ion-item>\n    \n<ion-item-options side="left">\n      <button ion-button color="primary" (click)="onSend(item)" *ngIf="item.amount > 0">\n        <ion-icon ios="ios-send" md="md-send"></ion-icon>\n        SEND\n      </button>\n      <button ion-button color="secondary" (click)="onReceive(item)">\n        <ion-icon ios="ios-qr-scanner" md="md-qr-scanner"></ion-icon>\n        RECEIVE\n      </button>\n    </ion-item-options>\n  </ion-item-sliding>\n</ion-list>\n    \n</ion-content>\n\n\n\n\n\n<ion-footer>\n\n<ion-item>\n        \n        <ion-label>\n         {{totalPrice | currency:cur}}\n        </ion-label>\n        <ion-select (ionChange)="filChange()" interface="popover" [(ngModel)]="fil"><ion-option value="{{fil}}" *ngFor="let fil of filList()">{{fil}}\n  			</ion-option>\n  		</ion-select>\n        \n\n        <ion-select (ionChange)="curChange()" interface="popover" [(ngModel)]="cur">\n  			<ion-option value="{{cur}}" *ngFor="let cur of curList()">{{cur}}</ion-option>\n  		</ion-select>\n\n        </ion-item>\n\n\n</ion-footer>\n'/*ion-inline-end:"C:\digi\DSG-Wallet\src\pages\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InputPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_scan__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_show__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InputPage = /** @class */ (function () {
    function InputPage(zone, navCtrl, navParams) {
        this.zone = zone;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.iType = checkCamera();
        this.inputID = "";
        this.unspent = this.navParams.get("unspent").unspent_outputs;
        this.from = this.navParams.get("address");
        this.feeList = this.navParams.get("fees");
        this.total = 0;
        for (var i in this.unspent) {
            this.total += this.unspent[i].value;
        }
        this.total = this.total / 100000000;
        this.fees = 5;
        this.percent = 0;
        this.amount = 0;
        this.price = 0;
        this.addressok = false;
        window["sendPage"] = this;
    }
    InputPage.prototype.buildTx = function () {
        var totalout = 0;
        var txb = new window["bitcoinjs"].TransactionBuilder();
        for (var i in this.unspent) {
            totalout += this.unspent[i].value;
            txb.addInput(this.unspent[i].tx_hash_big_endian, this.unspent[i].tx_output_n);
            if (this.amount * 100000000 <= totalout) {
                break;
            }
        }
        var amt = Math.floor(this.amount * 100000000);
        if (amt == totalout) {
            txb.addOutput(this.address, totalout);
        }
        else {
            var tot = Math.floor(amt);
            var bal = Math.floor(totalout - amt);
            txb.addOutput(this.address, tot);
            txb.addOutput(this.from, bal);
        }
        var txsize = txb.buildIncomplete().toHex().length;
        this.f_amount = txsize * this.feeList["n" + this.fees] / 1000;
        this.f_amount = this.f_amount.toFixed(8);
        this.f_price = (this.f_amount * window["btcPrice"]);
        if (Number(this.amount) + Number(this.f_amount) > this.total) {
            this.amount = this.amount - this.f_amount;
            this.amount = this.amount.toFixed(8);
            this.price = (this.amount * window["btcPrice"]);
        }
        this.listInputs = [];
        this.listOutputs = [];
        totalout = 0;
        txb = new window["bitcoinjs"].TransactionBuilder();
        for (i in this.unspent) {
            totalout += this.unspent[i].value;
            txb.addInput(this.unspent[i].tx_hash_big_endian, this.unspent[i].tx_output_n);
            this.listInputs.push(this.unspent[i]);
            if ((Number(this.amount) + Number(this.f_amount)) * 100000000 <= totalout) {
                break;
            }
        }
        if ((Number(this.amount) + Number(this.f_amount)) * 100000000 == totalout) {
            amt = Math.floor(this.amount * 100000000);
            txb.addOutput(this.address, amt);
            this.listOutputs.push({ address: this.address, value: amt });
        }
        else {
            tot = Math.floor(this.amount * 100000000);
            var ftot = Math.floor(this.f_amount * 100000000);
            bal = Math.floor(totalout - tot - ftot);
            txb.addOutput(this.address, tot);
            this.listOutputs.push({ address: this.address, value: tot });
            if (bal > 1) {
                txb.addOutput(this.from, bal);
                this.listOutputs.push({ address: this.from, value: bal });
            }
        }
        this.tx = txb.buildIncomplete().toHex();
    };
    InputPage.prototype.onCamera = function () {
        setwebcam(true);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_scan__["a" /* ScanPage */]);
    };
    InputPage.prototype.onAmtChange = function () {
        if (this.amount > this.total) {
            this.amount = this.total;
        }
        this.price = (this.amount * window["btcPrice"]);
        this.percent = this.amount / this.total * 100;
        this.buildTx();
    };
    InputPage.prototype.onPriceChange = function () {
        this.amount = (this.price / window["btcPrice"]);
        if (this.amount > this.total) {
            this.amount = this.total;
            this.price = (this.amount * window["btcPrice"]);
        }
        this.amount = this.amount.toFixed(8);
        this.percent = this.amount / this.total * 100;
        this.buildTx();
    };
    InputPage.prototype.onPerChange = function () {
        this.amount = this.percent * this.total / 100;
        this.amount = this.amount.toFixed(8);
        this.price = (this.amount * window["btcPrice"]);
        this.buildTx();
    };
    InputPage.prototype.onFPerChange = function () {
        this.buildTx();
    };
    InputPage.prototype.setAddress = function (a) {
        var _this = this;
        this.zone.run(function () { _this.address = a; _this.addressok = true; });
    };
    InputPage.prototype.onAddressChange = function () {
        this.addressok = WAValidator.validate(this.address, "BTC");
    };
    InputPage.prototype.showQR = function () {
        if (typeof this.tx != "undefined") {
            var len = 100;
            //var l = Math.ceil(this.tx.length / Math.ceil(this.tx.length/len));
            var t = "signbtc:" + this.tx + ",fromaddress:" + this.from;
            var list = t.match(new RegExp('.{1,' + len + '}', 'g'));
            for (var i in list) {
                list[i] = (Number(i) + 1) + ":" + list.length + "," + list[i] + "," + md5(list[i]);
            }
            list[i] += "," + md5(t);
            //console.log(t);
            //console.log(list);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_show__["a" /* ShowQRPage */], { t: "* Please scan this QR by your DSG. Subsequently DSG will sign your transaction, and provide you with a new QR containing signed transactions. Next scan it using the button below to broadcast it", id: 3, list: list });
        }
    };
    InputPage.prototype.ionViewDidEnter = function () {
        this.cur = getCookie("CUR");
    };
    InputPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-input',template:/*ion-inline-start:"C:\digi\DSG-Wallet\src\pages\input.html"*/'  \n<ion-header>\n  <ion-navbar>\n    <ion-title text-center>Send\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    \n\n    <ion-card>\n\n  <ion-card-header>\n    Pay To\n  </ion-card-header>\n\n  <ion-card-content>\n\n      <ion-item>\n\n    <ion-input type="text" placeholder="Address" [(ngModel)]="address" (ionChange)="onAddressChange()"></ion-input>\n\n              <button item-right><ion-icon name="ios-camera"></ion-icon><input type="file" onchange="handleFiles(this.files,true)" id="file-input" *ngIf="iType==1" value="Capturing QR"><input id="file-input" type="button" (click)="onCamera()" *ngIf="iType==0"  value="Capturing QR"></button>\n  </ion-item>\n\n  </ion-card-content>\n\n</ion-card>\n\n\n<ion-card>\n\n  <ion-card-header>\n    Amount\n  </ion-card-header>\n\n  <ion-card-content>\n\n\n <ion-item>\n  <ion-label>BTC</ion-label>\n    <ion-input type="text" [(ngModel)]="amount" (change)="onAmtChange()" [disabled]="!addressok"></ion-input>\n  </ion-item>\n   <ion-item>\n    <ion-label>{{cur}}</ion-label>\n    <ion-input type="text" [(ngModel)]="price" (change)="onPriceChange()" [disabled]="!addressok"></ion-input>\n  </ion-item>\n\n<ion-item text-wrap>\n    <ion-range min="0" max="100" [(ngModel)]="percent" color="secondary" pin="true" (ionBlur)="onPerChange()" [disabled]="!addressok">\n      <ion-label range-left>0%</ion-label>\n      <ion-label range-right>100%</ion-label>\n    </ion-range>\n  </ion-item>\n<ion-badge item-centered color="secondary">{{percent}}%</ion-badge>\n\n  </ion-card-content>\n\n</ion-card>\n\n\n<ion-card>\n\n  <ion-card-header>\n    Fee\n  </ion-card-header>\n\n  <ion-card-content>\n\n\n <ion-item>\n  <ion-label>BTC</ion-label>\n    <ion-input type="text" [(ngModel)]="f_amount" disabled="true"></ion-input>\n  </ion-item>\n   <ion-item>\n    <ion-label>{{cur}}</ion-label>\n    <ion-input type="text" [(ngModel)]="f_price" disabled="true"></ion-input>\n  </ion-item>\n\n<ion-item text-wrap>\n    <ion-range min="2" max="25" [(ngModel)]="fees" color="secondary" pin="true" (ionChange)="onFPerChange()" [disabled]="!addressok">\n      <ion-label range-left>2</ion-label>\n      <ion-label range-right>25</ion-label>\n    </ion-range>\n\n  </ion-item>\n<ion-badge item-centered color="secondary">Within {{ fees }} blocks ({{fees*10}} mins)</ion-badge>\n\n  </ion-card-content>\n\n</ion-card>\n\n\n<div padding>\n  <ion-segment [(ngModel)]="tab">\n    <ion-segment-button value="inputs">\n      Inputs\n    </ion-segment-button>\n    <ion-segment-button value="outputs">\n      Outputs\n    </ion-segment-button>\n    <ion-segment-button value="trans">\n      Transactions\n    </ion-segment-button>    \n  </ion-segment>\n</div>\n\n<div [ngSwitch]="tab">\n<ion-list *ngSwitchCase="\'inputs\'">\n<ion-item-sliding *ngFor="let item of listInputs">\n  <ion-item>{{item.tx_hash_big_endian}} <br> {{item.value/100000000}}</ion-item>\n</ion-item-sliding>\n</ion-list>\n</div>\n\n<div [ngSwitch]="tab">\n<ion-list  *ngSwitchCase="\'outputs\'">\n<ion-item-sliding *ngFor="let item of listOutputs">\n    <ion-item>{{item.address}} <br> {{item.value/100000000}}</ion-item>\n</ion-item-sliding>\n</ion-list>\n</div>\n\n<div [ngSwitch]="tab">\n<ion-card  *ngSwitchCase="\'trans\'">\n    <ion-item text-wrap>{{tx}}</ion-item>\n</ion-card>\n</div>\n\n    <br>\n<button ion-button outline icon-right (click)="showQR()">\n  Sign transactions\n</button>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\digi\DSG-Wallet\src\pages\input.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], InputPage);
    return InputPage;
}());

//# sourceMappingURL=input.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TransactionsPage = /** @class */ (function () {
    function TransactionsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tab = "outputs";
        this.t = this.navParams.get("t");
        this.listInputs = this.t.inputs;
        this.listOutputs = this.t.out;
    }
    TransactionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-transaction',template:/*ion-inline-start:"C:\digi\DSG-Wallet\src\pages\transaction.html"*/' <ion-header>\n    <ion-navbar>\n      <ion-title>Transactions</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content>\n\n<div padding>\n  <ion-segment [(ngModel)]="tab">\n    <ion-segment-button value="inputs">\n      Inputs\n    </ion-segment-button>\n    <ion-segment-button value="outputs">\n      Outputs\n    </ion-segment-button>   \n  </ion-segment>\n</div>\n\n<div [ngSwitch]="tab">\n<ion-list *ngSwitchCase="\'inputs\'">\n<ion-item-sliding *ngFor="let item of listInputs">\n  <ion-item>{{item.prev_out.addr}} <br> {{item.prev_out.value/100000000}}</ion-item>\n</ion-item-sliding>\n</ion-list>\n</div>\n\n<div [ngSwitch]="tab">\n<ion-list  *ngSwitchCase="\'outputs\'">\n<ion-item-sliding *ngFor="let item of listOutputs">\n    <ion-item>{{item.addr}} <br> {{item.value/100000000}}</ion-item>\n</ion-item-sliding>\n</ion-list>\n</div>\n\n\n  </ion-content>'/*ion-inline-end:"C:\digi\DSG-Wallet\src\pages\transaction.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], TransactionsPage);
    return TransactionsPage;
}());

//# sourceMappingURL=transaction.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_show__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddressesPage = /** @class */ (function () {
    function AddressesPage(navCtrl, navParams, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.t = this.navParams.get("t");
        this.show = this.navParams.get("show");
        this.n = this.navParams.get("n");
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        window["tfunc"] = this;
        setTimeout(function () {
            window["tfunc"].fetchAddress();
        }, 300);
    }
    AddressesPage.prototype.onReceive = function (t) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_show__["a" /* ShowQRPage */], { t: t.address, id: 2 });
    };
    AddressesPage.prototype.fetchAddress = function () {
        var _this = this;
        this.aList = [];
        this.from = 0;
        this.to = 20;
        var l = [];
        var ll = [];
        for (var i = this.from; i < this.to; i++) {
            var addr = this.n.derive(0).derive(i).getAddress();
            l.push({ address: addr, name: this.t.name, price: 0, amount: 0, total_received: 0, fbal: 0 });
            ll.push(addr);
        }
        if (this.t.amount == 0) {
            this.loading.dismiss();
            this.aList = l;
        }
        else {
            var url = "https://blockchain.info/multiaddr?active=" + ll.join("|") + "&cors=true";
            this.http.get(url).map(function (res) { return res.json(); }).subscribe(function (list) {
                var tl = [];
                list = list.addresses;
                for (var i in list) {
                    var b = list[i].final_balance;
                    tl.push({ address: list[i].address, name: _this.t.name, price: (parseInt(b) / 100000000 * window["btcPrice"]), amount: parseInt(b) / 100000000, total_received: list[i].total_received, fbal: b });
                }
                _this.aList = tl;
                _this.loading.dismiss();
            });
        }
    };
    AddressesPage.prototype.ionViewDidEnter = function () {
        this.cur = getCookie("CUR");
    };
    AddressesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addresses',template:/*ion-inline-start:"C:\digi\DSG-Wallet\src\pages\addresses.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title text-center>Address List\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content padding>\n\n<div padding>\n  <ion-segment [(ngModel)]="show">\n    <ion-segment-button value="All">\n      All\n    </ion-segment-button>\n    <ion-segment-button value="Unused">\n      Unused\n    </ion-segment-button>\n    <ion-segment-button value="Funded">\n      Funded\n    </ion-segment-button>\n    <ion-segment-button value="Used">\n      Used\n    </ion-segment-button>      \n  </ion-segment>\n</div>\n    \n<ion-list >\n<ng-container *ngFor="let item of aList" >\n<ion-item-sliding *ngIf="show==\'All\' || show==\'Unused\' && item.total_received==0 || show == \'Funded\' && item.fbal > 0 || show==\'Used\' && item.total_received > 0">\n <ion-item>\n\n     <h1><ion-icon name="ios-star" *ngIf="item.fav==1" (click)="setFav(item.id,0)"></ion-icon><ion-icon name="ios-star-outline" *ngIf="item.fav==0" (click)="setFav(item.id,1)"></ion-icon> <b> {{item.label}} </b></h1> <h3> <i class="cc {{item.name}}" title="{{item.name}}"></i> {{item.name}} : <font color="red">{{item.address}}</font></h3> <h4><ion-icon ios="ios-at" md="md-at"></ion-icon> {{item.amount}} </h4> <h4><ion-icon name="logo-usd"></ion-icon> {{item.price | currency:cur}}</h4>\n</ion-item>\n    \n<ion-item-options side="left">\n      <button ion-button color="primary" *ngIf="item.amount > 0">\n        <ion-icon ios="ios-send" md="md-send"></ion-icon>\n        SEND\n      </button>\n      <button ion-button color="secondary" (click)="onReceive(item)">\n        <ion-icon ios="ios-qr-scanner" md="md-qr-scanner"></ion-icon>\n        RECEIVE\n      </button>\n    </ion-item-options>\n  \n  </ion-item-sliding>\n    </ng-container>  \n</ion-list>\n    \n</ion-content>\n\n'/*ion-inline-end:"C:\digi\DSG-Wallet\src\pages\addresses.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], AddressesPage);
    return AddressesPage;
}());

//# sourceMappingURL=addresses.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(229);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_clipboard__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_scan__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_show__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_transaction__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_input__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_addresses__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_scan__["a" /* ScanPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_show__["a" /* ShowQRPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_transaction__["a" /* TransactionsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_input__["a" /* InputPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_addresses__["a" /* AddressesPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7_ngx_clipboard__["a" /* ClipboardModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_scan__["a" /* ScanPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_show__["a" /* ShowQRPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_transaction__["a" /* TransactionsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_input__["a" /* InputPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_addresses__["a" /* AddressesPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home__ = __webpack_require__(204);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\digi\DSG-Wallet\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\digi\DSG-Wallet\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ScanPage = /** @class */ (function () {
    function ScanPage(zone, navCtrl, navParams, httpc, http, alertCtrl) {
        this.zone = zone;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpc = httpc;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.tab = "trans";
        this.insList = [];
        this.outsList = [];
        this.progressPercent = 0;
        this.mode = checkCamera();
        window["scanPage"] = this;
    }
    ScanPage.prototype.ionViewWillLeave = function () {
        read("error");
    };
    ScanPage.prototype.ionViewDidEnter = function () {
        window["v"].addEventListener('loadedmetadata', function (e) {
            initCanvas(window["v"]["videoWidth"], window["v"]["videoHeight"]);
        });
    };
    ScanPage.prototype.getPercent = function () {
        return this.progressPercent + "%";
    };
    ScanPage.prototype.setPercent = function (p, d, t) {
        var _this = this;
        this.zone.run(function () { _this.progressPercent = p; _this.qrDone = d; _this.qrTotal = t; });
    };
    ScanPage.prototype.broadcast = function (tx) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]().set("Content-Type", "application/x-www-form-urlencoded");
        this.httpc.post("https://blockchain.info/pushtx?cors=true", "tx=" + tx, { headers: headers, responseType: "text" })
            .subscribe(function (res) {
            _this.navCtrl.pop();
            var alert = _this.alertCtrl.create({
                title: '',
                subTitle: res,
                buttons: ['OK']
            });
            alert.present();
        }, function (err) {
            _this.navCtrl.pop();
            var alert = _this.alertCtrl.create({
                title: 'Failed',
                subTitle: err.error,
                buttons: ['OK']
            });
            alert.present();
        });
    };
    ScanPage.prototype.readFullQR = function (qr) {
        var qrlist = qr.split(",");
        if (qrlist[0].split(":")[0] == "DIGISAFEGUARDID") {
            setCookie("ID", qrlist[0], 365);
            this.add(qr.split(/,(.+)/)[1]);
        }
        else if (qrlist[0].split(":")[0] == "btcbroadcast") {
            this.rawtxt = qrlist[0].split(":")[1];
            var tx = bitcoinjs.Transaction.fromHex(this.rawtxt);
            for (var a in tx.ins) {
                tx.ins[a].txid = Buffer.from(tx.ins[a].hash).reverse().toString('hex');
            }
            for (a in tx.outs) {
                tx.outs[a].address = bitcoinjs.address.fromOutputScript(tx.outs[0].script);
            }
            this.insList = tx.ins;
            this.outsList = tx.outs;
            // this.broadcast(qrlist[0].split(":")[1]);
        }
        else {
            this.add(qr);
        }
    };
    ScanPage.prototype.add = function (c) {
        window["coinList"] = c.split(",");
        for (var i in window["coinList"]) {
            window["coinList"][i] = { name: window["coinList"][i].split(":")[0], address: window["coinList"][i].split(":")[1], amount: 0, price: 0, label: "", color: "black" };
        }
        this.navCtrl.popToRoot();
        window["ex"][2].refreshData = true;
    };
    ScanPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scan',template:/*ion-inline-start:"C:\digi\DSG-Wallet\src\pages\scan.html"*/' <ion-header>\n    <ion-navbar>\n      <ion-title>Scanning QR Code</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content>\n\n<canvas id="qr-canvas" width="320" height="240" style="width: 320px; height: 240px;display:none"></canvas>\n\n  <br><div id="outdiv"></div>\n  <ion-item text-center *ngIf="mode==1">Play video to scan QR</ion-item>\n    <ion-card *ngIf="progressPercent > 0 && insList.length == 0 && outsList.length == 0">\n      <ion-card-header>\n    {{qrDone}} / {{qrTotal}}\n  </ion-card-header>\n    <ion-card-content>\n      <div class="item item-text-wrap">\n        <div class="loader" [style.width]="getPercent()">\n          <p class="percent">{{progressPercent}}%</p>\n        </div>\n      </div>\n      </ion-card-content>\n    </ion-card>\n\n\n\n<div padding *ngIf="insList.length > 0 || outsList.length > 0">\n<ion-item text-center><button ion-button outline (click)="broadcast(rawtxt)">Broadcast transaction</button></ion-item>\n  <ion-segment [(ngModel)]="tab">\n    <ion-segment-button value="inputs">\n      Inputs\n    </ion-segment-button>\n    <ion-segment-button value="outputs">\n      Outputs\n    </ion-segment-button>\n    <ion-segment-button value="trans">\n      Transactions\n    </ion-segment-button>      \n  </ion-segment>\n</div>\n\n<div [ngSwitch]="tab">\n<ion-list *ngSwitchCase="\'inputs\'">\n<ion-item-sliding *ngFor="let item of insList">\n  <ion-item>{{item.txid}} </ion-item>\n</ion-item-sliding>\n</ion-list>\n</div>\n\n<div [ngSwitch]="tab">\n<ion-list  *ngSwitchCase="\'outputs\'">\n<ion-item-sliding *ngFor="let item of outsList">\n    <ion-item>{{item.address}} <br> {{item.value/100000000}}</ion-item>\n</ion-item-sliding>\n</ion-list>\n</div>\n\n<div [ngSwitch]="tab" *ngIf="insList.length > 0 || outsList.length > 0">\n<ion-card  *ngSwitchCase="\'trans\'">\n    <ion-item text-wrap>{{rawtxt}}</ion-item>\n</ion-card>\n</div>\n\n  </ion-content>'/*ion-inline-end:"C:\digi\DSG-Wallet\src\pages\scan.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ScanPage);
    return ScanPage;
}());

//# sourceMappingURL=scan.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(288).Buffer))

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowQRPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_transaction__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_scan__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ShowQRPage = /** @class */ (function () {
    function ShowQRPage(navCtrl, navParams, http, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.iType = checkCamera();
        this.txList = [];
        this.raw = {};
        this.cur = getCookie("CUR");
        window["ClipSavetoast"] = this.toastCtrl.create({
            message: 'Save to clipboard successfully',
            duration: 3000
        });
        this.t = this.navParams.get("t");
        this.id = this.navParams.get("id");
        this.list = this.navParams.get("list");
        this.getRaw();
    }
    ShowQRPage.prototype.moreTx = function () {
        window.open("https://blockchain.info/address/" + this.t);
    };
    ShowQRPage.prototype.onCamera = function () {
        setwebcam();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_scan__["a" /* ScanPage */]);
    };
    ShowQRPage.prototype.animate = function () {
        if (document.getElementById("q" + this.n) == null) {
            clearInterval(window["qrani"]);
            return;
        }
        document.getElementById("q" + this.n).style.display = "none";
        if (this.n == this.t) {
            this.n = 0;
        }
        else {
            this.n++;
        }
        document.getElementById("q" + this.n).style.display = "";
    };
    ShowQRPage.prototype.onTransaction = function (t) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_transaction__["a" /* TransactionsPage */], { t: t });
    };
    ShowQRPage.prototype.onReload = function () {
        var _this = this;
        this.txList = [];
        this.raw = {};
        this.reload = true;
        this.getRaw();
        setTimeout(function () { _this.reload = false; }, 10000);
    };
    ShowQRPage.prototype.getRaw = function () {
        var _this = this;
        if (this.id == 2) {
            this.http.get("https://blockchain.info/multiaddr?active=" + this.t + "&n=20&cors=true").map(function (res) { return res; }).subscribe(function (raw) {
                console.log(raw);
                _this.txList = raw["txs"];
                _this.raw = raw["addresses"][0];
                for (var i in _this.txList) {
                    var k = _this.txList[i];
                    var inout = 0;
                    for (var a in k.inputs) {
                        if (typeof k.inputs[a].prev_out != "undefined") {
                            if (k.inputs[a].prev_out.addr == _this.t) {
                                inout -= k.inputs[a].prev_out.value;
                            }
                        }
                        else {
                            k.inputs[a].prev_out = { addr: "No Inputs (Newly Generated Coins)", value: "0" };
                        }
                    }
                    for (a in k.out) {
                        if (k.out[a].addr == _this.t) {
                            inout += k.out[a].value;
                        }
                    }
                    k.con = raw["info"]["latest_block"]["height"] - k.block_height + 1;
                    k.c = inout > 0 ? "green" : "red";
                    k.inout = parseInt(inout.toString()) / 100000000;
                    k.price = (parseInt(inout.toString()) / 100000000 * window["btcPrice"]);
                    var d = new Date(k.time * 1000);
                    k.dt = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                }
            });
        }
    };
    ShowQRPage.prototype.ionViewDidEnter = function () {
        var qr;
        if (typeof this.list != "undefined") {
            qr = document.getElementById("qr");
            var l = this.navParams.get("list");
            qr.innerHTML = "";
            for (var i in l) {
                if (parseInt(i) < parseInt(l["length"]) - 1) {
                    qr.innerHTML += "<img id='q" + i + "' style='display:none' src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=" + l[i] + "'/>";
                }
                else {
                    qr.innerHTML += "<img id='q" + i + "' src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=" + l[i] + "'/>";
                }
            }
            window["n"] = parseInt(l["length"]) - 1;
            window["t"] = parseInt(l["length"]) - 1;
            window["qrani"] = setInterval(this.animate, 500);
        }
        else {
            qr = document.getElementById("qr");
            qr.innerHTML = "<img src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl={{t}}'/>";
        }
    };
    ShowQRPage.prototype.saveSuccess = function () {
        window["ClipSavetoast"].present();
    };
    ShowQRPage.prototype.autoGen = function () {
        this.t = "DIGISAFEGUARDID:" + makeid();
        setCookie("ID", this.t, 365);
        window["ex"][2].refreshData = true;
    };
    ShowQRPage.prototype.loadID = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'DSG ID',
            message: "Enter your DSG ID",
            inputs: [
                {
                    name: 'id',
                    placeholder: 'DSG ID'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        console.log('Saved clicked');
                        if (data.id != "") {
                            var a = data.id.split(":");
                            if (a.length > 1 && a[0] == "DIGISAFEGUARDID") {
                                setCookie("ID", data.id, 365);
                                _this.t = data.id;
                                window["ex"][2].refreshData = true;
                            }
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    ShowQRPage.prototype.saveID = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Use?',
            message: 'Are you sure want use this DigiSafeGuard ID? All coin attached to previous DigiSafeGuard will be lost.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Ok',
                    handler: function () {
                        setCookie("ID", _this.t, 365);
                        window["ex"][2].refreshData = true;
                    }
                }
            ]
        });
        confirm.present();
    };
    ShowQRPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-show',template:/*ion-inline-start:"C:\digi\DSG-Wallet\src\pages\show.html"*/'  <ion-header>\n    <ion-navbar>\n      <ion-title>QR Code</ion-title>\n    </ion-navbar>\n  </ion-header>\n  <ion-content center text-center><div id="qr"></div><br>\n\n  <ion-card><ion-item text-wrap text-center>{{t}}<br>\n<button ion-button outline icon-right id="Copybtn" ngxClipboard [cbContent]="t" (cbOnSuccess)="saveSuccess()" *ngIf="id!=3">\n    Save to clipboard\n</button></ion-item>\n  </ion-card><br>\n\n\n\n<button ion-button outline *ngIf="id==3"><ion-icon name="ios-camera"></ion-icon>Scan signed transactions <input type="file" onchange="handleFiles(this.files)" id="file-input-broad" *ngIf="iType==1" value="Capturing QR"><input id="file-input-broad" type="button" (click)="onCamera()" *ngIf="iType==0"  value="Capturing QR"></button>\n\n\n<ion-card *ngIf="id==2">\n  <ion-card-header>\n    Transactions\n  </ion-card-header>\n  <ion-card-content>\n    No. Transactions : {{raw.n_tx}} <br>\n    Total Sent : {{raw.total_sent/100000000}} <br>\n    Total Received : {{raw.total_received/100000000}} <br>\n    Final Balance : {{raw.final_balance/100000000}} <br>\n  </ion-card-content>\n</ion-card>\n<br>\n<ion-list *ngIf="id==2">\nLast 20 Transactions <button ion-button outline item-end icon-center (click)="onReload()" [disabled]="reload">\n      <ion-icon name="refresh"></ion-icon></button>\n<ion-item text-center *ngFor="let txs of txList">\n<font color={{txs.c}}> {{txs.dt}} <br> {{txs.inout}} <br> {{txs.price | currency:cur}} <br> {{txs.con}} confirmations</font><button ion-button outline item-end icon-center (click)="onTransaction(txs)">\n      <ion-icon name="information-circle"></ion-icon>\n    </button>\n</ion-item>\n\n<button ion-button outline (click)="moreTx()">More transactions</button>\n\n</ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\digi\DSG-Wallet\src\pages\show.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], ShowQRPage);
    return ShowQRPage;
}());

//# sourceMappingURL=show.js.map

/***/ })

},[208]);
//# sourceMappingURL=main.js.map