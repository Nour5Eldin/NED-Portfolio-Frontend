import { Component, AfterViewInit, ViewEncapsulation, Inject, PLATFORM_ID, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.html',
  styleUrls: ['./reviews.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Reviews implements OnInit, AfterViewInit {
  testimonials: any[] = [];

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.apiService.getTestimonials().subscribe({
      next: (data: any) => {
        this.testimonials = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        new Swiper('.testimonial-swiper', {
          modules: [Pagination, Autoplay],
          slidesPerView: 1,
          loop: true,
          observer: true,
          observeParents: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
      }, 500);
    }
  }
}