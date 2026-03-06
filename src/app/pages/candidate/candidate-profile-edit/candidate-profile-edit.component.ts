import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ProviderService, ProviderProfile } from '../../../services/provider.service';

@Component({
  selector: 'app-candidate-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, ScrollToTopComponent, SpinnerComponent],
  templateUrl: './candidate-profile-edit.component.html',
  styleUrl: './candidate-profile-edit.component.scss',
})
export class CandidateProfileEditComponent implements OnInit {
  loading = true;
  saving = false;
  spinnerMsg = 'Cargando perfil...';
  successMsg = '';
  errorMsg = '';
  logoPreview = '';
  logoError = '';

  profile: ProviderProfile = {
    providerName: '',
    description: '',
    specialty: '',
    services: '',
    experienceYears: null,
    city: '',
    country: '',
    contactEmail: '',
    contactPhone: '',
    hourlyRate: null,
    isAvailable: true,
    workersCount: null,
    whatsappNumber: '',
    brochureUrl: '',
    certifications: '',
    logo: '',
    website: '',
    address: '',
    clientsList: '',
  };

  constructor(
    private providerService: ProviderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.providerService.getMyProfile().subscribe({
      next: (res) => {
        this.profile = { ...this.profile, ...res.data };
        this.logoPreview = this.profile.logo || '';
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'No se pudo cargar el perfil.';
        this.loading = false;
      },
    });
  }

  onLogoSelected(event: Event): void {
    this.logoError = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.logoError = 'Solo se permiten imágenes (PNG, JPG, WEBP, GIF).';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.logoError = 'La imagen no debe superar 2 MB.';
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      this.profile.logo = base64;
      this.logoPreview = base64;
    };
    reader.readAsDataURL(file);
  }

  onSave(): void {
    this.errorMsg = '';
    this.successMsg = '';
    this.saving = true;
    this.spinnerMsg = 'Guardando cambios...';
    this.providerService.updateMyProfile(this.profile).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = '¡Perfil actualizado correctamente!';
        setTimeout(() => this.router.navigate(['/candidate-profile']), 1500);
      },
      error: (err: any) => {
        this.saving = false;
        this.errorMsg = err.error?.message || 'Error al guardar los cambios.';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/candidate-profile']);
  }
}
