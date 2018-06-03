import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { InputPage } from '../pages/input';
import { AddressesPage } from '../pages/addresses';

import { ShowQRPage } from '../pages/show';
import { ScanPage } from '../pages/scan';

declare var setCookie: any;
declare var getCookie: any;
declare var checkCamera: any;
declare var setwebcam: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listData:any;
  totalPrice:any;
  fil:any;
  cur:any;
  refreshData:any;
  coinList:any;
  reload:any;
  dID:any;


  iType = checkCamera();

filList(): string[] {
    return [
"ALL","BTC","ETH","LTC","XMR"
    ];
  }

curList(): string[] {
    return [
"AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "USD", "ZAR"
    ];
  }


  getBal(url,i){
        this.http.get(url).map(res => res).subscribe(c => {
            var b = c["_body"];
            if(this.listData[i].name == "BTC"){
              this.listData[i].amount = parseInt(b)/100000000;
              this.listData[i].price = (parseInt(b)/100000000*window["btcPrice"]);

              if(this.listData[i].amount > 0){
                this.listData[i].color = "green";
              }else{
                this.listData[i].color = "black";             
              }
            }else
            if(this.listData[i].name == "ETH"){
              var bal = JSON.parse(b).balance;
            this.listData[i].amount = parseInt(bal)/1000000000000000000;
            this.listData[i].price = (parseInt(bal)/1000000000000000000*window["ethPrice"]);
            } 

            this.totalPrice +=this.listData[i].price;
                       
        });  
  }

  getBalance(){
    for(var i in this.listData){
      if(this.listData[i].show==true){
        var url="";
        if(this.listData[i].name == "BTC"){
          url = "https://blockchain.info/q/addressbalance/"+this.listData[i].address;
        }else
          if(this.listData[i].name == "ETH"){
          url = "https://api.blockcypher.com/v1/eth/main/addrs/"+this.listData[i].address+"/balance";
        }else{
          continue;
        }

        this.getBal(url,i);

      }

    }
  }

  filterData(list){
          var show = getCookie("FIL");

         for(var i in list){

            //list[i] = {name:list[i].split(":")[0],address:list[i].split(":")[1],amount:0,price:0,label:"undefined",fav:1};
            list[i].show = true;
            if(show == "ALL"){

            }else
            if(show != list[i].name){
                list[i].show = false;
            }

        }
        return list;     
  }

  filChange(){
    setCookie("FIL",this.fil,365);
    this.getList();  
  }

  curChange(){
    setCookie("CUR",this.cur,365);
    this.getMarketPrice();
  }

  getList(){
    if(getCookie("ID") !=""){
      this.refreshData = false;
          this.listData = this.filterData(window["coinList"]);
          this.totalPrice = 0;
          this.getBalance();
    }
  }

  getMarketPrice(){
    var c = getCookie("CUR");
    this.http.get("https://api.coinmarketcap.com/v1/ticker/?convert="+c+"&limit=10").map(res => res.json()).subscribe(priceList => {

        window["btcPrice"] = priceList[0]["price_"+c.toLowerCase()];
        window["ethPrice"] = priceList[1]["price_"+c.toLowerCase()];
        this.getList();
    });
  }

  constructor(public navCtrl: NavController, public http: Http, public httpc: HttpClient,public alertCtrl: AlertController) {
    window["ex2"] = [navCtrl,ScanPage,this];

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
             if(getCookie("CUR")==""){
            setCookie("CUR","USD",365);
     }
    this.cur= getCookie("CUR");

     if(getCookie("FIL")==""){
            setCookie("FIL","ALL",365);
     }

    this.fil= getCookie("FIL");

    this.refreshData = false;
     this.getMarketPrice();
  }


  setFav(id,f){

      this.http.get("setfav.php?id="+getCookie("ID")+"&cid="+id+"&fav="+f).map(res => res).subscribe(list => {
          this.getList(); 
    });
 
  }

  removeCoin(id){

    let confirm = this.alertCtrl.create({
      title: 'Delete?',
      message: 'Are you sure want to delete?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: () => {
              this.http.get("remove.php?id="+getCookie("ID")+"&cid="+id).map(res => res).subscribe(list => {
                  this.getList(); 
            });
          }
        }
      ]
    });
    confirm.present();


 
  }

  onReceive(t){
    if(t.address.substr(0,4) == "xpub"){

      try {
          var n = window["HD"]["fromBase58"](t.address);
          this.navCtrl.push(AddressesPage,{t:t,show:"Unused",n:n});          
      }
      catch(err) {

      }


    }else{
      this.showQR(t,"undefined");
    }
  }

  onSend(t){
    if(t.address.substr(0,4) == "xpub"){

      try {
          var n = window["HD"]["fromBase58"](t.address);
          this.navCtrl.push(AddressesPage,{t:t,show:"Funded",n:n});          
      }
      catch(err) {

      }    
    }else{

    this.http.get("https://blockchain.info/unspent?cors=true&active="+t.address).map(res => res.json()).subscribe(unspent => {
        //this.navCtrl.push(InputPage,{address:t.address,unspent:unspent});
       this.http.get("estimatesmartfee.json").map(res => res.json()).subscribe(fees => {
        this.navCtrl.push(InputPage,{address:t.address,unspent:unspent,fees:fees});
        }); 
    }); 
    }
  }

  showQR(t,i){
    if(i == "undefined"){
      this.navCtrl.push(ShowQRPage,{t:t.address,id:2});
    }else{
      this.navCtrl.push(ShowQRPage,{t:t.address,id:1});      
    }
  }

  showID(){
    if(getCookie("ID") != ""){
      this.showQR({address:getCookie("ID")},"ID");
    }
  }

  onCamera(){
    setwebcam();     
    this.navCtrl.push(ScanPage);

  }

  onKeyPad(){
    this.navCtrl.push(InputPage);
  }

  onReload(){
    this.reload = true;
    this.getList();
    setTimeout(()=>{this.reload = false;},10000);
  }

  onLogout(){
    setCookie("ID","",365);
    this.dID = getCookie("ID");
    this.totalPrice = 0;
  }


ionViewDidEnter(){





    this.dID = getCookie("ID");


      this.getList();


}

}
