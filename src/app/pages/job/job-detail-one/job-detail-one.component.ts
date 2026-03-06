import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-job-detail-one',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ScrollToTopComponent, SpinnerComponent],
  templateUrl: './job-detail-one.component.html',
  styleUrl: './job-detail-one.component.scss',
})
export class JobDetailOneComponent implements OnInit {
  project: Project | null = null;
  loading = true;
  error = '';
  isProvider = false;

  readonly categoryLabels: Record<string, string> = {
    CONSTRUCTION: 'Construcción',
    MINING: 'Minería',
    AGROINDUSTRY: 'Agroindustria',
    OTHER: 'Otro',
  };

  readonly statusLabels: Record<string, string> = {
    DRAFT: 'Borrador',
    PUBLISHED: 'Publicado',
    IN_PROGRESS: 'En progreso',
    COMPLETED: 'Completado',
    CANCELLED: 'Cancelado',
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly projectService: ProjectService,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.error = 'ID de proyecto no válido.'; this.loading = false; return; }

    this.authService.currentUser$.subscribe(user => {
      this.isProvider = !!(user?.hasProviderProfile || user?.primaryType === 'PROVIDER');
    });

    this.projectService.getById(+id).subscribe({
      next: (res: any) => {
        this.project = res.data ?? res;
        this.loading = false;
      },
      error: () => { this.error = 'No se pudo cargar el requerimiento.'; this.loading = false; },
    });
  }

  getCategoryLabel(cat: string | undefined): string {
    return cat ? (this.categoryLabels[cat] ?? cat) : '';
  }

  getStatusLabel(status: string | undefined): string {
    return status ? (this.statusLabels[status] ?? status) : '';
  }

  applyNow(): void {
    if (this.project?.id) {
      this.router.navigate(['/job-apply'], { queryParams: { projectId: this.project.id } });
    }
  }

  goBack(): void {
    this.router.navigate(['/job-list-one']);
  }
}
