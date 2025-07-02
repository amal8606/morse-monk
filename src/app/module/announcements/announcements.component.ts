import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './announcements.component.html',
})
export class AnnouncementsComponent {

}
