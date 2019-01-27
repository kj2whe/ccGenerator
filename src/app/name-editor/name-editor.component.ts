import { Component, OnInit, Input } from '@angular/core';

import { LuhnService } from '../LuhnService/LuhnService';
import { CardResponseObject } from '../CardResponseObject';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent implements OnInit {
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

}

