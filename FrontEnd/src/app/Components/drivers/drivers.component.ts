import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from 'src/app/Models/user';
import { GLOBAL } from 'src/app/Services/global';
import { UserService } from 'src/app/Services/user.service';

@Component({
    selector: 'app-drivers',
    templateUrl: './drivers.component.html',
    styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

    public titulo: string;
    public drivers: User[];
    public identity;
    public token;
    public url: string;
    public next_page;
    public prev_page;
    public alertMessage;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        public _userService: UserService
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.next_page = 1;
        this.prev_page = 1;
    }

    ngOnInit(): void {
        this.getDrivers();
    }
    getDrivers() {
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];
            if (!page) {
                page = 1;
            } else {
                this.next_page = page + 1;
                this.prev_page = page - 1;

                if (this.prev_page == 0) {
                    this.prev_page = 1;
                }
            }
            this._userService.getDrivers(this.token).subscribe(
                (response: any) => {
                    if (!response.users) {
                        this._router.navigate(['/']);
                    } else {
                        this.drivers = response.users;
                    }
                },
                error => {
                    var errorMessage = <any>error;
                    var body = error.error.message;
                    if (errorMessage != null) {
                        // this.alertMessage = body;
                        console.log(error);
                    }
                }
            )
        });
    }

    public confirmado;
    onDeleteConfirm(id){
        this.confirmado=id;

    }
    onCancelUser(){
        this.confirmado=null;
    }
    onDeleteUser(id) {
        this._userService.DeleteUser(this.token, id).subscribe(
            (response: any) => {
                if (!response.user) {
                    alert("Error en el servido");
                }
                this.getDrivers();
            },
            error => {
                var errorMessage = <any>error;
                var body = error.error.message;
                if (errorMessage != null) {
                    // this.alertMessage = body;
                    console.log(error);
                }
            }
        );
    }
}
