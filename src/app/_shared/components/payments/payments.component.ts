import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaymentStatusComponent } from '../confirm-payment/confirm.compoent';

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
