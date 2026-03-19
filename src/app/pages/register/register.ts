import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  register(){

    // 🔴 VALIDAR CAMPOS
    if(!this.name || !this.email || !this.password){
      alert('Completa todos los campos');
      return;
    }

    // 🧠 LIMPIAR DATOS
    const nameTrim = this.name.trim();
    const emailTrim = this.email.trim().toLowerCase();
    const passwordTrim = this.password.trim();

    // 📦 OBTENER USUARIOS
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // 🔍 VERIFICAR SI YA EXISTE
    const exists = users.find((u:any) => u.email === emailTrim);

    if(exists){
      alert('El usuario ya está registrado');
      return;
    }

    // 👤 CREAR USUARIO LIMPIO
    const newUser = {
      id: Date.now(),
      name: nameTrim,
      email: emailTrim,
      password: passwordTrim,
      patients: [],
      history: []
    };

    // 💾 GUARDAR
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // ✅ MENSAJE
    alert('Registro exitoso');

    // 🔄 LIMPIAR CAMPOS (opcional pero pro)
    this.name = '';
    this.email = '';
    this.password = '';

    // 🚀 REDIRIGIR
    this.router.navigate(['/login']);

  }

}