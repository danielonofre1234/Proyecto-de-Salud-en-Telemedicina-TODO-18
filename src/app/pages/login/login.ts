import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
selector: 'app-login',
standalone: true,
imports: [FormsModule, CommonModule, RouterModule],
templateUrl: './login.html',
styleUrl: './login.css'
})
export class Login {

email:string='';
password:string='';
showPassword:boolean=false;
rememberEmail:boolean = false;
loginError:boolean = false;
recoveryEmail:string="";
recoveryCode:string="";
generatedCode:string="";
newPassword:string="";
step:number = 0;

constructor(private router:Router){}

ngOnInit(){

emailjs.init('gm0B0EM9Biv_94uiZ');

if(typeof window !== 'undefined'){
const savedEmail = localStorage.getItem('rememberEmail');
if(savedEmail){
this.email = savedEmail;
this.rememberEmail = true;
}
}

}

login(){

if(typeof window !== 'undefined'){

const users = JSON.parse(localStorage.getItem('users') || '[]');

const user = users.find((u:any)=>
u.email === this.email &&
u.password === this.password
);

if(!user){
this.loginError = true;
return;
}

this.loginError = false;

localStorage.setItem('loggedUser', JSON.stringify(user));

if(this.rememberEmail){
localStorage.setItem('rememberEmail', this.email);
}

/* REDIRECCION POR ROL */
if(user.role === 'admin'){
this.router.navigate(['/admin']);
}
else if(user.role === 'psicologo'){
this.router.navigate(['/psychologist']);
}
else{
this.router.navigate(['/dashboard']);
}

}

}

togglePassword(){
this.showPassword = !this.showPassword;
}

sendRecoveryCode(){

if(typeof window !== 'undefined'){

const users = JSON.parse(localStorage.getItem('users') || '[]');

const user = users.find((u:any)=> u.email === this.recoveryEmail);

if(!user){
alert("Correo no registrado");
return;
}

/* generar código */
this.generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

emailjs.send(
'service_k3bl17o',
'template_ey1d0qt',
{
code: this.generatedCode,
to_email: this.recoveryEmail
},
'gm0B0EM9Biv_94uiZ'
);

alert("Código enviado al correo");

this.step = 2;

}

}

verifyCode(){

if(this.recoveryCode === this.generatedCode){
this.step = 3;
}else{
alert("Código incorrecto");
}

}

changePassword(){

if(typeof window !== 'undefined'){

const users = JSON.parse(localStorage.getItem('users') || '[]');

const index = users.findIndex((u:any)=> u.email === this.recoveryEmail);

if(index !== -1){
users[index].password = this.newPassword;
}

localStorage.setItem('users', JSON.stringify(users));

alert("Contraseña actualizada");

this.step = 0;

}

}

}