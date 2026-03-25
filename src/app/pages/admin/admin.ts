import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
selector:'app-admin',
standalone:true,
imports:[CommonModule],
templateUrl:'./admin.html',
styleUrl:'./admin.css'
})
export class Admin {

users:any[]=[];

ngOnInit(){

const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

if(loggedUser.role !== 'admin'){
window.location.href='/dashboard';
return;
}

this.loadUsers();
}

loadUsers(){
this.users = JSON.parse(localStorage.getItem('users') || '[]');
}

logout(){
localStorage.removeItem('loggedUser');
window.location.href='/login';
}

}