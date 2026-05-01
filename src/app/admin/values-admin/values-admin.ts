import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-values-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './values-admin.html',
  styleUrl: './values-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValuesAdmin implements OnInit {
  valuesData: any = { cards: [] };
  loading = false;
  success = false;
  SECTION_NAME: string='';
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const url = this.route?.snapshot?.url;
    const path = url?.length ? url[url.length - 1]?.path || '' : '';
    this.SECTION_NAME = path.charAt(0).toUpperCase() + path.slice(1);
    this.apiService.getValues().subscribe({
      next: (res: any) => {
        this.valuesData = res?.data || res;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  addCard(): void {
    this.valuesData.cards.push({ icon: '', title: '', text: '' });
    this.cdr.markForCheck();
  }

  removeCard(index: number): void {
    this.valuesData.cards.splice(index, 1);
    this.cdr.markForCheck();
  }

  save(): void {
    this.loading = true;
    this.apiService.updateValues(this.valuesData._id, this.valuesData).subscribe({
      next: (res: any) => {
        this.valuesData = res?.data || res || [];
        this.success = true;
        this.loading = false;
        this.cdr.markForCheck();
        setTimeout(() => { this.success = false; this.cdr.markForCheck(); }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; this.cdr.markForCheck(); }
    });
  }
}