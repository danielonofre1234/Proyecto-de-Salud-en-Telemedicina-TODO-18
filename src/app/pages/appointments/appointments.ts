import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar';
import { Router } from '@angular/router';

@Component({
selector: 'app-appointments',
standalone: true,
imports: [FormsModule, CommonModule, NavbarComponent],
templateUrl: './appointments.html',
styleUrl: './appointments.css'
})

export class Appointments {

date:string='';
timeSlots:string[] = [
"09:00","10:00","11:00","12:00",
"13:00","14:00","15:00","16:00",
"17:00","18:00"
];

time:string = "";

/* NUEVO */
psychologists:any[] = [];
selectedPsychologist:string = "";
patientName:string='';
psychologist:string='';
topic:string='';
today:string = new Date().toISOString().split('T')[0];
appointments:any[]=[];

constructor(
@Inject(PLATFORM_ID) private platformId:Object,
private location:Location,
private router:Router
){}

ngOnInit(){

if(isPlatformBrowser(this.platformId)){

const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

const data = localStorage.getItem("appointments");

if(data){

const allAppointments = JSON.parse(data);

if(loggedUser.role === 'psicologo'){

this.appointments = allAppointments.filter((a:any)=>
a.psychologist === loggedUser.name
);

}else{

this.appointments = allAppointments.filter((a:any)=>
a.clientId === loggedUser.id
);

}

}

const users = JSON.parse(localStorage.getItem('users') || '[]');

this.psychologists = users.filter((u:any)=>
u.role === 'psicologo'
);

this.updateStatuses();

}

}

createAppointment(){

if(!this.date || !this.time){
alert("Selecciona fecha y hora");
return;
}

const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

const appointment = {
date:this.date,
time:this.time,
patientName:loggedUser.name,
clientId: loggedUser.id,
psychologist:this.selectedPsychologist,
topic:this.topic,
status:"Solicitada",
entered:false,
notes:"",
link:""
};

/* obtener TODAS las citas */
const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');

/* agregar nueva */
allAppointments.push(appointment);

/* guardar TODAS */
localStorage.setItem("appointments",JSON.stringify(allAppointments));

/* actualizar vista */
this.appointments.push(appointment);

this.date='';
this.time='';
this.patientName='';
this.topic='';
}

selectTime(t:string){

if(!this.date){
return;
}

/* bloquear sabado y domingo */
const day = new Date(this.date + 'T00:00:00').getDay();
if(day === 0 || day === 6){
return;
}

if(!this.isTimeBlocked(t)){
this.time = t;
}

}

enterSession(i:number){

const appointment = this.appointments[i];

const now = new Date();
const appointmentTime = new Date(appointment.date + "T" + appointment.time);
const allowTime = new Date(appointmentTime.getTime() - 10 * 60000);

if(now < allowTime){
alert("Solo puedes entrar 10 minutos antes de la sesión");
return;
}

if(now > appointmentTime){
alert("La sesión ya terminó");
appointment.status="Sin respuesta";
localStorage.setItem("appointments",JSON.stringify(this.appointments));
return;
}

appointment.entered=true;
appointment.status="En sesión";

localStorage.setItem("appointments",JSON.stringify(this.appointments));

/* ABRIR GOOGLE MEET */
window.open(appointment.link,'_blank');

}

updateStatuses(){

const now = new Date();

const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");

allAppointments.forEach((a:any) => {

const appointmentTime = new Date(a.date + "T" + a.time);

if(now > appointmentTime && !a.entered){
a.status = "Sin respuesta";
}

});

localStorage.setItem("appointments", JSON.stringify(allAppointments));

}

goBack(){
this.location.back();
}

getUnavailableDates(){

const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

return appointments
.filter((a:any)=> a.psychologist === this.selectedPsychologist)
.map((a:any)=> a.date);

}

isToday(dateStr:string){

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth()+1).padStart(2,'0');
const dd = String(today.getDate()).padStart(2,'0');

return dateStr === `${yyyy}-${mm}-${dd}`;

}

isTimeBlocked(t:string){

if(!this.date || !this.selectedPsychologist){
return false;
}

/* SABADO Y DOMINGO */
const day = new Date(this.date + 'T00:00:00').getDay();
if(day === 0 || day === 6){
return true;
}

/* HORAS PASADAS SOLO HOY */
if(this.isToday(this.date)){

const now = new Date();
const [h,m] = t.split(':').map(Number);

const slot = new Date();
slot.setHours(h,m,0,0);

if(slot <= now){
return true;
}

}

/* OCUPADO POR PSICOLOGO */
const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

return appointments.some((a:any)=>
a.date === this.date &&
a.psychologist === this.selectedPsychologist &&
a.time === t
);

}

isDayFull(){

if(!this.date){
return false;
}

/* bloquear fines de semana */
const day = new Date(this.date + 'T00:00:00').getDay();
if(day === 0 || day === 6){
return true;
}

/* si todas las horas están bloqueadas */
return this.timeSlots.every(t => this.isTimeBlocked(t));

}

}