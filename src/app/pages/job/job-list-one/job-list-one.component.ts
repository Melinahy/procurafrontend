import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { FormOneComponent } from "../../../components/form/form-one/form-one.component";
import { FeatureOneComponent } from "../../../components/feature/feature-one/feature-one.component";
import { FooterTopComponent } from "../../../components/footer-top/footer-top.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-job-list-one',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FormOneComponent,
    FeatureOneComponent,
    FooterTopComponent,
    ScrollToTopComponent
  ],
  templateUrl: './job-list-one.component.html',
  styleUrl: './job-list-one.component.scss'
})
export class JobListOneComponent implements OnInit {
  jobData: Project[] = [];
  loading = true;
  error = '';

  // Paginación
  currentPage = 1;
  itemsPerPage = 6;

  private readonly categoryConfig: Record<string, { icon: string; color: string; label: string }> = {
    'CONSTRUCTION': { icon: 'mdi-hard-hat',       color: '#f97316', label: 'Construcción' },
    'MINING':       { icon: 'mdi-pickaxe',         color: '#78716c', label: 'Minería' },
    'AGROINDUSTRY': { icon: 'mdi-sprout',          color: '#10b981', label: 'Agroindustria' },
    'OTHER':        { icon: 'mdi-briefcase',        color: '#6366f1', label: 'Otro' },
  };

  private readonly statusConfig: Record<string, { label: string; color: string }> = {
    'PUBLISHED':   { label: 'Publicado',    color: '#16a34a' },
    'IN_PROGRESS': { label: 'En progreso',  color: '#d97706' },
    'COMPLETED':   { label: 'Completado',   color: '#7c3aed' },
    'CANCELLED':   { label: 'Cancelado',    color: '#dc2626' },
  };

  constructor(private readonly projectService: ProjectService) {}

  getCategoryIcon(category: string): string {
    return this.categoryConfig[category]?.icon || 'mdi-briefcase';
  }

  getCategoryColor(category: string): string {
    return this.categoryConfig[category]?.color || '#64748b';
  }

  getCategoryLabel(category: string): string {
    return this.categoryConfig[category]?.label || category;
  }

  getStatusLabel(status: string): string {
    return this.statusConfig[status]?.label || status;
  }

  getStatusColor(status: string): string {
    return this.statusConfig[status]?.color || '#64748b';
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAll().subscribe({
      next: (response: any) => {
        // Handle multiple API response shapes:
        // { data: Project[] }, { data: { content: Project[] } }, Project[]
        let all: Project[] = [];
        if (Array.isArray(response)) {
          all = response;
        } else if (Array.isArray(response?.data)) {
          all = response.data;
        } else if (Array.isArray(response?.data?.content)) {
          all = response.data.content;
        } else if (Array.isArray(response?.content)) {
          all = response.content;
        }
        this.jobData = all.filter((p: Project) => p.status === 'PUBLISHED' || p.status === 'IN_PROGRESS');
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los requerimientos.';
        this.loading = false;
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.jobData.length / this.itemsPerPage);
  }

  get paginatedData(): Project[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.jobData.slice(start, start + this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  }
}
