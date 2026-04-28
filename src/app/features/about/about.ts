import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class About implements OnInit {
  aboutData: any;

  constructor(private aboutService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe({
      next: (data: any) => {
        this.aboutData = {
          ...data,
          items: {
            ourVision: {
              ...data.items.ourVision,
              text: data.items.ourVision.text?.replace(/\\n/g, '\n').trim()
            },
            ourMission: {
              ...data.items.ourMission,
              text: data.items.ourMission.text?.replace(/\\n/g, '\n').trim()
            }
          }
        };
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error fetching about data:', err)
    });
  }
}