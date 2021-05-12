import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../Models/car';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  public identity;
  public token;
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  register(token,car_to_register): Observable<any> {
    let json = JSON.stringify(car_to_register);
    let params = json;

    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
  });

    return this._http.post(this.url + 'register-car', params, { headers: headers });
  }
  updateCar(token,id:string,car:Car): Observable<any> {
    let params = JSON.stringify(car);
    let headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
    });
    
    return this._http.put(this.url+'update-car/'+id,params,{headers:headers});
  }
  getCar(token,id:string):Observable<any>{
    let headers= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
  });
  let url = `${this.url}/get-car/${id}`
  return this._http.get(url,{headers});
  }
  getCars(token,page?){
    let headers= new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
    });
    let url = `${this.url}/cars/${page}`
    return this._http.get(url,{headers});
}
DeleteCar(token,id:string){
  let headers= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':token
  });
  let url = `${this.url}/delete-car/${id}`
  return this._http.delete(url,{headers});
}
}


