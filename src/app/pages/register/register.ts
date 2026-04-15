import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = 'client'; // 🔥 corregido
passwordStrength:number = 0;
passwordStrengthText:string = '';
passwordStrengthClass:string = '';


passwordsMatch:boolean = false;
emailInvalid:boolean = false;
adminExists:boolean = false;

successMessage:boolean = false;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  errorMessage: string = '';

  constructor(private router: Router) {}

register(){

this.errorMessage = '';

if(typeof window !== 'undefined'){

// validar campos vacíos
if(!this.name || !this.email || !this.password || !this.confirmPassword){
this.errorMessage = 'Completa todos los campos';
return;
}

/* VALIDAR GMAIL */
if(!this.email.endsWith('@gmail.com')){
this.errorMessage = 'Solo se permiten correos @gmail.com';
return;
}

// validar mínimo 8 caracteres
if(this.password.length < 8){
this.errorMessage = 'La contraseña debe tener mínimo 8 caracteres';
return;
}

// validar mayúscula y número
const regex = /^(?=.*[A-Z])(?=.*[0-9])/;

if(!regex.test(this.password)){
this.errorMessage = 'Debe tener al menos una mayúscula y un número';
return;
}

// validar confirmación
if(this.password !== this.confirmPassword){
this.errorMessage = 'Las contraseñas no coinciden';
return;
}

// obtener usuarios
const users = JSON.parse(localStorage.getItem('users') || '[]');

// 🔐 VALIDAR ADMIN ANTES
if(this.role === 'admin' && this.adminExists){
this.errorMessage = "Ya existe un administrador";
return;
}

// verificar existente
const exists = users.find((u:any) => u.email === this.email);

if(exists){
this.errorMessage = 'El usuario ya está registrado';
return;
}

// crear usuario
const newUser = {
id: Date.now(),
name: this.name,
email: this.email,
password: this.password,
role: this.role,
patients: [],
history: []
};

users.push(newUser);

localStorage.setItem('users', JSON.stringify(users));

document.querySelector('.register-box')?.classList.add('success-animation');

alert('Cuenta creada correctamente');

this.router.navigate(['/login']);

}

}

  togglePassword(){
    this.showPassword = !this.showPassword;
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

  toggleConfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }

checkPasswordsMatch(){
this.passwordsMatch = this.password === this.confirmPassword;
}


validateEmail(){

const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

this.emailInvalid = !regex.test(this.email);

}


ngOnInit(){

if(typeof window !== 'undefined'){

const users = JSON.parse(localStorage.getItem('users') || '[]');

this.adminExists = users.some((u:any)=> u.role === 'admin');

}

}

}