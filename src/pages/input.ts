import { Component,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { ScanPage } from '../pages/scan';
import { ShowQRPage } from '../pages/show';

declare var checkCamera: any;
declare var md5: any;
declare var setwebcam: any;
declare var WAValidator: any;
declare var getCookie: any;

@Component({
  selector: 'page-input',
  templateUrl: 'input.html'
})
export class InputPage {

  unspent:any;
  from:any;
  feeList:any;
  total:any;
  fees:any;
  percent:any;
  amount:any;
  price:any;
  addressok:any;
  address:any;
  f_amount:any;
  f_price:any;
  listInputs:any;
  listOutputs:any;
  tx:any;
  cur:any;
  tab:any;
  insList:any;
  outsList:any;

	iType = checkCamera();
  inputID: string = "";

  constructor(public zone: NgZone,public navCtrl: NavController,public navParams: NavParams) {
    this.unspent = this.navParams.get("unspent").unspent_outputs;
    this.from = this.navParams.get("address");
    this.feeList = this.navParams.get("fees");
    this.total = 0;
    for(var i in this.unspent){
      this.total += this.unspent[i].value;
    }
    this.total = this.total/100000000;

        this.fees = 5;
   this.percent = 0;
   this.amount = 0;
   this.price = 0;

   this.addressok = false;

   window["sendPage"] = this;

  }


  buildTx(){

    var totalout = 0;
    var txb = new window["bitcoinjs"].TransactionBuilder()
   for(var i in this.unspent){
       totalout += this.unspent[i].value;
       txb.addInput(this.unspent[i].tx_hash_big_endian,this.unspent[i].tx_output_n);
       if(this.amount*100000000 <= totalout){
           break;
       }
   }

      var amt = Math.floor(this.amount*100000000);
      if(amt == totalout){

         txb.addOutput(this.address,totalout);
      }else{

         var tot = Math.floor(amt);
         var bal = Math.floor(totalout-amt);


         txb.addOutput(this.address,tot);
         txb.addOutput(this.from,bal);                
      }


      var txsize = txb.buildIncomplete().toHex().length;
      this.f_amount = txsize * this.feeList["n"+this.fees]/1000;
      this.f_amount = this.f_amount.toFixed(8);
      this.f_price = (this.f_amount*window["btcPrice"]);

      if(Number(this.amount) + Number(this.f_amount) > this.total){
        this.amount = this.amount - this.f_amount;
        this.amount = this.amount.toFixed(8);
        this.price = (this.amount*window["btcPrice"]);
      }

    this.listInputs = [];
    this.listOutputs = [];
   totalout = 0;
   
    txb = new window["bitcoinjs"].TransactionBuilder()
   for(i in this.unspent){
       totalout += this.unspent[i].value;
       txb.addInput(this.unspent[i].tx_hash_big_endian,this.unspent[i].tx_output_n);
       this.listInputs.push(this.unspent[i]);
       if((Number(this.amount)+Number(this.f_amount))*100000000 <= totalout){
           break;
       }
   }

      if((Number(this.amount)+Number(this.f_amount))*100000000 == totalout){
         amt = Math.floor(this.amount*100000000);
         txb.addOutput(this.address,amt);
        this.listOutputs.push({address:this.address,value:amt});
      }else{              
         tot = Math.floor(this.amount*100000000);
         var ftot = Math.floor(this.f_amount*100000000);
         bal = Math.floor(totalout-tot-ftot);

        txb.addOutput(this.address,tot);

        this.listOutputs.push({address:this.address,value:tot});
        if(bal > 1){
          txb.addOutput(this.from,bal); 
          this.listOutputs.push({address:this.from,value:bal}); 
        }      

        
      }

      this.tx = txb.buildIncomplete().toHex();

  }

  onCamera(){
    setwebcam(true);
    this.navCtrl.push(ScanPage);   
  }

  onAmtChange(){
    if(this.amount > this.total){
      this.amount = this.total;
    }
    this.price = (this.amount*window["btcPrice"]);

    this.percent = this.amount/this.total*100;

    this.buildTx();
  }
  onPriceChange(){
    this.amount = (this.price/window["btcPrice"]);
    if(this.amount > this.total){
      this.amount = this.total;
      this.price = (this.amount*window["btcPrice"]);
    }
    this.amount = this.amount.toFixed(8); 
    this.percent = this.amount/this.total*100;
       
    this.buildTx();    
  }
  onPerChange(){
    this.amount = this.percent*this.total/100;
    this.amount = this.amount.toFixed(8);
    this.price = (this.amount*window["btcPrice"]);
    this.buildTx();        
  }  
  onFPerChange(){
    this.buildTx();        
  }    

setAddress(a){
  this.zone.run(() => { this.address = a; this.addressok = true;});
}

  onAddressChange(){
    this.addressok = WAValidator.validate(this.address,"BTC");
    
  }

  showQR(){
    if(typeof this.tx != "undefined"){
    var len = 100;
    //var l = Math.ceil(this.tx.length / Math.ceil(this.tx.length/len));
    var t = "signbtc:"+this.tx+",fromaddress:"+this.from;
    var list = t.match(new RegExp('.{1,' + len + '}', 'g'));
    for(var i in list){
      list[i] = (Number(i)+1)+":"+list.length+","+list[i]+","+md5(list[i]);
    }
    list[i] += ","+md5(t);
    //console.log(t);
    //console.log(list);
    this.navCtrl.push(ShowQRPage,{t:"* Please scan this QR by your DSG. Subsequently DSG will sign your transaction, and provide you with a new QR containing signed transactions. Next scan it using the button below to broadcast it",id:3,list:list});

    }
  }


ionViewDidEnter(){
  this.cur = getCookie("CUR");
}

}