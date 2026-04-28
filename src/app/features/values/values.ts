import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-values',
  templateUrl: './values.html',
  styleUrls: ['./values.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Values implements OnInit {
  valuesData: any;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

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