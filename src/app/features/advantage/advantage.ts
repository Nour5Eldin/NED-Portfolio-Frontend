import { Component, ViewEncapsulation, Inject, PLATFORM_ID, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-advantage',
  imports: [],
  templateUrl: './advantage.html',
  styleUrl: './advantage.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Advantage implements OnInit {
  advantageData: any;

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.apiService.getWhyChooseUs().subscribe({
        next: (data: any) => {
          this.advantageData = data;
          this.cdr.markForCheck();
        },
        error: (err) => console.error(err)
      });
    }
  }
}