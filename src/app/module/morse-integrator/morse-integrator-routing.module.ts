import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorComponent } from './pages/integrator.component';
import { IntegratorMessangerComponent } from './components/integrator-messanger';

const routes: Routes = [{
  path:'',
  component:IntegratorComponent,
  
},
{
  path:"chat",
  component:IntegratorMessangerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorseIntegratorRoutingModule { }
