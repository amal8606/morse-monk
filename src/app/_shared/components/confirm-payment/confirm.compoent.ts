import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  standalone: true,
  templateUrl: './confirm.component.html',
  imports:[RouterModule]
})
export class PaymentStatusComponent implements OnInit {
  status: 'pending' | 'confirmed' | 'failed' = 'pending'; // dynamically set this if needed

  ngOnInit(): void {
    // Optional: Load status from route params or API if required
  }
}
