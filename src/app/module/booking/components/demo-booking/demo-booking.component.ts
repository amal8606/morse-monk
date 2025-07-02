import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { SeoService } from "../../../../_core/services/seo.service";
import { RouterModule } from "@angular/router";

@Component({
    selector:'app-demo-booking',
    templateUrl:'./demo-booking.component.html',
    standalone:true,
    imports:[CommonModule,RouterModule]
})
export class DemoBookingComponent{
     countries = [
    { name: 'India', code: 'IN', dialCode: '+91' },
    { name: 'United States', code: 'US', dialCode: '+1' },
    { name: 'United Kingdom', code: 'UK', dialCode: '+44' }
  ];
  public confirm:boolean=false;
  constructor(private readonly seoService:SeoService) { }
  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Morse Monk - Demo Booking',
      description: 'Morse Monk is a platform that helps you learn Morse Code in a fun and interactive way. Whether you are a beginner or an advanced learner, Morse Monk has got you covered.',
      keywords: 'Morse, Online, Interactive, Classes, Lesson, MMD signal exam, Ham radio exam, Morse visual signal, Reception, Tool for sending morse message'})
  }
}