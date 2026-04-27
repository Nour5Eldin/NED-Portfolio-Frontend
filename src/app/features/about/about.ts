import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../services/api';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class About implements OnInit {
  aboutData: any;
  constructor(private aboutService: ApiService, @Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
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
}
