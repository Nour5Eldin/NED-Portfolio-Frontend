import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-hero-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './hero-admin.html',
  styleUrl: './hero-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroAdmin implements OnInit {
  heroData: any = {};
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  success = false;
  SECTION_NAME: string='';

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const url = this.route?.snapshot?.url;
    const path = url?.length ? url[url.length - 1]?.path || '' : '';
    this.SECTION_NAME = path.charAt(0).toUpperCase() + path.slice(1);

    this.apiService.getHero(true).subscribe({
      next: (data: any) => {
        this.heroData = data;
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
      this.apiService.setAsDraft(this.SECTION_NAME);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  save(status: string = 'published'): void {
    this.loading = true;
    const formData = new FormData();
    formData.append('subheading', this.heroData.subheading || '');
    formData.append('title', this.heroData.title || '');
    formData.append('description', this.heroData.description || '');
    formData.append('status', status);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.apiService.updateHero(this.heroData._id, formData).subscribe({
      next: (data: any) => {
        this.heroData = data;
        this.success = true;
        this.loading = false;
        if (status === 'published') {
          this.apiService.setAsPublished(this.SECTION_NAME, data);
        } else {
          this.apiService.setAsDraft(this.SECTION_NAME);
        }
        this.cdr.markForCheck();
        setTimeout(() => { this.success = false; this.cdr.markForCheck(); }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; this.cdr.markForCheck(); }
    });
  }
}