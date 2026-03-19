import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector:'app-sidebar',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./sidebar.html',
  styleUrl:'./sidebar.css'
})
export class SidebarComponent{

userName:string = '';

isCollapsed:boolean = false;

constructor(
  private router:Router,
  private auth:AuthService
){}

ngOnInit(){
this.userName = this.auth.getUser() || 'Usuario';
}

toggleSidebar(){
this.isCollapsed = !this.isCollapsed;
}

goDashboard(){
this.router.navigate(['/dashboard']);
}

goAppointments(){
this.router.navigate(['/appointments']);
}

goPatients(){
this.router.navigate(['/patients']);
}

goHistory(){
this.router.navigate(['/history']);
}

logout(){
this.auth.logout();
this.router.navigate(['/login']);
}

}