import { Component, OnInit, Input } from '@angular/core';

import { LuhnService } from '../../Services/LuhnService/luhn.service';
import { CardResponseObject } from '../../Models/CardResponseObject';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent implements OnInit {
  @Input()
  cc: CardResponseObject;
  currentDateTime: Date;

  constructor(
    private luhnService: LuhnService
  ) { }

  ngOnInit() {
     this.generateNumber();
  }

  generateNumber(): void {
    this.luhnService.getRandomCard().subscribe(
      data => {
        this.cc = data;
        this.currentDateTime = new Date();
      }
    );
  }

  generateSpecificFormatAndLengthNumber(): void {
    this.luhnService.getRandomCard().subscribe(
      data => {
        this.cc = data;
        this.currentDateTime = new Date();
      }
    );
  }


}

