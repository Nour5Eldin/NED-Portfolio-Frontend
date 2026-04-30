import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-projects-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './projects-admin.html',
  styleUrl: './projects-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsAdmin implements OnInit {
  projects: any[] = [];
  editingProject: any = null;
  isAdding = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading = false;
  success = false;

  newProject = {
    title: '',
    location: '',
    description: '',
    category: 'residential',
    image: ''
  };
  SECTION_NAME: string='';
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const url = this.route?.snapshot?.url;
    const path = url?.length ? url[url.length - 1]?.path || '' : '';
    this.SECTION_NAME = path.charAt(0).toUpperCase() + path.slice(1);
    this.loadProjects();
  }
  get currentProject() {
    return this.isAdding ? this.newProject : this.editingProject;
  }
  loadProjects(): void {
    this.apiService.getProjects().subscribe({
      next: (data: any) => {
        this.projects = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  startEdit(project: any): void {
    this.editingProject = { ...project };
    this.imagePreview = null;
    this.selectedFile = null;
    this.isAdding = false;
    this.cdr.markForCheck();
  }

  startAdd(): void {
    this.isAdding = true;
    this.editingProject = null;
    this.imagePreview = null;
    this.selectedFile = null;
    this.newProject = { title: '', location: '', description: '', category: 'residential', image: '' };
    this.cdr.markForCheck();
  }

  cancelEdit(): void {
    this.editingProject = null;
    this.isAdding = false;
    this.cdr.markForCheck();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  save(): void {
    this.loading = true;
    const formData = new FormData();
    const data = this.isAdding ? this.newProject : this.editingProject;

    formData.append('title', data.title);
    formData.append('location', data.location);
    formData.append('description', data.description);
    formData.append('category', data.category);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const request = this.isAdding
      ? this.apiService.createProject(formData)
      : this.apiService.updateProject(data._id, formData);

    request.subscribe({
      next: (data: any) => {
        this.success = true;
        this.loading = false;
        this.editingProject = null;
        this.isAdding = false;
        this.loadProjects();
        this.apiService.setAsPublished(this.SECTION_NAME, data );
        this.cdr.markForCheck();
        setTimeout(() => { this.success = false; this.cdr.markForCheck(); }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; this.cdr.markForCheck(); }
    });
  }

  deleteProject(id: string): void {
    if (confirm('Are you sure?')) {
      this.apiService.deleteProject(id).subscribe({
        next: () => this.loadProjects(),
        error: (err) => console.error(err)
      });
    }
  }
}