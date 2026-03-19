import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
selector:'app-dashboard',
standalone:true,
imports:[CommonModule],
templateUrl:'./dashboard.html',
styleUrl:'./dashboard.css'
})

export class DashboardComponent{

username:string="Usuario";
sessionsCount:number=0;
nextAppointment:any=null;

constructor(
private router:Router,
private auth:AuthService
){}
logout(){

this.auth.logout(); // limpia sesión
this.router.navigate(['/login']);

}

ngOnInit(){

const user = this.auth.getUser();

// 👤 Nombre del usuario
this.username = user ? user.name : 'Usuario';

if(typeof window !== 'undefined'){

// 📊 HISTORIAL (ahora por usuario)
this.sessionsCount = user?.history?.length || 0;

// 📅 CITAS (solo del usuario actual)
const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");

// filtrar solo citas del usuario logueado
const userAppointments = appointments.filter((a:any)=> a.userId === user?.id);

// buscar cita pendiente
const pending = userAppointments.find((a:any)=> a.status === "Pendiente");

if(pending){
this.nextAppointment = pending;
}

}

}

/* navegación */

goAppointments(){
this.router.navigate(['/appointments']);
}

goPatients(){
this.router.navigate(['/patients']);
}

goHistory(){
this.router.navigate(['/history']);
}

goDashboard(){
this.router.navigate(['/dashboard']);
}

}