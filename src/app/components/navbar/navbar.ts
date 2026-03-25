import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
selector: 'app-navbar',
standalone: true,
imports: [CommonModule],
templateUrl: './navbar.html',
styleUrl: './navbar.css'
})
export class NavbarComponent {

username:string = '';
role:string = '';

constructor(
private router:Router,
@Inject(PLATFORM_ID) private platformId:Object
){}

ngOnInit(){

if(isPlatformBrowser(this.platformId)){

const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');

this.username = user.name || '';
this.role = user.role || '';

}

}

logout(){

if(isPlatformBrowser(this.platformId)){
localStorage.removeItem('loggedUser');
}

this.router.navigate(['/login']);

}

}