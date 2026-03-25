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

const allSessions = JSON.parse(localStorage.getItem('sessions') || '[]');

if(this.role === 'psicologo'){
this.sessions = allSessions.filter((s:any)=> 
s.psychologist === this.username
);
}else{
this.sessions = allSessions.filter((s:any)=> 
s.patientName === this.username
);
}

if(typeof window !== 'undefined'){

const history=JSON.parse(localStorage.getItem("sessions_history") || "[]");
this.sessionsCount=history.length;

const appointments=JSON.parse(localStorage.getItem("appointments") || "[]");

const pending=appointments.find((a:any)=>a.status==="Pendiente");

if(pending){
this.nextAppointment=pending;
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