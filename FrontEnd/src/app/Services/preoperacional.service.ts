import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PreoperacionalService {
public url;
  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }
  savePreo(token,preoperacional): Observable<any> {
    let json = JSON.stringify(preoperacional);
    let params = json;

    let headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
    });

    return this._http.post(this.url + 'create-preoperacional', params, { headers: headers });

}
getPreo(token,carId):Observable<any>{
    let headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
    });
    let url = `${this.url}/preoperacionales/${carId}`
    return this._http.get(url,{headers});
}
getPreoDriver(token,carId):Observable<any>{
  let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
  });
  let url = `${this.url}/preoperacionales-driver/${carId}`
  return this._http.get(url,{headers});
}
}
