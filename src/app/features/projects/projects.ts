import { Component, ViewEncapsulation, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Projects implements OnInit {
  activeTab = 'residential';
  allProjects: any[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe({
      next: (data: any) => {
        this.allProjects = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  setTab(tab: string): void {
    this.activeTab = tab;
    this.cdr.markForCheck();
  }

  get filteredProjects() {
    return this.allProjects.filter(p => p.category === this.activeTab);
  }
}