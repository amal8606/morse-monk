import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PaymentStatusComponent } from '../confirm-payment/confirm.compoent';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payments.component.html',
  standalone:true,
  imports: [CommonModule,PaymentStatusComponent],
})
export class PaymentComponent {
  screenshotFile: File | null = null;
  uploadedFileName: string = '';
  isPaymentDone:boolean=false;
public paymentAmount: number = 0; 
constructor(private readonly route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const amount = params['amount'];
      if (amount) {
        this.paymentAmount = +amount; // Convert to number
      }
    });
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.screenshotFile = file;
      this.uploadedFileName = file.name;
    }
  }

  submitPaymentProof(): void {
    if (!this.screenshotFile) {
      alert('Please upload a screenshot.');
      return;
    }
this.isPaymentDone=true;
    // TODO: Implement backend submission logic here
    // alert('Screenshot uploaded. Our team will review your payment.');
  }
}
