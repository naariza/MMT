import { Component, OnInit } from "@angular/core";
import { UserService } from "../../Services/user.service";
import { User } from "../../Models/user";
import { promise } from 'protractor';
import { GLOBAL } from "../../Services/global";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { VehiculoService } from "src/app/Services/vehiculo.service";
import { Car } from "src/app/Models/car";

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css'],
    providers: [UserService]
})
export class UserEditComponent implements OnInit {
    public titulo: string;
    public user: User;
    public identity;
    public token;
    public alertMessage;
    public url: string;
    public cars: any;
    public next_page;
    public prev_page;
    public vehiculos: Car[];
    

    constructor(
        private _userService: UserService,
        private _carService:VehiculoService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.titulo = 'Actualizar Mis Datos';
        this.user = this.identity;
        this.url = GLOBAL.url;
        this.next_page=1;
        this.prev_page=1;
        
        
    }

    ngOnInit() {
    this.getUser();
    }
    getUser() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._userService.getUser(this.token, id).subscribe(
                (response: any) => {
                    this.user = response.user;
                    if (!response.user) {
                        this._router.navigate(['/']);
                    } else {
                        this.user = response.user;
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

            );
        });
    }
    onSubmit() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._userService.updateUser(this.token, id, this.user).subscribe(
                (response: any) => {
                    this.user = response.user;
                    if (!response.user) {
                        this.alertMessage = 'Error en el servidor';
                    } else {

                        if (!this.filesToUpload) {
                            this._router.navigate(['/navegador']);
                        } else {
                            //Subir la imagen del usuario
                            this.makeFileRequest(this.url + "upload-image/" + this.user._id, [], this.filesToUpload).then(
                                (result: any) => {
                                    this.user.image = result.image;
                                    let image_path = this.url + 'get-image-user/' + this.user.image;
                                    document.getElementById("identity_image").setAttribute('src', image_path);
                                },
                                error => {
                                    console.log(error);
                                }

                            );
                            this.alertMessage = 'El usuario se ha actualizado correctamente';
                        }
                    }
                },
                error => {
                    var errorMessage = <any>error;
                    var body = error.error.message;
                    if (errorMessage != null) {
                        this.alertMessage = body;
                        console.log(error);
                    }
                }

            );
        });
    }
    public filesToUpload: Array<File>;

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;

    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        var token = this.token;
        return new Promise(function (resolve, reject) {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for (var i = 0; i < files.length; i++) {
                formData.append('image', files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }
}