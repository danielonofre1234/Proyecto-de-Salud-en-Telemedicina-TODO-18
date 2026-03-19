import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { Appointments } from './pages/appointments/appointments';
import { Patients } from './pages/patients/patients';
import { History } from './pages/history/history';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { VideoSessionComponent } from './pages/video-session/video-session';

export const routes: Routes = [

  { path: '', component: Login },

  { path: 'login', component: Login },

  { path: 'register', component: Register },

  { path: 'forgot-password', component: ForgotPassword },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'appointments', component: Appointments },

  { path: 'patients', component: Patients },

  { path: 'history', component: History },

  { path: 'video-session', component: VideoSessionComponent },

  { path: '**', redirectTo: '' }

];