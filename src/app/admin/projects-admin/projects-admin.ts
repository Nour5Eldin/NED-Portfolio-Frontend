import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-projects-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './projects-admin.html',
  styleUrl: './projects-admin.scss',
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

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  get currentProject() {
    return this.isAdding ? this.newProject : this.editingProject;
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe({
      next: (data: any) => {
        this.projects = data || [];
      },
      error: (err) => console.error(err)
    });
  }

  startEdit(project: any): void {
    this.editingProject = { ...project };
    this.imagePreview = null;
    this.selectedFile = null;
    this.isAdding = false;
  }

  startAdd(): void {
    this.isAdding = true;
    this.editingProject = null;
    this.imagePreview = null;
    this.selectedFile = null;
    this.newProject = { title: '', location: '', description: '', category: 'residential', image: '' };
  }

  cancelEdit(): void {
    this.editingProject = null;
    this.isAdding = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
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
      next: () => {
        this.success = true;
        this.loading = false;
        this.editingProject = null;
        this.isAdding = false;
        this.loadProjects();
        setTimeout(() => { this.success = false; }, 3000);
      },
      error: (err) => { console.error(err); this.loading = false; }
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