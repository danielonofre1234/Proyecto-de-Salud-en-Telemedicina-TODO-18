import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  userName: string = '';

  constructor(private router: Router) {}

  ngOnInit(){

    const user = localStorage.getItem('loggedUser');

    if(user){
      const data = JSON.parse(user);
      this.userName = data.name;
    }

  }

  logout(){

    // eliminar sesión
    localStorage.removeItem('loggedUser');

    // regresar al login
    this.router.navigate(['/login']);

  }

}