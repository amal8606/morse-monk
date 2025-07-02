import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../../../_core/services/seo.service';
import { Router } from '@angular/router';
import { PaymentStatusComponent } from '../../../../_shared/components/confirm-payment/confirm.compoent';

@Component({
  selector: 'app-enroll-for-class',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './enroll.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatStepperModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    PaymentStatusComponent
  ],
})

export class EnrollClassComponent {
  selectedDialCode: string = '+91';
  selectedSignalDialCode: string = '+91';
  selectedDates: Date[] = [];
  selectedClassType: string = 'normal';
  dateSelectionControl = new FormControl('');

  countries = [
    { name: 'India', code: 'IN', dialCode: '+91' },
    { name: 'United States', code: 'US', dialCode: '+1' },
    { name: 'United Kingdom', code: 'UK', dialCode: '+44' }
  ];

  mmdCentres: string[] = [
    'Mumbai',
    'Chennai',
    'Kolkata',
    'Cochin',
    'Delhi'
  ];

  public bookingForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    countryCode: new FormControl('+91'),

    signalName: new FormControl('', Validators.required),
    signalEmail: new FormControl('', [Validators.required, Validators.email]),
    signalPhone: new FormControl('', Validators.required),
    signalCountryCode: new FormControl('+91'),
    mmdCentre: new FormControl(''),
    mmdExamDate: new FormControl('')
  });

  constructor(private readonly seoService: SeoService, private readonly route: Router) { }

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Morse Monk - Enroll for class',
      description: 'Morse Monk is a platform that helps you learn Morse Code in a fun and interactive way. Whether you are a beginner or an advanced learner, Morse Monk has got you covered.',
      keywords: 'Morse, Online, Interactive, Classes, Lesson, MMD signal exam, Ham radio exam, Morse visual signal, Reception, Tool for sending morse message'
    });
  }

  public addSelectedDate(event: any) {
    const date: Date = event.value;
    if (
      date &&
      this.selectedDates.length < 5 &&
      !this.selectedDates.some(d => d.toDateString() === date.toDateString())
    ) {
      this.selectedDates.push(date);
      this.dateSelectionControl.setValue('');
    }
  }

  public removeSelectedDate(index: number) {
    this.selectedDates.splice(index, 1);
  }

  public showDateSelectionError() {
    return this.selectedClassType === 'normal' && (this.selectedDates.length === 0 || this.selectedDates.length > 5);
  }

  // public isCurrentStepValid(): boolean {
  //   if (this.selectedClassType === 'normal') {
  //     return (
  //       !!this.bookingForm.get('firstName')?.valid &&
  //       !!this.bookingForm.get('email')?.valid &&
  //       !!this.bookingForm.get('phone')?.valid &&
  //       this.selectedDates.length > 0 &&
  //       this.selectedDates.length <= 5
  //     );
  //   } else {
  //     return (
  //       !!this.bookingForm.get('signalName')?.valid &&
  //       !!this.bookingForm.get('signalEmail')?.valid &&
  //       !!this.bookingForm.get('signalPhone')?.valid &&
  //       !!this.bookingForm.get('mmdCentre')?.valid &&
  //       !!this.bookingForm.get('mmdExamDate')?.valid
  //     );
  //   }
  // }

  public onSubmit() {
    // if (this.isCurrentStepValid()) {
      this.route.navigate(['/payment']);
    // }
  }
}
