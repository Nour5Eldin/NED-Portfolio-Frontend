import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-testimonials-admin',
  standalone: true,
  imports: [FormsModule, RouterLink, SlicePipe],
  templateUrl: './testimonials-admin.html',
  styleUrl: './testimonials-admin.scss',
})
export class TestimonialsAdmin implements OnInit {
  testimonials: any[] = [];
  editingTestimonial: any = null;
  isAdding = false;
  loading = false;
  success = false;

  newTestimonial = {
    clientName: '',
    clientRole: '',
    message: ''
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  get currentTestimonial() {
    return this.isAdding ? this.newTestimonial : this.editingTestimonial;
  }

  loadTestimonials(): void {
    this.apiService.getTestimonials().subscribe({
      next: (data: any) => {
        this.testimonials = data || [];
      },
      error: (err) => console.error(err)
    });
  }

  startEdit(testimonial: any): void {
    this.editingTestimonial = { ...testimonial };
    this.isAdding = false;
  }

  startAdd(): void {
    this.isAdding = true;
    this.editingTestimonial = null;
    this.newTestimonial = { clientName: '', clientRole: '', message: '' };
  }

  cancelEdit(): void {
    this.editingTestimonial = null;
    this.isAdding = false;
  }

  save(): void {
    this.loading = true;
    const data = this.isAdding ? this.newTestimonial : this.editingTestimonial;

    const request = this.isAdding
      ? this.apiService.createTestimonial(data)
      : this.apiService.updateTestimonial(data._id, data);

    request.subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        this.editingTestimonial = null;
        this.isAdding = false;
        this.loadTestimonials();
        setTimeout(() => { this.success = false; }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  deleteTestimonial(id: string): void {
    if (confirm('Are you sure?')) {
      this.apiService.deleteTestimonial(id).subscribe({
        next: () => this.loadTestimonials(),
        error: (err) => console.error(err)
      });
    }
  }
}