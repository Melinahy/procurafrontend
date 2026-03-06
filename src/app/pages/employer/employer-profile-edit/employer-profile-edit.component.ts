import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { CompanyService, CompanyProfile } from '../../../services/company.service';

@Component({
  selector: 'app-employer-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, ScrollToTopComponent, SpinnerComponent],
  templateUrl: './employer-profile-edit.component.html',
  styleUrl: './employer-profile-edit.component.scss',
})
export class EmployerProfileEditComponent implements OnInit {
  loading = true;
  saving = false;
  spinnerMsg = 'Cargando perfil...';
  successMsg = '';
  errorMsg = '';
  logoPreview = '';
  logoError = '';

  profile: CompanyProfile = {
    companyName: '',
    description: '',
    industry: '',
    city: '',
    country: '',
    contactEmail: '',
    contactPhone: '',
    employeesCount: null,
    foundedYear: null,
    taxId: '',
    website: '',
    address: '',
    logo: '',
    specialty: '',
    internationalPresence: '',
    completedProjects: '',
    fiscalAddress: '',
    maxCapacity: null,
    brochureUrl: '',
  };

  constructor(
    private companyService: CompanyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.companyService.getMyProfile().subscribe({
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
    this.companyService.updateMyProfile(this.profile).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = '¡Perfil actualizado correctamente!';
        setTimeout(() => this.router.navigate(['/employer-profile']), 1500);
      },
      error: (err: any) => {
        this.saving = false;
        this.errorMsg = err.error?.message || 'Error al guardar los cambios.';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/employer-profile']);
  }
}
