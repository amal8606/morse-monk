import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoBookingComponent } from './components/demo-booking/demo-booking.component';
import { EnrollClassComponent } from './components/enroll/enroll.component';

const routes: Routes = [
  {path:'demo-booking',
    component:DemoBookingComponent
  },
  {
    path:'enroll-class',
    component:EnrollClassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
