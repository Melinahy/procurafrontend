import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CompanyService, CompanyProfile } from '../../../services/company.service';
import { ProviderService, ProviderProfile } from '../../../services/provider.service';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SpinnerComponent],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss',
})
export class CreateProfileComponent {
  step: 'selectType' | 'profileForm' | 'alreadyExists' = 'selectType';
  userType: 'COMPANY' | 'PROVIDER' | '' = '';

  loading = false;
  spinnerMsg = '';
  errorMsg = '';
  successMsg = '';
  existsMessage = '';

  userName = '';

  companyProfile: CompanyProfile = {
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
  };

  providerProfile: ProviderProfile = {
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
  };

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // Verificar que el usuario esté logueado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/signup']);
      return;
    }

    const user = this.authService.getCurrentUser();
    this.userName = user?.firstName || 'Usuario';

    // Pre-llenar email del perfil con el del usuario
    if (user?.email) {
      this.companyProfile.contactEmail = user.email;
      this.providerProfile.contactEmail = user.email;
    }

    // Leer query param ?type= (viene del botón del navbar para agregar segundo perfil)
    const typeParam = this.route.snapshot.queryParamMap.get('type') as 'COMPANY' | 'PROVIDER' | null;
    if (typeParam === 'COMPANY' || typeParam === 'PROVIDER') {
      if ((typeParam === 'COMPANY' && user?.hasCompanyProfile) ||
          (typeParam === 'PROVIDER' && user?.hasProviderProfile)) {
        this.existsMessage = typeParam === 'COMPANY'
          ? 'Ya tienes un perfil de empresa creado.'
          : 'Ya tienes un perfil de proveedor creado.';
        this.step = 'alreadyExists';
        return;
      }
      this.userType = typeParam;
      this.step = 'profileForm';
      return;
    }

    // Si ya tiene ambos perfiles → no hay nada que crear
    if (user?.hasCompanyProfile && user?.hasProviderProfile) {
      this.existsMessage = 'Ya tienes ambos perfiles creados (Empresa y Proveedor).';
      this.step = 'alreadyExists';
      return;
    }

    // Si tiene empresa pero NO proveedor → ir directo al formulario de proveedor
    if (user?.hasCompanyProfile && !user?.hasProviderProfile) {
      this.userType = 'PROVIDER';
      this.step = 'profileForm';
      return;
    }

    // Si tiene proveedor pero NO empresa → ir directo al formulario de empresa
    if (user?.hasProviderProfile && !user?.hasCompanyProfile) {
      this.userType = 'COMPANY';
      this.step = 'profileForm';
      return;
    }

    // No tiene ningún perfil → mostrar selección de tipo
  }

  selectUserType(type: 'COMPANY' | 'PROVIDER'): void {
    this.userType = type;
  }

  goToProfileForm(): void {
    this.errorMsg = '';
    if (!this.userType) {
      this.errorMsg = 'Selecciona un tipo de perfil.';
      return;
    }
    this.step = 'profileForm';
  }

  onSubmitProfile(): void {
    this.errorMsg = '';
    this.successMsg = '';
    this.loading = true;

    if (this.userType === 'COMPANY') {
      this.spinnerMsg = 'Creando perfil de empresa...';
      this.companyService.create(this.companyProfile).subscribe({
        next: () => this.onProfileSuccess(),
        error: (err: any) => this.onProfileError(err),
      });
    } else {
      this.spinnerMsg = 'Creando perfil de proveedor...';
      this.providerService.create(this.providerProfile).subscribe({
        next: () => this.onProfileSuccess(),
        error: (err: any) => this.onProfileError(err),
      });
    }
  }

  private onProfileSuccess(): void {
    this.spinnerMsg = '¡Perfil creado exitosamente!';
    // El tipo recién creado se convierte en el activo
    const targetType = this.userType as 'COMPANY' | 'PROVIDER';

    this.authService.updateUserType(targetType).subscribe({
      next: () => {
        // Validar con /companies/my y /providers/my para actualizar hasCompanyProfile/hasProviderProfile
        this.authService.refreshUserProfiles().subscribe({
          next: () => {
            setTimeout(() => {
              this.loading = false;
              this.successMsg = '¡Perfil creado! Redirigiendo...';
              setTimeout(() => this.router.navigate(['/job-list-one']), 1200);
            }, 800);
          },
          error: () => {
            this.loading = false;
            this.router.navigate(['/job-list-one']);
          }
        });
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/job-list-one']);
      }
    });
  }

  private onProfileError(err: any): void {
    this.loading = false;
    const msg = err.error?.message || '';

    // Si el backend dice que ya existe el perfil, ir a alreadyExists
    if (msg.toLowerCase().includes('ya existe') || msg.toLowerCase().includes('already exists') || err.status === 409) {
      this.existsMessage = this.userType === 'COMPANY'
        ? 'Ya tienes un perfil de empresa creado.'
        : 'Ya tienes un perfil de proveedor creado.';
      this.step = 'alreadyExists';
      // Refrescar perfiles para sincronizar estado
      this.authService.refreshUserProfiles().subscribe();
      return;
    }

    this.errorMsg = msg || 'Error al crear el perfil. Inténtalo de nuevo.';
  }

  goBack(): void {
    // Si el usuario ya tiene algún perfil, ir al inicio en vez de selectType
    const user = this.authService.getCurrentUser();
    if (user?.hasCompanyProfile || user?.hasProviderProfile) {
      this.router.navigate(['/job-list-one']);
    } else {
      this.step = 'selectType';
    }
  }

  goHome(): void {
    this.router.navigate(['/job-list-one']);
  }
}
