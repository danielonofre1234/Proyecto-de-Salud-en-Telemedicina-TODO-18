import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

  login(){

    // VALIDAR CAMPOS VACIOS
    if(!this.email || !this.password){
      alert('Debes ingresar correo y contraseña');
      return;
    }

    const storedUser = localStorage.getItem('user');

    // VERIFICAR SI EXISTE USUARIO REGISTRADO
    if(!storedUser){
      alert('No existe una cuenta registrada');
      return;
    }

    const user = JSON.parse(storedUser);

    // VALIDAR DATOS
    if(this.email === user.email && this.password === user.password){

      // GUARDAR SESION ACTIVA
      localStorage.setItem('loggedUser', JSON.stringify(user));

      // ENTRAR AL DASHBOARD
      this.router.navigate(['/dashboard']);

    } else {

      alert('Correo o contraseña incorrectos');

    }

  }

}