import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  response: any = [];
  constructor(private http: HttpClient) { }
  GetData(url) {

    let body = new FormData();
    return new Promise((resolve, reject) => {
      return this.http.get(url)
        .toPromise()
        .then(( res: any ) => resolve(res))
        .catch(err => console.log('error:', err));
    });

  }
}
