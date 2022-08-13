import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
//import { Console } from 'console';
//input form
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scanActive: boolean = false;

  constructor(public formBuilder: FormBuilder,) {}

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }
      items: any;
      result: JSON;
      allData: any;
      nokp:any;
      nama:any;
      pendapatan:any;
      resultcontent:any;//result from scanned qr
      datadisplay:any;

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanActive = false;
        //alert(result.content); //The QR content will come out here
        //Handle the data as your heart desires here


        //this.result = data;   // get data in result variable
        //this.items = JSON.stringify(result.content); // then convert data to json string
        //console.log(this.items); 
        this.resultcontent=result.content;
        this.allData = JSON.parse(result.content); // parse json data and pass json string
        //console.log(this.allData['nokp']); // got result of particular string

        this.nokp=this.allData['nokp']
        this.nama=this.allData['nama']
        this.pendapatan=this.allData['pendapatan']
        this.datadisplay="All data: "+this.resultcontent+"\n";
        this.datadisplay=this.datadisplay+"NoKP: "+this.nokp+"\n";
        this.datadisplay=this.datadisplay+"Nama: "+this.nama+"\n";
        this.datadisplay=this.datadisplay+"Gaji: "+this.pendapatan+"\n";
        alert(this.datadisplay);

      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }
}

/*
const prepare = () => {
  BarcodeScanner.prepare();
};

const startScan = async () => {
  alert("trying to scan");
  BarcodeScanner.hideBackground();
  const result = await BarcodeScanner.startScan();
  if (result.hasContent) {
    console.log(result.content);
  }
};

const stopScan = () => {
  BarcodeScanner.showBackground();
  BarcodeScanner.stopScan();
};

const askUser = () => {
  prepare();

  const c = confirm('Do you want to scan a barcode?');

  if (c) {
    startScan();
    
  } else {
    stopScan();
  }
};

const checkPermission = async () => {
  // check or request permission
  const status = await BarcodeScanner.checkPermission({ force: true });

  if (status.granted) {
    // the user granted permission
    return true;
  }

  return false;
};



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  scancode(){
    checkPermission();
    askUser();
  }

}
*/
