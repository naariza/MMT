import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
public url:string;
  constructor(
    private _http: HttpClient
  ) 
  {
    this.url = GLOBAL.url;
   }
  saveForm(token,formulario): Observable<any> {
    let json = JSON.stringify(formulario);
    let params = json;

    let headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
    });

    return this._http.post(this.url + 'create-form', params, { headers: headers });

}
getForm(token, id: string) {
  let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
  });
  let url = `${this.url}/get-form/${id}`
  return this._http.get(url, { headers });
}
}
