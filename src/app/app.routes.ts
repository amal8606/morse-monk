import { Routes } from '@angular/router';
import { PaymentComponent } from './_shared/components/payments/payments.component';
import { AnnouncementsComponent } from './module/announcements/announcements.component';
import { LoginComponent } from './module/login/login.component';
import { RegisterComponent } from './module/register/register.component';

export const routes: Routes = [
  { path: '', 
    loadChildren: ()=>import('./module/home/home.module').then(m => m.HomeModule) },
    {path:'morse-integrator',
      loadChildren:()=>import('./module/morse-integrator/morse-integrator.module').then(m=>m.MorseIntegratorModule)
    },
    {path:'booking',
      loadChildren:()=>import('./module/booking/booking-routing.module').then(m=>m.BookingRoutingModule)
    },
  // {path: 'about', component: AboutComponent },
  // {path: 'contact', component: ContactComponent },
   {path: 'announcement', component: AnnouncementsComponent },
   {path: 'login', component: LoginComponent },
   {path:'payment',component:PaymentComponent},
   {path:'register',component:RegisterComponent}

];
