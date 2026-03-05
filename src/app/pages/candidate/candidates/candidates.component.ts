import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { FooterTopComponent } from '../../../components/footer-top/footer-top.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ProviderService, ProviderProfile } from '../../../services/provider.service';

@Component({
  selector: 'app-candidates',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterTopComponent,
    ScrollToTopComponent,
    SpinnerComponent,
  ],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
})
export class CandidatesComponent implements OnInit {
  providers: ProviderProfile[] = [];
  loading = true;
  error = '';

  constructor(private readonly providerService: ProviderService) {}

  ngOnInit(): void {
    this.providerService.getAll().subscribe({
      next: (res) => {
        this.providers = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los proveedores.';
        this.loading = false;
      },
    });
  }

  getInitials(name: string): string {
    return name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || '??';
  }

  getServiceTags(services: string): string[] {
    if (!services) return [];
    return services.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 3);
  }
}
