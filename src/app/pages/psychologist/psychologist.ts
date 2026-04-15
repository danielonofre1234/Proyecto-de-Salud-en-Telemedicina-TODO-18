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
patientType:string = "existente";
patientsList:string[] = [];
selectedPatient:any = null;
selectedSessions:any[] = [];
timeSlots:string[] = [
"09:00","10:00","11:00","12:00",
"13:00","14:00","15:00","16:00",
"17:00","18:00"
];

time:string="";

sessions:any[]=[];
appointments:any[]=[];
patientFiles:any[] = [];
patientName:string="";
date:string="";
topic:string="";
clients:any[] = [];
selectedClient:any = null;
sessionNotes:string = '';

ngOnInit(){

if(typeof window === 'undefined') return;

this.loadData();

const users = JSON.parse(localStorage.getItem('users') || '[]');

this.clients = users.filter((u:any)=> u.role === 'cliente');

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
a.psychologist?.trim() === loggedUser.name?.trim()
);

/* 👇 AGRUPAR POR PACIENTE */
const grouped:any = {};

this.sessions.forEach((s:any)=>{
if(!grouped[s.patientName]){
grouped[s.patientName] = [];
}
grouped[s.patientName].push(s);
});

this.patientFiles = Object.keys(grouped).map(name => ({
patientName: name,
sessions: grouped[name]
}));

this.selectedPatient = null;
this.selectedSessions = [];

/* lista unica de pacientes */
this.patientsList = [...new Set(this.sessions.map((s:any)=>s.patientName))];
}

}

createSession(){

if(typeof window !== 'undefined'){

if(!this.selectedClient || !this.date || !this.time){
alert('Completa los campos');
return;
}

const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

const newAppointment = {
id: Date.now(),
patientName: this.selectedClient ? this.selectedClient.name : this.patientName.trim(),
clientId: this.selectedClient ? this.selectedClient.id : null,
psychologist: loggedUser.name,
date: this.date,
time: this.time,
topic: this.topic,
notes: "",
status: "Pendiente",
link: "https://meet.google.com/new?hs=122"
};

appointments.push(newAppointment);

localStorage.setItem('appointments', JSON.stringify(appointments));

alert('Sesión creada');

this.selectedClient = null;
this.date="";
this.time="";
this.topic="";

this.loadData();

}

}

selectTime(t:string){
if(!this.isTimeBlocked(t)){
this.time = t;
}
}

isTimeBlocked(t:string){

if(!this.date){
return false;
}

/* bloquear fines de semana */
const day = new Date(this.date + 'T00:00:00').getDay();
if(day === 0 || day === 6){
return true;
}

/* bloquear horas pasadas SOLO hoy */
if(this.isToday(this.date)){

const now = new Date();
const [h,m] = t.split(':').map(Number);

const slot = new Date();
slot.setHours(h,m,0,0);

if(slot <= now){
return true;
}

}

/* bloquear si ya existe cita */
const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

return appointments.some((a:any)=>
a.date === this.date &&
a.psychologist === loggedUser.name &&
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

/* solo evaluar si es hoy */
if(this.isToday(this.date)){
return this.timeSlots.every(t => this.isTimeBlocked(t));
}

return false;

}

getMinDate(){
const today = new Date();
return today.toISOString().split('T')[0];
}

isToday(dateStr:string){

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth()+1).padStart(2,'0');
const dd = String(today.getDate()).padStart(2,'0');

const todayStr = `${yyyy}-${mm}-${dd}`;

return dateStr === todayStr;

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

if(typeof window !== 'undefined'){

const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');

/* notas */
session.notes = prompt("Agregar anotaciones de la sesión") || "";

/* evaluación del progreso */
const progress = prompt(
"Evaluar desempeño del paciente:\n\n" +
"1 = Muy bajo\n" +
"2 = Bajo\n" +
"3 = Regular\n" +
"4 = Bueno\n" +
"5 = Excelente"
);

session.mood = progress ? Number(progress) : 3;

/* marcar como finalizada */
session.status = "Finalizada";

/* guardar en sesiones (evitar duplicados) */
const exists = sessions.find((s:any)=> s.id === session.id);

if(!exists){
sessions.push(session);
}

localStorage.setItem('sessions', JSON.stringify(sessions));

/* 🔥 GUARDAR EN HISTORIAL DEL CLIENTE */
const users = JSON.parse(localStorage.getItem('users') || '[]');

const userIndex = users.findIndex((u:any)=> 
u.name === session.patientName
);

if(userIndex !== -1){

if(!users[userIndex].history){
users[userIndex].history = [];
}

const existsHistory = users[userIndex].history.find((s:any)=> s.id === session.id);

if(!existsHistory){
users[userIndex].history.push(session);
}

}

localStorage.setItem('users', JSON.stringify(users));

/* 🔥 ACTUALIZAR loggedUser SI ES EL PACIENTE */
const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

if(loggedUser.name === session.patientName){

if(!loggedUser.history){
loggedUser.history = [];
}


const existsLogged = loggedUser.history.find((s:any)=> s.id === session.id);

if(!existsLogged){
loggedUser.history.push(session);
}

localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

}

/* actualizar estado sin borrar */
const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

const index = appointments.findIndex((a:any)=> a.id === session.id);

if(index !== -1){
appointments[index].status = "Finalizada";
}

localStorage.setItem('appointments', JSON.stringify(appointments));

this.loadData();

}
}

/* 👤 BORRAR PACIENTE */
deletePatient(file:any){

if(!confirm("¿Eliminar expediente completo del paciente?")){
return;
}

const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');

const filtered = sessions.filter((s:any)=>
s.patientName !== file.patientName
);

localStorage.setItem('sessions', JSON.stringify(filtered));

this.loadData();

}

/* 🧠 BORRAR SESION */
deleteSession(session:any){

if(!confirm("¿Eliminar esta sesión?")){
return;
}

const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');

const filtered = sessions.filter((s:any)=> s.id !== session.id);

localStorage.setItem('sessions', JSON.stringify(filtered));

this.loadData();

}

/* ✏️ EDITAR NOTAS */
editNotes(session:any){

const newNotes = prompt("Editar anotaciones", session.notes || "");

if(newNotes === null){
return;
}

session.notes = newNotes;

const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');

const index = sessions.findIndex((s:any)=> s.id === session.id);

if(index !== -1){
sessions[index] = session;
}

localStorage.setItem('sessions', JSON.stringify(sessions));

this.loadData();

}

/* 📄 EXPORTAR EXPEDIENTE */
exportPatient(file:any){

let text = "EXPEDIENTE DEL PACIENTE\n";
text += "Paciente: " + file.patientName + "\n\n";

file.sessions.forEach((s:any)=>{

text += "Fecha: " + s.date + "\n";
text += "Hora: " + s.time + "\n";
text += "Tema: " + s.topic + "\n";
text += "Notas: " + (s.notes || "Sin notas") + "\n";
text += "-------------------------\n";

});

const blob = new Blob([text], {type: 'text/plain'});
const url = window.URL.createObjectURL(blob);

const a = document.createElement('a');
a.href = url;
a.download = "Expediente_" + file.patientName + ".txt";
a.click();

}
selectPatient(file:any){

this.selectedPatient = file;
this.selectedSessions = file.sessions;

}

getMoodColor(value:number){

if(value <= 2) return '#ff4d4d';   // rojo
if(value == 3) return '#ffc107';   // amarillo
return '#28a745';                  // verde

}

getProgress(){

if(!this.selectedSessions) return [];

return this.selectedSessions.map((s:any, index:number)=>({
name: "S" + (index+1),
value: (s.mood || 3) * 20,
color: this.getMoodColor(s.mood || 3)
}));

}

getSuggestion(){

if(!this.selectedSessions || this.selectedSessions.length === 0){
return "Sin datos suficientes";
}

const last = this.selectedSessions[this.selectedSessions.length -1];

if(last.mood <= 3){
return "Paciente con estado emocional bajo. Se recomienda intervención inmediata.";
}

if(last.mood <= 6){
return "Paciente estable pero requiere seguimiento.";
}

return "Paciente con evolución positiva.";
}
}