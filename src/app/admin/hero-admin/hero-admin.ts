import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-hero-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './hero-admin.html',
  styleUrl: './hero-admin.scss',
})
export class HeroAdmin implements OnInit {
  heroData: any = {};
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  success = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.apiService.getHero().subscribe({
      next: (res: any) => {
        this.heroData = res;
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
    const formData = new FormData();
    formData.append('subheading', this.heroData.subheading || '');
    formData.append('title', this.heroData.title || '');
    formData.append('description', this.heroData.description || '');
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.apiService.updateHero(this.heroData._id, formData).subscribe({
      next: (data: any) => {
        this.heroData = data;
        this.success = true;
        this.loading = false;
        setTimeout(() => { this.success = false; }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }
}