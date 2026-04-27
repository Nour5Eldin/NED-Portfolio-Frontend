import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact implements OnInit {
  contactInfo: any;
  formData = { fullName: '', email: '', details: '' };
  submitted = false;

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.apiService.getContactInfo().subscribe({
        next: (data: any) => {
          this.contactInfo = data;
          this.cdr.markForCheck();
        },
        error: (err) => console.error(err)
      });
    }
  }

  sendInquiry(): void {
  console.log('Sending:', this.formData);
  this.apiService.sendInquiry(this.formData).subscribe({
      next: () => {
        this.submitted = true;
        this.formData = { fullName: '', email: '', details: '' };
        this.cdr.markForCheck();

        setTimeout(() => {
          this.submitted = false;
          this.cdr.markForCheck();
        }, 3000);
      },
      error: (err) => console.error(err)
    });
  }
}