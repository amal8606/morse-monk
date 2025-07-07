import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
    selector:'app=integrator',
    templateUrl:'./integrator.component.html',
    standalone:true,
    imports:[CommonModule, RouterModule],
})
export class IntegratorComponent{
    constructor(private route: Router) {}
    public amount: number = 2500;
    selectedPlan:number =6;
  public navigateTo(){
this.route.navigate(['/payment'], { queryParams: {amount:this.amount.toString()} });

  }
    public choosePlan(amount: number) {
     this.amount = amount;
    }
}