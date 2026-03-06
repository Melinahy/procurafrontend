import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { BidService } from '../../../services/bid.service';
import { ProjectService } from '../../../services/project.service';
import { Bid, Project } from '../../../models/project.model';

@Component({
  selector: 'app-job-apply',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, ScrollToTopComponent, SpinnerComponent],
  templateUrl: './job-apply.component.html',
  styleUrl: './job-apply.component.scss',
})
export class JobApplyComponent implements OnInit {
  project: Project | null = null;
  loadingProject = true;
  saving = false;
  errorMsg = '';
  successMsg = '';

  bid: Bid = { amount: null, proposal: '', estimatedDays: null };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly bidService: BidService,
    private readonly projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.queryParamMap.get('projectId');
    if (!projectId) {
      this.errorMsg = 'No se especificó el proyecto.';
      this.loadingProject = false;
      return;
    }
    this.bid.projectId = +projectId;
    this.projectService.getById(+projectId).subscribe({
      next: (res: any) => { this.project = res.data ?? res; this.loadingProject = false; },
      error: () => { this.errorMsg = 'No se pudo cargar el requerimiento.'; this.loadingProject = false; },
    });
  }

  onSubmit(): void {
    this.errorMsg = '';
    if (!this.bid.amount) { this.errorMsg = 'Ingresa el monto de tu oferta.'; return; }
    if (!this.bid.proposal?.trim()) { this.errorMsg = 'Escribe una propuesta.'; return; }

    this.saving = true;
    this.bidService.create(this.bid).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = '¡Oferta enviada correctamente!';
        setTimeout(() => this.router.navigate(['/job-list-one']), 1800);
      },
      error: (err: any) => {
        this.saving = false;
        this.errorMsg = err.error?.message || 'Error al enviar la oferta.';
      },
    });
  }

  goBack(): void {
    if (this.project?.id) {
      this.router.navigate(['/job-detail-one', this.project.id]);
    } else {
      this.router.navigate(['/job-list-one']);
    }
  }
}
