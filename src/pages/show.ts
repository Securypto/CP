import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TransactionsPage } from '../pages/transaction';
import { ScanPage } from '../pages/scan';

declare var checkCamera: any;
declare var setwebcam: any;
declare var getCookie: any;
declare var setCookie: any;
declare var makeid: any;

@Component({
  selector: 'page-show',
  templateUrl: 'show.html'
})
export class ShowQRPage {

    txList:any;
    raw:any;
    cur:any;
    t:any;
    id:any;
    list:any;
    n:any;
    qrani:any;
    reload:any;


    iType = checkCamera();

    constructor(public navCtrl: NavController,public navParams: NavParams, public http: HttpClient,public alertCtrl: AlertController,public toastCtrl: ToastController) {

  this.txList = [];
  this.raw = {};

    this.cur= getCookie("CUR");




    window["ClipSavetoast"] = this.toastCtrl.create({
      message: 'Save to clipboard successfully',
      duration: 3000
    });


this.t = this.navParams.get("t");
this.id = this.navParams.get("id");
this.list = this.navParams.get("list");

    this.getRaw();

  }

  moreTx(){
    window.open("https://blockchain.info/address/"+this.t);
  }

  onCamera(){
        setwebcam(); 
    this.navCtrl.push(ScanPage);
  }

animate(){

  if(document.getElementById("q"+this.n) == null){
    clearInterval(window["qrani"]);
    return;
  }

  document.getElementById("q"+this.n).style.display = "none";

  if(this.n == this.t){
    this.n = 0;
  }else{
    this.n++;
  }

  document.getElementById("q"+this.n).style.display = "";

}

onTransaction(t){
  this.navCtrl.push(TransactionsPage,{t:t});
}

onReload(){
    this.txList = [];
  this.raw = {};
    this.reload = true;
    this.getRaw();
    setTimeout(()=>{this.reload = false;},10000);  
}

getRaw(){
  if(this.id==2){
    this.http.get("https://blockchain.info/multiaddr?active="+this.t+"&n=20&cors=true").map(res => res).subscribe(raw => {
       console.log(raw);
       this.txList = raw["txs"];
       this.raw = raw["addresses"][0];
       for(var i in this.txList){
         var k = this.txList[i];
         var inout = 0;
         for(var a in k.inputs){
           if(typeof k.inputs[a].prev_out != "undefined"){
             if(k.inputs[a].prev_out.addr == this.t){
               inout -= k.inputs[a].prev_out.value;
             }
           }else{
             k.inputs[a].prev_out = {addr:"No Inputs (Newly Generated Coins)",value:"0"};
           }
         }

         for(a in k.out){
             if(k.out[a].addr == this.t){
               inout += k.out[a].value;
             }
         }
         k.con = raw["info"]["latest_block"]["height"] - k.block_height+1;
         k.c = inout > 0 ? "green" : "red";
         k.inout = parseInt(inout.toString())/100000000;
         k.price = (parseInt(inout.toString())/100000000*window["btcPrice"]);
         var d = new Date(k.time*1000);
         k.dt =d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +d.getHours() + ":" + d.getMinutes()+":"+d.getSeconds();
       }
    }); 
  }
  }

ionViewDidEnter(){


  var qr;
if (typeof this.list != "undefined"){
  qr = document.getElementById("qr");
  var l = this.navParams.get("list");
  qr.innerHTML = "";
  for (var i in l){
    if(parseInt(i) < parseInt(l["length"])-1){
      qr.innerHTML += "<img id='q"+i+"' style='display:none' src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl="+l[i]+"'/>";
    }else{
      qr.innerHTML += "<img id='q"+i+"' src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl="+l[i]+"'/>";
    }
  }
  window["n"] = parseInt(l["length"])-1;
  window["t"] = parseInt(l["length"])-1;
  window["qrani"] = setInterval(this.animate,500); 
}else{
  qr = document.getElementById("qr");
  qr.innerHTML = "<img src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl={{t}}'/>";
}

}

  saveSuccess(){
  window["ClipSavetoast"].present();
  }


  autoGen(){
    this.t = "DIGISAFEGUARDID:" + makeid();
              setCookie("ID",this.t,365);
              window["ex"][2].refreshData = true; 
  }

  loadID(){

 let prompt = this.alertCtrl.create({
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
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            if(data.id != ""){
              var a = data.id.split(":");
              if(a.length > 1 && a[0] == "DIGISAFEGUARDID"){
                  setCookie("ID",data.id,365);
                  this.t = data.id;
                  window["ex"][2].refreshData = true;
              }
            }
          }
        }
      ]
    });
    prompt.present();
  

  }

  saveID(){

      let confirm = this.alertCtrl.create({
      title: 'Use?',
      message: 'Are you sure want use this DigiSafeGuard ID? All coin attached to previous DigiSafeGuard will be lost.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: () => {
              setCookie("ID",this.t,365);
              window["ex"][2].refreshData = true; 
          }
        }
      ]
    });
    confirm.present();
  }

}
