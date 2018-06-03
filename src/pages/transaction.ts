import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})
export class TransactionsPage {

  tab:any;
  t:any;
  listInputs:any;
  listOutputs:any;

 constructor(public navCtrl: NavController,public navParams: NavParams) {
    this.tab = "outputs";
this.t = this.navParams.get("t");

this.listInputs = this.t.inputs;

this.listOutputs = this.t.out;

}

}
