import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/Services/global';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-bubble-user',
  templateUrl: './bubble-user.component.html',
  styleUrls: ['./bubble-user.component.css']
})
export class BubbleUserComponent implements OnInit {
public identity;
public token;
public url;
  constructor(
    private _userService:UserService,
    private _router:Router
  ) {
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
