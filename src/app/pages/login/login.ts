import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';
  showPassword:boolean = false;

  constructor(private router: Router, private auth:AuthService) {}

  togglePassword(){
  this.showPassword = !this.showPassword;
  } 

 login(){

// limpiar espacios
const emailTrim = this.email?.trim();
const passwordTrim = this.password?.trim();

// validar campos
if(!emailTrim || !passwordTrim){
  alert('Debes ingresar correo y contraseña');
  return;
}

// obtener usuarios
const users = JSON.parse(localStorage.getItem('users') || '[]');

// buscar usuario
const userFound = users.find((u:any) => 
  u.email === emailTrim && u.password === passwordTrim
);

if(!userFound){
  alert('Correo o contraseña incorrectos');
  return;
}

// ✅ guardar sesión correctamente
this.auth.login(userFound);

// redirigir
this.router.navigate(['/dashboard']);

}

}