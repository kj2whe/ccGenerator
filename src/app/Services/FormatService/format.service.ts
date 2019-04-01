import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { FormatTypeObject } from '../../Models/FormatTypeObject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class FormatService {

    private luhnAPIUrl = environment.APIEndpoint;

    // tslint:disable-next-line:max-line-length
    private ftoJSON: any = JSON.parse('[{"abbr":"ve","Issuer":"Visa Electron","IINRange":[4026,417500,4508,4844,4913,4917],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[16],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"v","Issuer":"Visa","IINRange":[4],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[13,16,19],"DisplayFormat":[{"FormatLength":13,"DigitSpacingFormat":" dddd dddd dddd d","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null},{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null},{"FormatLength":19,"DigitSpacingFormat":" dddd dddd dddd dddd ddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"mc","Issuer":"MasterCard","IINRange":[51,52,53,54,55],"IINMetaRangeStart":222100,"IINMetaRangeEnd":272099,"LengthOfDigits":[16],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"m","Issuer":"Maestro","IINRange":[5018,5020,5038,5893,6304,6759,6761,6762,6763],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[13,15,16,19],"DisplayFormat":[{"FormatLength":13,"DigitSpacingFormat":" dddd dddd ddddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":500000,"IINMetaRangeEnd":509999,"LengthOfDigits":null,"DisplayFormat":null},{"FormatLength":15,"DigitSpacingFormat":" dddd dddddd ddddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":560000,"IINMetaRangeEnd":589999,"LengthOfDigits":null,"DisplayFormat":null},{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":600000,"IINMetaRangeEnd":699999,"LengthOfDigits":null,"DisplayFormat":null},{"FormatLength":19,"DigitSpacingFormat":" dddd dddd dddd dddd ddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"jcb","Issuer":"JCB","IINRange":null,"IINMetaRangeStart":3528,"IINMetaRangeEnd":3589,"LengthOfDigits":[16],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"ip","Issuer":"InstaPayment","IINRange":[637,638,639],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[16],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"d","Issuer":"Discover","IINRange":[6011,644,645,646,647,648,649,65],"IINMetaRangeStart":622126,"IINMetaRangeEnd":622925,"LengthOfDigits":[16],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"cup","Issuer":"China Union Pay","IINRange":[62],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[16,19],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null},{"FormatLength":19,"DigitSpacingFormat":" dddddd ddddddddddddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"dcuc","Issuer":"Diners Club - USA & Canada","IINRange":[54,644,645,646,647,648,649,65],"IINMetaRangeStart":622126,"IINMetaRangeEnd":622925,"LengthOfDigits":[16],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"dci","Issuer":"Diners Club - International","IINRange":[36],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[14],"DisplayFormat":[{"FormatLength":14,"DigitSpacingFormat":" dddd dddddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"dccb","Issuer":"Diners Club - Carte Blanche","IINRange":[300,301,302,303,304,305],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[14],"DisplayFormat":[{"FormatLength":14,"DigitSpacingFormat":" dddd dddddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"ae","Issuer":"American Express","IINRange":[34,37],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[15],"DisplayFormat":[{"FormatLength":15,"DigitSpacingFormat":" dddd dddddd ddddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]}]');
    private fto: FormatTypeObject;

  constructor(
    private http: HttpClient
  ) { }

  // getRandomCard (): Observable<FormatTypeObject> {

  // tslint:disable-next-line:max-line-length
  //   const ftoJSON: any = JSON.parse('[{"abbr":"ve","Issuer":"Visa Electron","IINRange":[4026,417500,4508,4844,4913,4917],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[16],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"v","Issuer":"Visa","IINRange":[4],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[13,16,19],"DisplayFormat":[{"FormatLength":13,"DigitSpacingFormat":" dddd dddd dddd d","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null},{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null},{"FormatLength":19,"DigitSpacingFormat":" dddd dddd dddd dddd ddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"mc","Issuer":"MasterCard","IINRange":[51,52,53,54,55],"IINMetaRangeStart":222100,"IINMetaRangeEnd":272099,"LengthOfDigits":[16],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"m","Issuer":"Maestro","IINRange":[5018,5020,5038,5893,6304,6759,6761,6762,6763],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[13,15,16,19],"DisplayFormat":[{"FormatLength":13,"DigitSpacingFormat":" dddd dddd ddddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":500000,"IINMetaRangeEnd":509999,"LengthOfDigits":null,"DisplayFormat":null},{"FormatLength":15,"DigitSpacingFormat":" dddd dddddd ddddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":560000,"IINMetaRangeEnd":589999,"LengthOfDigits":null,"DisplayFormat":null},{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":600000,"IINMetaRangeEnd":699999,"LengthOfDigits":null,"DisplayFormat":null},{"FormatLength":19,"DigitSpacingFormat":" dddd dddd dddd dddd ddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"jcb","Issuer":"JCB","IINRange":null,"IINMetaRangeStart":3528,"IINMetaRangeEnd":3589,"LengthOfDigits":[16],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"ip","Issuer":"InstaPayment","IINRange":[637,638,639],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[16],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"d","Issuer":"Discover","IINRange":[6011,644,645,646,647,648,649,65],"IINMetaRangeStart":622126,"IINMetaRangeEnd":622925,"LengthOfDigits":[16],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"cup","Issuer":"China Union Pay","IINRange":[62],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[16,19],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null},{"FormatLength":19,"DigitSpacingFormat":" dddddd ddddddddddddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"dcuc","Issuer":"Diners Club - USA & Canada","IINRange":[54,644,645,646,647,648,649,65],"IINMetaRangeStart":622126,"IINMetaRangeEnd":622925,"LengthOfDigits":[16],"DisplayFormat":[{"FormatLength":16,"DigitSpacingFormat":" dddd dddd dddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"dci","Issuer":"Diners Club - International","IINRange":[36],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[14],"DisplayFormat":[{"FormatLength":14,"DigitSpacingFormat":" dddd dddddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"dccb","Issuer":"Diners Club - Carte Blanche","IINRange":[300,301,302,303,304,305],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[14],"DisplayFormat":[{"FormatLength":14,"DigitSpacingFormat":" dddd dddddd dddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]},{"abbr":"ae","Issuer":"American Express","IINRange":[34,37],"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":[15],"DisplayFormat":[{"FormatLength":15,"DigitSpacingFormat":" dddd dddddd ddddd","abbr":null,"Issuer":null,"IINRange":null,"IINMetaRangeStart":0,"IINMetaRangeEnd":0,"LengthOfDigits":null,"DisplayFormat":null}]}]');

  //   const objects: FormatTypeObject[] = ftoJSON;

  //   console.log(`ftoJSON: ${ftoJSON}`);

  //   // return this.http.get<FormatTypeObject>(this.luhnAPIUrl + 'luhn/GenerateNumber')
  //   //  .pipe(
  //   //     map(fto => this.fto = ftoJSON),
  //   //   );

  //   // return Observable.from(objects);
  //   return of(objects);
  // }

  getAllFormats (): FormatTypeObject[] {
    const objects: FormatTypeObject[] = this.ftoJSON;

    // console.log(`ftoJSON: ${this.ftoJSON}`);

    // return this.http.get<FormatTypeObject>(this.luhnAPIUrl + 'luhn/GenerateNumber')
    //  .pipe(
    //     map(fto => this.fto = ftoJSON),
    //   );

    // return Observable.from(objects);
    return objects;
  }
}
