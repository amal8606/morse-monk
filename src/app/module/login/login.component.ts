import { Component } from '@angular/core';
import { SeoService } from '../../_core/services/seo.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private readonly seoService:SeoService) { }
  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Morse Monk - Login',
      description: 'Morse Monk is a platform that helps you learn Morse Code in a fun and interactive way. Whether you are a beginner or an advanced learner, Morse Monk has got you covered.',
      keywords: 'Morse, Online, Interactive, Classes, Lesson, MMD signal exam, Ham radio exam, Morse visual signal, Reception, Tool for sending morse message'
    });
  }

}
