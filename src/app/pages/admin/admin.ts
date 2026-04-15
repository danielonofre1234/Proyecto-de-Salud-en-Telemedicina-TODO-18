import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
selector:'app-admin',
standalone:true,
imports:[CommonModule, FormsModule],
templateUrl:'./admin.html',
styleUrl:'./admin.css'
})
export class Admin {

users:any[]=[];
adminExists:boolean = false;
/* NUEVO USUARIO */
name:string='';
email:string='';
password:string='';
confirmPassword:string='';
role:string='cliente';
errorMessage:string='';
passwordStrength:number = 0;
passwordStrengthText:string = '';
passwordStrengthClass:string = '';


ngOnInit(){

if(typeof window === 'undefined') return;

const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

if(loggedUser.role !== 'admin'){
window.location.href='/dashboard';
return;
}

/* 🔥 VERIFICAR SI YA EXISTE ADMIN */
const users = JSON.parse(localStorage.getItem('users') || '[]');
this.adminExists = users.some((u:any)=> u.role === 'admin');

this.loadUsers();

}

loadUsers(){
this.users = JSON.parse(localStorage.getItem('users') || '[]');
}

/* CREAR USUARIO */
createUser(){
console.log("click crear usuario");
if(typeof window === 'undefined') return;

this.errorMessage = '';

if(!this.name || !this.email || !this.password || !this.confirmPassword){
this.errorMessage = "Completa todos los campos";
return;
}

/* VALIDAR GMAIL */
if(!this.email.endsWith('@gmail.com')){
this.errorMessage = "Solo se permiten correos @gmail.com";
return;
}

/* VALIDAR CONTRASEÑAS */
if(this.password !== this.confirmPassword){
this.errorMessage = "Las contraseñas no coinciden";
return;
}

const users = JSON.parse(localStorage.getItem('users') || '[]');

/* BLOQUEAR SEGUNDO ADMIN */
if(this.role === 'admin' && this.adminExists){
this.errorMessage = "Ya existe un administrador";
return;
}

const exists = users.find((u:any)=>u.email === this.email);

if(exists){
this.errorMessage = "El usuario ya existe";
return;
}

const newUser = {
id: Date.now(),
name:this.name,
email:this.email,
password:this.password,
role:this.role
};

users.push(newUser);

localStorage.setItem('users', JSON.stringify(users));

this.name='';
this.email='';
this.password='';
this.confirmPassword='';
this.role='cliente';

this.loadUsers();

this.passwordStrength = 0;
this.passwordStrengthText = '';
this.passwordStrengthClass = '';
}

checkPasswordStrength(){

if(!this.password){
this.passwordStrength = 0;
this.passwordStrengthText = '';
this.passwordStrengthClass = '';
return;
}

if(this.password.length < 4){
this.passwordStrength = 33;
this.passwordStrengthText = 'Contraseña débil';
this.passwordStrengthClass = 'weak';
}
else if(this.password.length < 7){
this.passwordStrength = 66;
this.passwordStrengthText = 'Contraseña media';
this.passwordStrengthClass = 'medium';
}
else{
this.passwordStrength = 100;
this.passwordStrengthText = 'Contraseña segura';
this.passwordStrengthClass = 'strong';
}

}

/* ELIMINAR */

deleteUser(user:any){

if(typeof window === 'undefined') return;

if(!confirm("Eliminar usuario?")) return;

this.users = this.users.filter(u => u.id !== user.id);

localStorage.setItem('users', JSON.stringify(this.users));

}

/* ENTRAR COMO USUARIO */
loginAs(user:any){

if(typeof window === 'undefined') return;

localStorage.setItem('loggedUser', JSON.stringify(user));

if(user.role === 'admin'){
window.location.href='/admin';
}
else if(user.role === 'psicologo'){
window.location.href='/psychologist';
}
else{
window.location.href='/dashboard';
}

}

/* LOGOUT */
logout(){

if(typeof window === 'undefined') return;

localStorage.removeItem('loggedUser');
window.location.href='/login';

}

}