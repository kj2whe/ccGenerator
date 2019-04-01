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
  currentDateTime: Date;
  fto: FormatTypeObject[];
  selectionForm: FormGroup;
  abbr: string;
  displayFormat: string;
  iinMetaRangeEnd: number;
  iinMetaRangeStart: number;
  iinRange: number[];
  issuer: string;
  lengthOfDigits: number[];
  creditCardFormatChosen: string;
  rangeChosen: string;
  lengthChosen: string;


  constructor(
    private luhnService: LuhnService,
    private formatService: FormatService
  ) {
    this.selectionForm = new FormGroup({
      ccSelection: new FormControl(null)
  });
  }

  ngOnInit() {
    this.getAllFormats();
     // this.generateNumber();
  }

  generateNumber(event: any): void {

    this.luhnService
    .getRandomCard(this.creditCardFormatChosen, this.rangeChosen, this.lengthChosen)
    .subscribe(
      data => {
        this.cc = data;
        this.currentDateTime = new Date();
      }
    );
  }

  // generateSpecificFormatAndLengthNumber(): void {
  //   this.luhnService.getRandomCard().subscribe(
  //     data => {
  //       this.cc = data;
  //       this.currentDateTime = new Date();
  //     }
  //   );
  // }

  getAllFormats(): void {
    this.fto = this.formatService.getAllFormats();
  }

  onChange(FormatChosen: any): void {
    this.rangeChosen = undefined;
    this.lengthChosen = undefined;

    const t = this.fto.find(x => x.abbr === FormatChosen.target.value);

     this.creditCardFormatChosen = t.abbr;
     this.displayFormat = t.DisplayFormat;
     this.iinMetaRangeEnd = t.IINMetaRangeEnd;
     this.iinMetaRangeStart = t.IINMetaRangeStart;
     this.iinRange = t.IINRange;

     if (t.IINRange.length === 1) {
      this.rangeChosen = t.IINRange[0].toString();
     }

     this.issuer = t.Issuer;
     this.lengthOfDigits = t.LengthOfDigits;

     if (t.LengthOfDigits.length === 1) {
      this.lengthChosen = t.LengthOfDigits[0].toString();
     }
  }

  iinRangeChosen(rangeChosen: any): void{
    this.rangeChosen = rangeChosen.target.value;
  }

  lengthChooser(lengthChosen: any): void{
    this.lengthChosen = lengthChosen.target.value;
  }


}

