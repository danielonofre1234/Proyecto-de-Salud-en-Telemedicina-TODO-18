import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History {

  sessions:any[] = [];

  constructor(private router:Router){}

  ngOnInit(){

    if(typeof window !== 'undefined'){
      this.sessions = JSON.parse(localStorage.getItem('sessions_history') || '[]');
    }

  }

  goBack(){
    this.router.navigate(['/dashboard']);
  }

}