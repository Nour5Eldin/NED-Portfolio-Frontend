import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-testimonials-admin',
  standalone: true,
  imports: [FormsModule, RouterLink,SlicePipe],
  templateUrl: './testimonials-admin.html',
  styleUrl: './testimonials-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
  SECTION_NAME: string='';
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const url = this.route?.snapshot?.url;
    const path = url?.length ? url[url.length - 1]?.path || '' : '';
    this.SECTION_NAME = path.charAt(0).toUpperCase() + path.slice(1);
    this.loadTestimonials();
  }

  get currentTestimonial() {
    return this.isAdding ? this.newTestimonial : this.editingTestimonial;
  }

  loadTestimonials(): void {
    this.apiService.getTestimonials().subscribe({
      next: (data: any) => {
        this.testimonials = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  startEdit(testimonial: any): void {
    this.editingTestimonial = { ...testimonial };
    this.isAdding = false;
    this.cdr.markForCheck();
  }

  startAdd(): void {
    this.isAdding = true;
    this.editingTestimonial = null;
    this.newTestimonial = { clientName: '', clientRole: '', message: '' };
    this.cdr.markForCheck();
  }

  cancelEdit(): void {
    this.editingTestimonial = null;
    this.isAdding = false;
    this.cdr.markForCheck();
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
        this.cdr.markForCheck();
        setTimeout(() => { this.success = false; this.cdr.markForCheck(); }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; this.cdr.markForCheck(); }
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