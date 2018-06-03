import { Component,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';


declare var checkCamera: any;
declare var read: any;
declare var bitcoinjs: any;
declare var setCookie: any;
declare var Buffer: any;
declare var initCanvas: any;

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
  
  tab:any;
  insList:any;
  outsList:any;
  progressPercent:any;
  mode:any;
  qrDone:any;
  qrTotal:any;
  rawtxt:any;



  constructor(public zone: NgZone,public navCtrl: NavController,public navParams: NavParams,public httpc: HttpClient, public http: HttpClient,public alertCtrl: AlertController) {
    this.tab = "trans";
    this.insList = [];
    this.outsList = [];

   this.progressPercent = 0;

   this.mode = checkCamera();

   window["scanPage"] = this;

  }

  ionViewWillLeave() {
    read("error");
  }

  ionViewDidEnter(){
    window["v"].addEventListener('loadedmetadata', function(e){
        initCanvas(window["v"]["videoWidth"],window["v"]["videoHeight"]);
      });
  }

  getPercent(){
    return this.progressPercent +"%";
  }

  setPercent(p,d,t){
    this.zone.run(() => { this.progressPercent = p; this.qrDone = d; this.qrTotal = t; });
  }

  broadcast(tx){


  let headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    this.httpc.post("https://blockchain.info/pushtx?cors=true","tx="+tx, { headers: headers, responseType:"text" })
    .subscribe(res => {
     this.navCtrl.pop();  
    let alert = this.alertCtrl.create({
          title: '',
          subTitle: res,
          buttons: ['OK']
        });
        alert.present();

    }, err => {
 
    this.navCtrl.pop();  
    let alert = this.alertCtrl.create({
          title: 'Failed',
          subTitle: err.error,
          buttons: ['OK']
        });
        alert.present();
        
    });


  }

  readFullQR(qr){
    var qrlist = qr.split(",");
    if(qrlist[0].split(":")[0] == "DIGISAFEGUARDID"){
      setCookie("ID",qrlist[0],365);
      this.add(qr.split(/,(.+)/)[1]);
    }else if(qrlist[0].split(":")[0] == "btcbroadcast"){

      this.rawtxt = qrlist[0].split(":")[1];
      var tx = bitcoinjs.Transaction.fromHex(this.rawtxt);
      for(var a in tx.ins){
        tx.ins[a].txid = Buffer.from(tx.ins[a].hash).reverse().toString('hex');
      }
      for(a in tx.outs){
        tx.outs[a].address = bitcoinjs.address.fromOutputScript(tx.outs[0].script);
      }

      this.insList = tx.ins;
      this.outsList = tx.outs;

     // this.broadcast(qrlist[0].split(":")[1]);

    }else{
      this.add(qr);
    }
  }

   add(c){
     window["coinList"] = c.split(",");
     for(var i in window["coinList"]){
         window["coinList"][i] = {name:window["coinList"][i].split(":")[0],address:window["coinList"][i].split(":")[1],amount:0,price:0,label:"",color:"black"};
     }       
     this.navCtrl.popToRoot();
     window["ex"][2].refreshData = true; 
  }

}
