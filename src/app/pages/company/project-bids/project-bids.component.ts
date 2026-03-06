import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { BidService } from '../../../services/bid.service';
import { ProjectService } from '../../../services/project.service';
import { Bid } from '../../../models/project.model';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-bids',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, ScrollToTopComponent, SpinnerComponent],
  templateUrl: './project-bids.component.html',
  styleUrl: './project-bids.component.scss',
})
export class ProjectBidsComponent implements OnInit {
  projectId!: number;
  project: Project | null = null;
  bids: Bid[] = [];
  loading = true;
  actionLoading: number | null = null;
  error = '';
  successMsg = '';

  constructor(
    private readonly bidService: BidService,
    private readonly projectService: ProjectService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProject();
    this.loadBids();
  }

  loadProject(): void {
    this.projectService.getById(this.projectId).subscribe({
      next: (res) => { this.project = res.data; },
      error: () => {},
    });
  }

  loadBids(): void {
    this.bidService.getBidsByProject(this.projectId).subscribe({
      next: (res) => {
        this.bids = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las ofertas.';
        this.loading = false;
      },
    });
  }

  acceptBid(bid: Bid): void {
    if (!bid.id) return;
    this.actionLoading = bid.id;
    this.bidService.accept(bid.id).subscribe({
      next: () => {
        this.successMsg = `Oferta de ${bid.providerName} aceptada.`;
        this.loadBids();
        this.actionLoading = null;
      },
      error: () => { this.actionLoading = null; alert('Error al aceptar la oferta.'); },
    });
  }

  rejectBid(bid: Bid): void {
    if (!bid.id) return;
    this.actionLoading = bid.id;
    this.bidService.reject(bid.id).subscribe({
      next: () => {
        this.successMsg = `Oferta de ${bid.providerName} rechazada.`;
        this.loadBids();
        this.actionLoading = null;
      },
      error: () => { this.actionLoading = null; alert('Error al rechazar la oferta.'); },
    });
  }

  viewProvider(bid: Bid): void {
    if (bid.providerId) {
      this.router.navigate(['/candidate-profile', bid.providerId]);
    }
  }

  statusLabel(status: string | undefined): string {
    const map: Record<string, string> = {
      PENDING: 'Pendiente', ACCEPTED: 'Aceptada',
      REJECTED: 'Rechazada', WITHDRAWN: 'Retirada',
    };
    return map[status ?? ''] ?? status ?? '';
  }

  statusClass(status: string | undefined): string {
    const map: Record<string, string> = {
      PENDING: 'badge-pending', ACCEPTED: 'badge-accepted',
      REJECTED: 'badge-rejected', WITHDRAWN: 'badge-withdrawn',
    };
    return map[status ?? ''] ?? '';
  }
}
