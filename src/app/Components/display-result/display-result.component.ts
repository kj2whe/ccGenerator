import { Component, OnInit } from '@angular/core';

import { LuhnService } from '../../Services/LuhnService/luhn.service';
import { CardResponseObject } from '../../Models/CardResponseObject';

import { FormControl, FormGroup } from '@angular/forms';

import { FormatService } from '../../Services/FormatService/format.service';
import { FormatTypeObject } from '../../Models/FormatTypeObject';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent implements OnInit {
  cc: CardResponseObject;
  fto: FormatTypeObject[];
  selectionForm: FormGroup;
  abbr: string;
  displayFormat: string;
  iinMetaRangeEnd: number;
  iinMetaRangeStart: number;
  isIINMetaRangeChoiceAvailable: boolean;
  iinMetaRangeChoice: number;
  iinRange: number[];
  issuer: string;
  lengthOfDigits: number[];
  creditCardFormatChosen: string;
  rangeChosen: string;
  lengthChosen: string;
  ccButtonDisabled: boolean;
  iinMetaRangeText: string;
  iinMetaRangeValue: number;


  constructor(
    private luhnService: LuhnService,
    private formatService: FormatService
  ) {
    this.selectionForm = new FormGroup({
      ccSelection: new FormControl(null)
  });
    this.ccButtonDisabled = true;
  }

  ngOnInit() {
    this.getAllFormats();
  }

  generateNumber(event: any): void {

    let tt;

    if (this.rangeChosen === undefined && document.querySelector('input[name="selected_iinRange"]:checked').value === 'AAA') {
      tt = (Math.floor(Math.random() * (this.iinMetaRangeEnd - this.iinMetaRangeStart + 1)) + this.iinMetaRangeStart).toString();
    } else {
      tt = this.rangeChosen;
    }

    this.ccButtonDisabled = true;
    document.getElementById('generateNumber').classList.add('d-none');
    document.getElementById('progressSpinner').classList.remove('d-none');
    this.luhnService
    .getRandomCard(this.creditCardFormatChosen, tt, this.lengthChosen)
    .subscribe(
      data => {
        this.cc = data;
        this.cc.CardNumberFormatted = data.CardNumber.replace(/\s+/g, '').replace(/(\d\d\d\d)/g, '$1 ').trim();
        this.ccButtonDisabled = false;
        document.getElementById('generateNumber').classList.remove('d-none');
        document.getElementById('progressSpinner').classList.add('d-none');
      }
    );
  }

  copyText(inputElement: any): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.cc.CardNumberFormatted.replace(/\s/g, '');
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    }

  getAllFormats(): void {
    this.fto = this.formatService.getAllFormats();
  }

  onChange(FormatChosen: any): void {
    this.rangeChosen = undefined;
    this.lengthChosen = undefined;
    this.ccButtonDisabled = true;
    this.isIINMetaRangeChoiceAvailable = false;

    const t = this.fto.find(x => x.abbr === FormatChosen.target.value);

     this.creditCardFormatChosen = t.abbr;
     this.displayFormat = t.DisplayFormat;
     this.iinMetaRangeEnd = t.IINMetaRangeEnd;
     this.iinMetaRangeStart = t.IINMetaRangeStart;
     this.iinRange = t.IINRange;
     this.issuer = t.Issuer;
     this.lengthOfDigits = t.LengthOfDigits;


     if (this.iinMetaRangeEnd > 0 && this.iinMetaRangeStart > 0) {
      // tslint:disable-next-line: max-line-length
      this.iinMetaRangeText = 'Do you want to begin your Credit Card number between ' + this.iinMetaRangeStart + ' to ' + this.iinMetaRangeEnd + '?';
      this.isIINMetaRangeChoiceAvailable = true;
     }

     if (t.IINRange.length === 1) {
      this.rangeChosen = t.IINRange[0].toString();
     }

     if (t.LengthOfDigits.length === 1) {
      this.lengthChosen = t.LengthOfDigits[0].toString();
     }

     if (t.IINRange.length === 1 && t.LengthOfDigits.length === 1) {
      this.ccButtonDisabled = false;
     }
  }

  iinRangeChosen(rangeChosen: any): void {
    this.rangeChosen = rangeChosen.target.value;
    this.ccButtonDisabled =  (this.lengthChosen ? false : true);
  }

  lengthChooser(lengthChosen: any): void {
    this.lengthChosen = lengthChosen.target.value;

    this.ccButtonDisabled =  (this.rangeChosen ? false : true);
  }

  iinMetaRangeChosen(rangeChosen: any): void {
    this.ccButtonDisabled = false;
  }


}

