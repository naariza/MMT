import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { GLOBAL } from "../../Services/global";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public identity;
public token;
public url;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    
  )
   { 
    this.url=GLOBAL.url;
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token=null;
    this._router.navigate[('/')];
  }
}
