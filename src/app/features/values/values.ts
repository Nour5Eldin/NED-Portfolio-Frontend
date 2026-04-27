import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../services/api';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-values',
  imports: [],
  templateUrl: './values.html',
  styleUrl: './values.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Values implements OnInit {
  valuesData: any;
  constructor(private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef){} 
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.apiService.getValues().subscribe({
        next: (data: any) => {
          this.valuesData = data;
          this.cdr.markForCheck();
        },
        error: (err) => console.error(err)
      });
   }
  }
}
