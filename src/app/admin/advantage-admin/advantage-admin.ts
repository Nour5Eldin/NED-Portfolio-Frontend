import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-advantage-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './advantage-admin.html',
  styleUrl: './advantage-admin.scss',
})
export class AdvantageAdmin implements OnInit {
  advantageData: any = { features: [] };
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  success = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.apiService.getWhyChooseUs().subscribe({
      next: (data: any) => {
        this.advantageData = data;
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

  addFeature(): void {
    this.advantageData.features.push({ title: '', description: '' });
  }

  removeFeature(index: number): void {
    this.advantageData.features.splice(index, 1);
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
        setTimeout(() => { this.success = false; }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }
}