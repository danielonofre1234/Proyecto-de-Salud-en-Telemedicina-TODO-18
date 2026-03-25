import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
selector:'app-psychologist',
standalone:true,
imports:[CommonModule, FormsModule],
templateUrl:'./psychologist.html',
styleUrl:'./psychologist.css'
})

export class Psychologist {

sessions:any[]=[];
appointments:any[]=[];

patientName:string="";
date:string="";
time:string="";
topic:string="";

ngOnInit(){
this.loadData();
}

/* 🔹 CARGAR DATOS */
loadData(){

if(typeof window !== 'undefined'){

const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

/* VALIDAR ROL */
if(loggedUser.role !== 'psicologo'){
window.location.href = '/dashboard';
return;
}

const allSessions = JSON.parse(localStorage.getItem('sessions') || '[]');
const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');

this.sessions = allSessions.filter((s:any)=>
s.psychologist === loggedUser.name
);

this.appointments = allAppointments.filter((a:any)=>
a.psychologist === loggedUser.name
);

}

}

createSession(){

if(typeof window !== 'undefined'){

if(!this.patientName || !this.date || !this.time){
alert('Completa los campos');
return;
}

const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

const newAppointment = {
id: Date.now(),
patientName: this.patientName,
psychologist: loggedUser.name,
date: this.date,
time: this.time,
topic: this.topic,
notes: "",
status: "Confirmada",
link: "https://meet.google.com/new?hs=122"
};

appointments.push(newAppointment);

localStorage.setItem('appointments', JSON.stringify(appointments));

alert('Sesión creada');

this.patientName="";
this.date="";
this.time="";
this.topic="";

this.loadData(); // 🔹 actualizar

}

}

joinSession(session:any){

if(!session.link){
session.link = "https://meet.google.com/new?hs=122";
}

window.open(session.link,'_blank');

}

/* CERRAR SESION */
logout(){

localStorage.removeItem('loggedUser');
window.location.href = '/login';

}

/* FINALIZAR SESION Y GUARDAR HISTORIAL */
finishSession(session:any){

const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');

session.notes = prompt("Agregar anotaciones de la sesión") || "";

sessions.push(session);

localStorage.setItem('sessions', JSON.stringify(sessions));

/* eliminar de citas activas */
this.appointments = this.appointments.filter(a => a.id !== session.id);

localStorage.setItem('appointments', JSON.stringify(this.appointments));

this.loadData(); // 🔹 actualizar historial

}

}