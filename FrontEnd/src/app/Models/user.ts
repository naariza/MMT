export class User{
    constructor(
        public _id:string,
        public name:string,
        public surName:string,
        public email:string,
        public password:string,
        public role:string,
        public image:string,
        public car:any
    ){

    }
}