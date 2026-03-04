import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-candidate-profile-setting',
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    ScrollToTopComponent,
    SpinnerComponent,
  ],
  templateUrl: './candidate-profile-setting.component.html',
  styleUrl: './candidate-profile-setting.component.scss',
})
export class CandidateProfileSettingComponent implements OnInit {
  currentUser: User | null = null;

  userData = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
  };

  passwords = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  };

  loading = false;
  spinnerMsg = '';
  profileMsg = '';
  profileError = '';
  passwordMsg = '';
  passwordError = '';

  // Fuerza de contraseña
  strengthLabel = '';
  strengthBars = [false, false, false];
  pwdRules = {
    length: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        this.userData = {
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          username: user.username || '',
          email: user.email || '',
          phone: user.phone || '',
        };
      }
    });
  }

  get userTypeLabel(): string {
    if (!this.currentUser) return '';
    if (this.currentUser.hasCompanyProfile && this.currentUser.hasProviderProfile) return 'Empresa y Proveedor';
    if (this.currentUser.hasCompanyProfile) return 'Empresa';
    if (this.currentUser.hasProviderProfile) return 'Proveedor';
    return 'Sin perfil';
  }

  get userInitials(): string {
    const f = this.userData.firstName?.[0] || '';
    const l = this.userData.lastName?.[0] || '';
    return (f + l).toUpperCase();
  }

  onSaveProfile(): void {
    this.profileMsg = '';
    this.profileError = '';

    if (!this.userData.firstName || !this.userData.lastName || !this.userData.username || !this.userData.email) {
      this.profileError = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    this.loading = true;
    this.spinnerMsg = 'Guardando cambios...';

    this.authService.updateProfile(this.userData).subscribe({
      next: () => {
        this.loading = false;
        this.profileMsg = 'Datos actualizados correctamente.';
      },
      error: (err: any) => {
        this.loading = false;
        this.profileError = err.error?.message || 'Error al guardar los cambios.';
      },
    });
  }

  checkStrength(val: string): void {
    this.pwdRules.length = val.length >= 8;
    this.pwdRules.lower = /[a-z]/.test(val);
    this.pwdRules.upper = /[A-Z]/.test(val);
    this.pwdRules.number = /[0-9]/.test(val);
    this.pwdRules.special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

    const passed = Object.values(this.pwdRules).filter(Boolean).length;
    this.strengthBars = [passed >= 2, passed >= 4, passed === 5];

    if (!val.length) this.strengthLabel = '';
    else if (passed <= 2) this.strengthLabel = 'Débil';
    else if (passed <= 4) this.strengthLabel = 'Media';
    else this.strengthLabel = 'Fuerte';
  }

  getBarClass(index: number): string {
    if (!this.strengthBars[index]) return 'sbar';
    const count = this.strengthBars.filter(Boolean).length;
    if (count === 1) return 'sbar weak';
    if (count === 2) return 'sbar medium';
    return 'sbar strong';
  }

  get passwordValid(): boolean {
    return Object.values(this.pwdRules).every(Boolean);
  }

  onChangePassword(): void {
    this.passwordMsg = '';
    this.passwordError = '';

    if (!this.passwords.oldPassword) {
      this.passwordError = 'Ingresa tu contraseña actual.';
      return;
    }
    if (!this.passwordValid) {
      this.passwordError = 'La nueva contraseña no cumple los requisitos de seguridad.';
      return;
    }
    if (this.passwords.newPassword !== this.passwords.newPasswordConfirm) {
      this.passwordError = 'Las contraseñas no coinciden.';
      return;
    }

    this.loading = true;
    this.spinnerMsg = 'Actualizando contraseña...';

    this.authService.changePassword(
      this.passwords.oldPassword,
      this.passwords.newPassword,
      this.passwords.newPasswordConfirm,
    ).subscribe({
      next: () => {
        this.loading = false;
        this.passwordMsg = 'Contraseña actualizada correctamente.';
        this.passwords = { oldPassword: '', newPassword: '', newPasswordConfirm: '' };
        this.strengthLabel = '';
        this.strengthBars = [false, false, false];
      },
      error: (err: any) => {
        this.loading = false;
        this.passwordError = err.error?.message || 'Error al cambiar la contraseña.';
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
