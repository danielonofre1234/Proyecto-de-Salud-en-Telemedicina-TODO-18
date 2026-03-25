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

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  errorMessage: string = '';

  constructor(private router: Router) {}

  register(){

    this.errorMessage = '';

    // validar campos vacíos
    if(!this.name || !this.email || !this.password || !this.confirmPassword){
      this.errorMessage = 'Completa todos los campos';
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

    alert('Registro exitoso');

    this.router.navigate(['/login']);
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}