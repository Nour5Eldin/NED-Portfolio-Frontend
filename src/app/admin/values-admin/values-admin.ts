import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-values-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './values-admin.html',
  styleUrl: './values-admin.scss',
})
export class ValuesAdmin implements OnInit {
  valuesData: any = { cards: [] };
  loading = false;
  success = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.apiService.getValues().subscribe({
      next: (data: any) => {
        this.valuesData = data;
      },
      error: (err) => console.error(err)
    });
  }

  addCard(): void {
    this.valuesData.cards.push({ icon: '', title: '', text: '' });
  }

  removeCard(index: number): void {
    this.valuesData.cards.splice(index, 1);
  }

  save(): void {
    this.loading = true;
    this.apiService.updateValues(this.valuesData._id, this.valuesData).subscribe({
      next: (data: any) => {
        this.valuesData = data;
        this.success = true;
        this.loading = false;
        setTimeout(() => { this.success = false; }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }
}