import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../services/api';

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

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.apiService.getValues().subscribe({
      next: (data: any) => {
        this.valuesData = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }
}