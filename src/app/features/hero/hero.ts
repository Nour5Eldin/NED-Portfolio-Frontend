import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Hero implements OnInit {
  heroData: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getHero().subscribe({
      next: (data: any) => {
        this.heroData = {
          ...data,
          title: data.title?.replace(/\\n/g, '<br>'),
          description: data.description?.replace(/\\n/g, '<br>')
        };
      },
      error: (err) => console.error('Error fetching hero data:', err)
    });
  }
}