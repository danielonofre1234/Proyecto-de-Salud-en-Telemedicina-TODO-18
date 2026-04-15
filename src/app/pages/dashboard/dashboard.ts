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

history:any[] = [];
username:string="Usuario";
role:string="cliente";
sessions:any[]=[];

sessionsCount:number=0;
nextAppointment:any=null;

constructor(
private router:Router,
private auth:AuthService
){}

logout(){
this.auth.logout();
this.router.navigate(['/login']);
}

ngOnInit(){

const user = this.auth.getUser();

if(user){
this.username = user.name;
this.role = user.role;
}

/* SOLO EN NAVEGADOR */
if(typeof window !== 'undefined'){

const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

if(this.role === 'psicologo'){

const allSessions = JSON.parse(localStorage.getItem('sessions') || '[]');

this.sessions = allSessions.filter((s:any)=>
s.psychologist?.trim() === this.username?.trim()
);

}else{

const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

this.sessions = appointments.filter((a:any)=>
a.clientId === loggedUser.id
);

}

/* CONTADOR */
this.sessionsCount = this.sessions.length;

/* ORDENAR */
this.sessions = [...this.sessions].reverse();

/* PROXIMA CITA */
const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");

const pending = appointments.find((a:any)=>
a.clientId === loggedUser.id && a.status === "Pendiente"
);

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