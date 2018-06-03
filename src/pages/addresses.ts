import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { ShowQRPage } from '../pages/show';


declare var getCookie: any;

@Component({
  selector: 'page-addresses',
  templateUrl: 'addresses.html'
})
export class AddressesPage {

   t:any;
   show:any;
   n:any;
   loading:any;
   aList:any;
   from:any;
   to:any;
   cur:any;


  constructor(public navCtrl: NavController,public navParams: NavParams, public http: Http,public loadingCtrl: LoadingController) {


		this.t = this.navParams.get("t");
    this.show = this.navParams.get("show");
    this.n = this.navParams.get("n");


   this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
    this.loading.present();
    window["tfunc"] = this;
    setTimeout(function(){
      window["tfunc"].fetchAddress();
    },300);

  }

  onReceive(t){
      this.navCtrl.push(ShowQRPage,{t:t.address,id:2});
  }

  fetchAddress(){

    this.aList = [];
    this.from = 0;
    this.to = 20;



    var l = [];
    var ll = [];
    for(var i=this.from; i < this.to ; i++){
        var addr = this.n.derive(0).derive(i).getAddress();
        l.push({address:addr,name:this.t.name,price:0,amount:0,total_received:0,fbal:0});
        ll.push(addr);
    }

    if(this.t.amount == 0){
      this.loading.dismiss();
      this.aList = l;
    }else{
      var url = "https://blockchain.info/multiaddr?active="+ll.join("|")+"&cors=true";
      this.http.get(url).map(res => res.json()).subscribe(list => {
          var tl = [];
          list = list.addresses;
          for(var i in list){
              var b = list[i].final_balance;
              tl.push({address:list[i].address,name:this.t.name,price:(parseInt(b)/100000000*window["btcPrice"]),amount:parseInt(b)/100000000,total_received:list[i].total_received,fbal:b});
          }
          this.aList = tl;
          this.loading.dismiss();          
    });
    }
  }


  ionViewDidEnter(){

    this.cur= getCookie("CUR");


  }
}