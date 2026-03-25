import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

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

constructor(private router:Router){}

login(){

const users = JSON.parse(localStorage.getItem('users') || '[]');

const user = users.find((u:any)=>
u.email === this.email &&
u.password === this.password
);

if(!user){
alert('Correo o contraseña incorrecta');
return;
}

localStorage.setItem('loggedUser', JSON.stringify(user));

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

togglePassword(){
this.showPassword = !this.showPassword;
}

}