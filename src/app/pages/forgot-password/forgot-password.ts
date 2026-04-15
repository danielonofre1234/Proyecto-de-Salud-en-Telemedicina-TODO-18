import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  step = 1;

  recoveryEmail = '';
  recoveryCode = '';
  generatedCode = '';
  newPassword = '';

  constructor(private router: Router) {}

  ngOnInit(){
    emailjs.init('TU_PUBLIC_KEY');
  }

  /* ENVIAR CODIGO */
  sendRecoveryCode(){

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((u:any)=> u.email === this.recoveryEmail);

    if(!user){
      alert('El correo no está registrado');
      return;
    }

    this.generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

    emailjs.send(
      'SERVICE_ID',
      'TEMPLATE_ID',
      {
        code: this.generatedCode,
        to_email: this.recoveryEmail
      }
    );

    alert('Código enviado al correo');
    this.step = 2;
  }

  /* VERIFICAR CODIGO */
  verifyCode(){

    if(this.recoveryCode !== this.generatedCode){
      alert('Código incorrecto');
      return;
    }

    this.step = 3;
  }

  /* CAMBIAR CONTRASEÑA */
  changePassword(){

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const index = users.findIndex((u:any)=> u.email === this.recoveryEmail);

    if(index !== -1){
      users[index].password = this.newPassword;
    }

    localStorage.setItem('users', JSON.stringify(users));

    alert('Contraseña actualizada correctamente');
    this.router.navigate(['/login']);
  }

}