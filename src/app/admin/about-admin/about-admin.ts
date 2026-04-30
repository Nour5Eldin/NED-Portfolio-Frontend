import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-about-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './about-admin.html',
  styleUrl: './about-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutAdmin implements OnInit {
  aboutData: any = { items: { ourVision: {}, ourMission: {} } };
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  success = false;
  SECTION_NAME: string = '';
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const url = this.route?.snapshot?.url;
    const path = url?.length ? url[url.length - 1]?.path || '' : '';
    this.SECTION_NAME = path.charAt(0).toUpperCase() + path.slice(1);
    this.apiService.getAbout().subscribe({
      next: (data: any) => {
        this.aboutData = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }
  onInputChange(): void {
    this.apiService.setAsDraft(this.SECTION_NAME);
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.onInputChange();
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
    formData.append('experienceYears', this.aboutData.experienceYears || '');
    formData.append('items', JSON.stringify(this.aboutData.items));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.apiService.updateAbout(this.aboutData._id, formData).subscribe({
      next: (data: any) => {
        this.aboutData = data;
        this.success = true;
        this.loading = false;
        this.apiService.setAsPublished(this.SECTION_NAME, data);
        this.cdr.markForCheck();
        setTimeout(() => { this.success = false; this.cdr.markForCheck(); }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; this.cdr.markForCheck(); }
    });
  }
}