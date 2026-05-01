import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-about-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './about-admin.html',
  styleUrl: './about-admin.scss',
})
export class AboutAdmin implements OnInit {
  aboutData: any = { items: { ourVision: {}, ourMission: {} } };
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  success = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.apiService.getAbout().subscribe({
      next: (res: any) => {
        this.aboutData = res || { items: { ourVision: {}, ourMission: {} } };
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
    const id = this.aboutData?._id;
    if (!id) return;

    const formData = new FormData();
    formData.append('experienceYears', this.aboutData.experienceYears || '');
    formData.append('items', JSON.stringify(this.aboutData.items || {}));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.apiService.updateAbout(id, formData).subscribe({
      next: (res: any) => {
        this.aboutData = res || { items: { ourVision: {}, ourMission: {} } };
        this.success = true;
        this.loading = false;
        setTimeout(() => { this.success = false; }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }
}