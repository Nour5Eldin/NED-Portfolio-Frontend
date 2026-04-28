import { Component, ViewEncapsulation, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-advantage',
  standalone: true,
  imports: [],
  templateUrl: './advantage.html',
  styleUrls: ['./advantage.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Advantage implements OnInit {
  advantageData: any;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.apiService.getWhyChooseUs().subscribe({
      next: (data: any) => {
        this.advantageData = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }
}