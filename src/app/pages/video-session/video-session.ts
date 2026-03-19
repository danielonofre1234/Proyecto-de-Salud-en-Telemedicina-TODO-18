import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
selector:'app-video-session',
standalone:true,
imports:[CommonModule],
templateUrl:'./video-session.html',
styleUrl:'./video-session.css'
})

export class VideoSessionComponent{

@ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

minutes:number=50;
seconds:number=0;

startTime:number=0;

timer:any;
stream:any;

constructor(private router:Router, private location:Location){}

ngOnInit(){

this.startTime = Date.now();

this.startCamera();

this.startTimer();

}

async startCamera(){

try{

this.stream = await navigator.mediaDevices.getUserMedia({

video:true,

audio:{
echoCancellation:true,
noiseSuppression:true,
autoGainControl:true,
sampleRate:48000
}

});

this.videoElement.nativeElement.srcObject = this.stream;

}catch(error){

alert("No se pudo acceder a cámara o micrófono");

}

}

startTimer(){

this.timer=setInterval(()=>{

if(this.seconds===0){

if(this.minutes===0){

this.finishSession();
return;

}

this.minutes--;
this.seconds=59;

}else{

this.seconds--;

}

},1000);

}

finishSession(){

clearInterval(this.timer);

/* detener cámara y micrófono */
if(this.stream){
this.stream.getTracks().forEach((track:any)=>track.stop());
}

/* calcular duración real */
const endTime = Date.now();

const durationMinutes = Math.floor((endTime - this.startTime)/60000);

/* guardar historial */
const historySessions = JSON.parse(localStorage.getItem("sessions_history") || "[]");

historySessions.push({

date:new Date().toLocaleDateString(),
duration:durationMinutes

});

localStorage.setItem("sessions_history",JSON.stringify(historySessions));

/* regresar al dashboard */
this.router.navigate(['/dashboard']);

}

}