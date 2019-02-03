import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormatService } from '../../Services/FormatService/format.service';
import { FormatTypeObject } from '../../Models/FormatTypeObject';

@Component({
  selector: 'app-choose-format',
  templateUrl: './choose-format.component.html',
  styleUrls: ['./choose-format.component.css']
})
export class ChooseFormatComponent implements OnInit {
  @Input()
  fto: FormatTypeObject[];
  currentDateTime: Date;
  selectionForm: FormGroup;

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

}
