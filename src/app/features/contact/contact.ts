import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact implements OnInit {
  contactInfo: any;
  formData = { fullName: '', email: '', details: '' };
  submitted = false;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.apiService.getContactInfo().subscribe({
      next: (data: any) => {
        this.contactInfo = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  sendInquiry(): void {
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