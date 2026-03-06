import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { BidService } from '../../../services/bid.service';
import { ProjectService } from '../../../services/project.service';
import { Bid, Project } from '../../../models/project.model';

@Component({
  selector: 'app-my-bids',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent, ScrollToTopComponent, SpinnerComponent],
  templateUrl: './my-bids.component.html',
  styleUrl: './my-bids.component.scss',
})
export class MyBidsComponent implements OnInit {
  bids: Bid[] = [];
  openProjects: Project[] = [];
  loading = true;
  loadingProjects = true;
  actionLoading: number | null = null;
  error = '';
  successMsg = '';

  // Form nueva oferta
  showBidForm = false;
  savingBid = false;
  bidError = '';
  newBid: Bid = { projectId: undefined, amount: null, proposal: '', estimatedDays: null };

  constructor(
    private readonly bidService: BidService,
    private readonly projectService: ProjectService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadBids();
    this.loadOpenProjects();
  }

  loadBids(): void {
    this.bidService.getMyBids().subscribe({
      next: (res) => { this.bids = res.data || []; this.loading = false; },
      error: () => { this.error = 'No se pudieron cargar tus ofertas.'; this.loading = false; },
    });
  }

  loadOpenProjects(): void {
    this.projectService.getAll().subscribe({
      next: (res) => {
        this.openProjects = (res.data || []).filter(p => p.status === 'PUBLISHED' || !p.status);
        this.loadingProjects = false;
      },
      error: () => { this.loadingProjects = false; },
    });
  }

  submitBid(): void {
    this.bidError = '';
    if (!this.newBid.projectId) { this.bidError = 'Selecciona un proyecto.'; return; }
    if (!this.newBid.amount)    { this.bidError = 'Ingresa el monto de tu oferta.'; return; }
    if (!this.newBid.proposal)  { this.bidError = 'Escribe una propuesta.'; return; }
    this.savingBid = true;
    this.bidService.create(this.newBid).subscribe({
      next: () => {
        this.savingBid = false;
        this.showBidForm = false;
        this.newBid = { projectId: undefined, amount: null, proposal: '', estimatedDays: null };
        this.successMsg = '¡Oferta enviada correctamente!';
        this.loadBids();
      },
      error: (err: any) => {
        this.savingBid = false;
        this.bidError = err.error?.message || 'Error al enviar la oferta.';
      },
    });
  }

  withdrawBid(bid: Bid): void {
    if (!bid.id) return;
    if (!confirm(`¿Retirar tu oferta para "${bid.projectTitle}"?`)) return;
    this.actionLoading = bid.id;
    this.bidService.withdraw(bid.id).subscribe({
      next: () => {
        this.successMsg = 'Oferta retirada.';
        this.bids = this.bids.filter(b => b.id !== bid.id);
        this.actionLoading = null;
      },
      error: () => { this.actionLoading = null; alert('Error al retirar la oferta.'); },
    });
  }

  viewProject(bid: Bid): void {
    if (bid.projectId) this.router.navigate(['/job-detail-one', bid.projectId]);
  }

  statusLabel(s: string | undefined): string {
    return { PENDING: 'Pendiente', ACCEPTED: 'Aceptada', REJECTED: 'Rechazada', WITHDRAWN: 'Retirada' }[s ?? ''] ?? s ?? '';
  }
  statusClass(s: string | undefined): string {
    return { PENDING: 'badge-pending', ACCEPTED: 'badge-accepted', REJECTED: 'badge-rejected', WITHDRAWN: 'badge-withdrawn' }[s ?? ''] ?? '';
  }
}
