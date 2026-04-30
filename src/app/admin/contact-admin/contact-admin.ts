import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-contact-admin',
  standalone: true,
  imports: [FormsModule, RouterLink, SlicePipe, DatePipe],
  templateUrl: './contact-admin.html',
  styleUrl: './contact-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactAdmin implements OnInit {
  contactData: any = {};
  inquiries: any[] = [];
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  success = false;
  SECTION_NAME: string='';
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const url = this.route?.snapshot?.url;
    const path = url?.length ? url[url.length - 1]?.path || '' : '';
    this.SECTION_NAME = path.charAt(0).toUpperCase() + path.slice(1);
    this.apiService.getContactInfo().subscribe({
      next: (data: any) => {
        this.contactData = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });

    this.apiService.getInquiries().subscribe({
      next: (data: any) => {
        this.inquiries = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  save(): void {
    this.loading = true;
    const formData = new FormData();
    formData.append('phoneNumber', this.contactData.phoneNumber || '');
    formData.append('email', this.contactData.email || '');
    formData.append('address', this.contactData.address || '');
    if (this.selectedFile) {
      formData.append('mapImage', this.selectedFile);
    }

    this.apiService.updateContactInfo(this.contactData).subscribe({
      next: (data: any) => {
        this.contactData = data;
        this.success = true;
        this.loading = false;
        this.apiService.setAsPublished(this.SECTION_NAME, {});
        this.cdr.markForCheck();
        setTimeout(() => { this.success = false; this.cdr.markForCheck(); }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; this.cdr.markForCheck(); }
    });
  }

  deleteInquiry(id: string): void {
    if (confirm('Are you sure?')) {
      this.apiService.deleteInquiry(id).subscribe({
        next: () => {
          this.inquiries = this.inquiries.filter(i => i._id !== id);
          this.cdr.markForCheck();
        },
        error: (err) => console.error(err)
      });
    }
  }
}
