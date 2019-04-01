import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FormatService } from '../../Services/FormatService/format.service';
import { FormatTypeObject } from '../../Models/FormatTypeObject';

@Component({
  selector: 'app-choose-format',
  templateUrl: './choose-format.component.html',
  styleUrls: ['./choose-format.component.css']
})

export class ChooseFormatComponent implements OnInit {
  @Input()
  @Output() test = new EventEmitter<string>();
  fto: FormatTypeObject[];
  currentDateTime: Date;
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
    private formatService: FormatService
  ) {
    this.selectionForm = new FormGroup({
      ccSelection: new FormControl(null)
  });
  }

  ngOnInit() {
    this.getAllFormats();
  }

  getAllFormats(): void {
    this.fto = this.formatService.getAllFormats();
  }

  onChange(FormatChosen: any): void {
    const t = this.fto.find(x => x.abbr === FormatChosen.target.value);

     this.creditCardFormatChosen = t.abbr;
     this.displayFormat = t.DisplayFormat;
     this.iinMetaRangeEnd = t.IINMetaRangeEnd;
     this.iinMetaRangeStart = t.IINMetaRangeStart;
     this.iinRange = t.IINRange;
     this.issuer = t.Issuer;
     this.lengthOfDigits = t.LengthOfDigits;
  }

  iinRangeChosen(rangeChosen: any): void{
    this.rangeChosen = rangeChosen.target.value;
  }

  lengthChooser(lengthChosen: any): void{
    this.lengthChosen = lengthChosen.target.value;
  }

}
