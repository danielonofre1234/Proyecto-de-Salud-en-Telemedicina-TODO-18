import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class AuthService {

login(user:any){
if(typeof window !== 'undefined'){
localStorage.setItem('session', JSON.stringify(user));
}
}

logout(){
if(typeof window !== 'undefined'){
localStorage.removeItem('session');
}
}

getUser(){
if(typeof window !== 'undefined'){
const data = localStorage.getItem('session');
return data ? JSON.parse(data) : null;
}
return null;
}

isLoggedIn(){
return this.getUser() !== null;
}

}