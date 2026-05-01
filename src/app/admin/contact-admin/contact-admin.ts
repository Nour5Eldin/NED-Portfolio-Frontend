import { Component, OnInit } from '@angular/core';
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
})
export class ContactAdmin implements OnInit {
  contactData: any = {};
  inquiries: any[] = [];
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  success = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.apiService.getContactInfo().subscribe({
      next: (data: any) => {
        this.contactData = data;
      },
      error: (err) => console.error(err)
    });

    this.apiService.getInquiries().subscribe({
      next: (data: any) => {
        this.inquiries = data;
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
      };
      reader.readAsDataURL(file);
    }
  }

  save(): void {
    this.loading = true;
    this.apiService.updateContactInfo(this.contactData).subscribe({
      next: (data: any) => {
        this.contactData = data;
        this.success = true;
        this.loading = false;
        setTimeout(() => { this.success = false; }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  deleteInquiry(id: string): void {
    if (confirm('Are you sure?')) {
      this.apiService.deleteInquiry(id).subscribe({
        next: () => {
          this.inquiries = this.inquiries.filter(i => i._id !== id);
        },
        error: (err) => console.error(err)
      });
    }
  }
}