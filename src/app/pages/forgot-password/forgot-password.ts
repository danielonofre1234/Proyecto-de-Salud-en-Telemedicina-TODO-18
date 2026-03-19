import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  email: string = '';
  newPassword: string = '';

  constructor(private router: Router) {}

  changePassword(){

    // VALIDAR CAMPOS VACÍOS
    if(!this.email || !this.newPassword){
      alert('Debes llenar todos los campos');
      return;
    }

    const storedUser = localStorage.getItem('user');

    // VERIFICAR SI EXISTE UNA CUENTA
    if(!storedUser){
      alert('No existe ninguna cuenta registrada');
      return;
    }

    const user = JSON.parse(storedUser);

    // VERIFICAR SI EL CORREO EXISTE
    if(this.email !== user.email){
      alert('El correo no está registrado');
      return;
    }

    // CAMBIAR CONTRASEÑA
    user.password = this.newPassword;

    localStorage.setItem('user', JSON.stringify(user));

    alert('Contraseña actualizada correctamente');

    this.router.navigate(['/login']);
  }

}