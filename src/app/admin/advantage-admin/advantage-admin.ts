import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-advantage-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './advantage-admin.html',
  styleUrl: './advantage-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvantageAdmin implements OnInit {
  advantageData: any = { features: [] };
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  success = false;
  SECTION_NAME: string= '';
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const url = this.route?.snapshot?.url;
    const path = url?.length ? url[url.length - 1]?.path || '' : '';
    this.SECTION_NAME = path.charAt(0).toUpperCase() + path.slice(1);
    this.apiService.getWhyChooseUs().subscribe({
      next: (data: any) => {
        this.advantageData = data;
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

  addFeature(): void {
    this.advantageData.features.push({ title: '', description: '' });
    this.cdr.markForCheck();
  }

  removeFeature(index: number): void {
    this.advantageData.features.splice(index, 1);
    this.cdr.markForCheck();
  }

  save(): void {
    this.loading = true;
    const formData = new FormData();
    formData.append('mainTitle', this.advantageData.mainTitle || '');
    formData.append('features', JSON.stringify(this.advantageData.features));
    if (this.selectedFile) {
      formData.append('mainImage', this.selectedFile);
    }

    this.apiService.updateWhyChooseUs(this.advantageData._id, formData).subscribe({
      next: (data: any) => {
        this.advantageData = data;
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