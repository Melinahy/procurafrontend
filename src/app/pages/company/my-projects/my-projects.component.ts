import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, ScrollToTopComponent, SpinnerComponent],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss',
})
export class MyProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  error = '';
  deletingId: number | null = null;

  constructor(
    private readonly projectService: ProjectService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.projectService.getMyProjects().subscribe({
      next: (res) => {
        this.projects = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los proyectos.';
        this.loading = false;
      },
    });
  }

  edit(project: Project): void {
    this.router.navigate(['/project-form', project.id]);
  }

  viewBids(project: Project): void {
    this.router.navigate(['/project-bids', project.id]);
  }

  deleteProject(project: Project): void {
    if (!project.id) return;
    if (!confirm(`¿Eliminar el proyecto "${project.title}"?`)) return;
    this.deletingId = project.id;
    this.projectService.delete(project.id).subscribe({
      next: () => {
        this.projects = this.projects.filter(p => p.id !== project.id);
        this.deletingId = null;
      },
      error: () => {
        this.deletingId = null;
        alert('No se pudo eliminar el proyecto.');
      },
    });
  }

  categoryLabel(category: string | undefined): string {
    const map: Record<string, string> = {
      CONSTRUCTION: 'Construcción',
      MINING: 'Minería',
      AGROINDUSTRY: 'Agroindustria',
      OTHER: 'Otro',
    };
    return map[category ?? ''] ?? category ?? '';
  }

  statusLabel(status: string | undefined): string {
    const map: Record<string, string> = {
      DRAFT: 'Borrador',
      PUBLISHED: 'Publicado',
      IN_PROGRESS: 'En progreso',
      COMPLETED: 'Completado',
      CANCELLED: 'Cancelado',
    };
    return map[status ?? ''] ?? status ?? '';
  }

  statusClass(status: string | undefined): string {
    const map: Record<string, string> = {
      DRAFT: 'badge-draft',
      PUBLISHED: 'badge-open',
      IN_PROGRESS: 'badge-progress',
      COMPLETED: 'badge-completed',
      CANCELLED: 'badge-closed',
    };
    return map[status ?? ''] ?? '';
  }
}
