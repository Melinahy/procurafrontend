import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, ScrollToTopComponent, SpinnerComponent],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent implements OnInit {
  isEdit = false;
  projectId: number | null = null;
  loading = false;
  saving = false;
  spinnerMsg = 'Guardando...';
  successMsg = '';
  errorMsg = '';

  project: Project = {
    title: '',
    description: '',
    category: '',
    budgetMin: null,
    budgetMax: null,
    location: '',
    deadline: '',
    status: undefined,
    requirements: '',
    attachmentUrl: '',
    logo: '',
    specialty: '',
  };

  categoryOptions = [
    { value: 'CONSTRUCTION', label: 'Construcción' },
    { value: 'MINING', label: 'Minería' },
    { value: 'AGROINDUSTRY', label: 'Agroindustria' },
    { value: 'OTHER', label: 'Otro' },
  ];

  statusOptions = [
    { value: 'DRAFT', label: 'Borrador' },
    { value: 'PUBLISHED', label: 'Publicado' },
    { value: 'IN_PROGRESS', label: 'En progreso' },
    { value: 'COMPLETED', label: 'Completado' },
    { value: 'CANCELLED', label: 'Cancelado' },
  ];

  constructor(
    private readonly projectService: ProjectService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.projectId = Number(id);
      this.loading = true;
      this.projectService.getById(this.projectId).subscribe({
        next: (res) => {
          this.project = { ...this.project, ...res.data };
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'No se pudo cargar el proyecto.';
          this.loading = false;
        },
      });
    }
  }

  onSave(): void {
    this.errorMsg = '';
    this.successMsg = '';
    this.saving = true;

    const action = this.isEdit && this.projectId
      ? this.projectService.update(this.projectId, this.project)
      : this.projectService.create(this.project);

    action.subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = this.isEdit ? '¡Proyecto actualizado!' : '¡Requerimiento publicado!';
        setTimeout(() => this.router.navigate(['/my-projects']), 1500);
      },
      error: (err: any) => {
        this.saving = false;
        this.errorMsg = err.error?.message || 'Error al guardar el proyecto.';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/my-projects']);
  }
}
