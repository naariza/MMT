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
  constructor(
    private _http: HttpClient
    ) 
    { 
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
register(token,user_to_register): Observable<any> {
    let json = JSON.stringify(user_to_register);
    let params = json;

    let headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
    });

    return this._http.post(this.url + 'register', params, { headers: headers });

}

updateUser(token,id:string, user:User): Observable<any> {
    let params = JSON.stringify(user);
        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });
        
        return this._http.put(this.url+'update-User/'+id,params,{headers:headers});
    
}
getUser(token,id:string){
    let headers= new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
    });
    let url = `${this.url}/get-user/${id}`
    return this._http.get(url,{headers});
}
getDriver(token, id: string) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
    });
    let url = `${this.url}/get-driver/${id}`
    return this._http.get(url, { headers });
}
getDrivers(token,car?) {
    let headers= new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
    });
    
    
    if(car == null){
        let url = `${this.url}/get-drivers`
        return this._http.get(url,{headers});
    }else{
        let url2 = `${this.url}/get-drivers/${car}`
        return this._http.get(url2,{headers});
    }
    
}
DeleteUser(token,id:string){
    let headers= new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
    });
    let url = `${this.url}/user-delete/${id}`
    return this._http.delete(url,{headers});
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
