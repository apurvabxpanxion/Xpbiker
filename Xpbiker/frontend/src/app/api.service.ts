import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()

export class ApiService{
    messages = []
    users = []
    constructor(private http:Http){}

    getMessage(){
        this.http.get('http://localhost:4000/posts').subscribe(res =>{
            this.messages = res.json()
        })
    }
    
    getUsers(){
        this.http.get('http://localhost:4000/users').subscribe(res =>{
            this.users = res.json()
        })
    }
}