import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api';
import { DatePipe, LowerCasePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, DatePipe, LowerCasePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
  
export class Dashboard implements OnInit {
  unreadCount: number = 0;
  totalProjects: number = 0;
  sections: any[] = [];
  constructor(private apiService: ApiService, public router: Router) {}
  ngOnInit(): void {
    this.sections = this.apiService.sectionStatus;
    this.loadStats();
  }
  loadStats() {
    this.apiService.getDashboardStats().subscribe({
      next: (data) => {
        this.unreadCount = data.unreadMessages;
        this.totalProjects = data.totalProjects;
        this.apiService.sectionStatus = this.apiService.sectionStatus.map(s => {
          const serverData = data.sectionsInfo?.find((info: any) => info.name === s.name);
          return {
            ...s,
            status: serverData ? serverData.status : s.status,
            count: serverData ? serverData.count : (s.name === 'Projects' ? data.totalProjects : s.count),
            lastUpdated: serverData?.updatedAt ? new Date(serverData.updatedAt) : s.lastUpdated,
          };
        });
      },
      error(err) {
        console.error('Failed to load dashboard stats:', err)
      },
    })
  }
}