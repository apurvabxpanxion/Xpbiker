import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthService{
    messages = []
    constructor(private http:Http){}
    
    getUser(registerData){
        this.http.post('http://localhost:4000/register', registerData).subscribe(res =>{
            
        })
    }

    loginUser(loginData){
        this.http.post("http://localhost:4000/login", loginData).subscribe(res =>{
            console.log(res)
        })
    }
}