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
time:string='';

appointments:any[]=[];

constructor(
@Inject(PLATFORM_ID) private platformId:Object,
private location:Location,
private router:Router
){}

ngOnInit(){

if(isPlatformBrowser(this.platformId)){

const data = localStorage.getItem("appointments");

if(data){
this.appointments = JSON.parse(data);
}

this.updateStatuses();

}

}

createAppointment(){

if(!this.date || !this.time){
alert("Selecciona fecha y hora");
return;
}

const appointment = {
date:this.date,
time:this.time,
status:"Pendiente",
entered:false
};

this.appointments.push(appointment);

localStorage.setItem("appointments",JSON.stringify(this.appointments));

this.date='';
this.time='';

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

localStorage.setItem("current_session", JSON.stringify(appointment));

this.router.navigate(['/video-session']);

}

updateStatuses(){

const now = new Date();

this.appointments.forEach(a => {

const appointmentTime = new Date(a.date + "T" + a.time);

if(now > appointmentTime && !a.entered){
a.status="Sin respuesta";
}

});

localStorage.setItem("appointments",JSON.stringify(this.appointments));

}

goBack(){
this.location.back();
}

}