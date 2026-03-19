import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients.html',
  styleUrl: './patients.css'
})
export class Patients {

  name:string = '';
  age:number = 0;
  phone:string = '';
  email:string = '';

  savedPatient:any = null;
  totalSessions:number = 0;

  editing:boolean = false;

  // 🔥 NUEVO (edición por campo)
  editField:string = '';

  constructor(private router:Router){}

  ngOnInit(){

    if(typeof window !== 'undefined'){

      const data = localStorage.getItem('patient');

      if(data){
        this.savedPatient = JSON.parse(data);

        this.name = this.savedPatient.name;
        this.age = this.savedPatient.age;
        this.phone = this.savedPatient.phone;
        this.email = this.savedPatient.email;
      }

      const history = JSON.parse(localStorage.getItem('sessions_history') || '[]');
      this.totalSessions = history.length;
    }

  }

  // 🔙 VOLVER
  goBack(){
    this.router.navigate(['/dashboard']);
  }

  // 💾 GUARDAR PACIENTE
  savePatient(){

    if(!this.name || !this.age || !this.phone || !this.email){
      alert('Completa todos los campos');
      return;
    }

    this.savedPatient = {
      name: this.name,
      age: this.age,
      phone: this.phone,
      email: this.email
    };

    localStorage.setItem('patient', JSON.stringify(this.savedPatient));
  }

  // ✏️ EDITAR CAMPO
  edit(field:string){
    this.editField = field;
  }

  // 💾 GUARDAR CAMPO INDIVIDUAL
  saveField(field:string){

    if(field === 'name'){
      this.savedPatient.name = this.name;
    }

    if(field === 'age'){
      this.savedPatient.age = this.age;
    }

    if(field === 'phone'){
      this.savedPatient.phone = this.phone;
    }

    if(field === 'email'){
      this.savedPatient.email = this.email;
    }

    localStorage.setItem('patient', JSON.stringify(this.savedPatient));

    this.editField = '';
  }

}