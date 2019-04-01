import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { CardResponseObject } from '../../Models/CardResponseObject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LuhnService {

  private luhnAPIUrl = environment.APIEndpoint;

  private cro: CardResponseObject;

  constructor(
    private http: HttpClient
  ) { }

    /** GET heroes from the server */
    getRandomCard (creditCardFormatChosen: string, rangeChosen: string, lengthChosen: string): Observable<CardResponseObject> {

      let apiUrl = `${this.luhnAPIUrl}luhn/GenerateNumber`;

      if (creditCardFormatChosen != null && lengthChosen != null && rangeChosen != null){
        apiUrl += `/${creditCardFormatChosen}/${lengthChosen}/${rangeChosen}`;
      } else if (creditCardFormatChosen != null && lengthChosen != null){
        apiUrl += `/${creditCardFormatChosen}/${lengthChosen}`;
      } else if (creditCardFormatChosen != null){
        apiUrl += `/${creditCardFormatChosen}`;
      }

      return this.http.get<CardResponseObject>(apiUrl)
       .pipe(
          map(cc => this.cro = cc),
        );
    }

    getCardWithSpecificFormat (): Observable<CardResponseObject> {

      return this.http.get<CardResponseObject>(this.luhnAPIUrl + 'luhn/GenerateNumber')
       .pipe(
          map(cc => this.cro = cc),
        );
    }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
    console.log(`Message: ${message}`);
  }
}
