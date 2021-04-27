import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "../Models/user";
import { GLOBAL } from "../Services/global";
import { JsonPipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';


@Injectable()
export class UserService {
  public identity;
  public token;
  public url: string;
  drivers:User[];
  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }
  singup(user_to_login, gethash = null): Observable<any> {
    if (gethash != null) {
        user_to_login.gethash = gethash;
    }
    let json = JSON.stringify(user_to_login);
    let params = json;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if(user_to_login.email){
        return this._http.post(this.url + 'login-Admin', params, { headers: headers });
    }else{

        return this._http.post(this.url + 'login-User', params, { headers: headers });   
    }
}
register(user_to_register): Observable<any> {
    let json = JSON.stringify(user_to_register);
    let params = json;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post(this.url + 'register', params, { headers: headers });

}
updateUser(user_to_update): Observable<any> {
    let json = JSON.stringify(user_to_update);
    let params = json;
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':this.getToken()});
    return this._http.put(this.url + 'update-User/' + user_to_update._id, params, { headers: headers });
}
getUser(token,id:string){
    let headers= new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
    });
    let url = `${this.url}/get-user/${id}`
    return this._http.get(url,{headers});
}
getDrivers(token,page){
    let headers= new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
    });
    let url = `${this.url}/get-drivers/${page}`
    return this._http.get(url,{headers});
}
getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));
    if (identity != "undefined") {
        this.identity = identity;
    } else {
        this.identity = null;
    }
    return this.identity;
}

getToken() {
    let token = localStorage.getItem('token');
    if (token != "undefined") {
        this.token = token;
    } else {
       this.token = null;
    }
   return this.token
}
}
