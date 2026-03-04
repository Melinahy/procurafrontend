import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, FormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;
  showSpinner = false;
  spinnerMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin(): void {
    this.loading = true;
    this.error = '';
    this.showSpinner = true;
    this.spinnerMsg = 'Iniciando sesión...';

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.success && response.data?.user) {
          this.spinnerMsg = 'Verificando tu perfil...';

          // Verificar perfiles REALES consultando /companies/my y /providers/my
          this.authService.refreshUserProfiles().subscribe({
            next: () => {
              const user = this.authService.getCurrentUser();
              const hasCompany = user?.hasCompanyProfile ?? false;
              const hasProvider = user?.hasProviderProfile ?? false;

              if (!hasCompany && !hasProvider) {
                // Sin ningún perfil → crear perfil
                this.spinnerMsg = 'Redirigiendo a crear tu perfil...';
                setTimeout(() => {
                  this.showSpinner = false;
                  this.loading = false;
                  this.router.navigate(['/create-profile']);
                }, 800);
                return;
              }

              // Tiene al menos un perfil → ir al inicio
              const targetType: 'COMPANY' | 'PROVIDER' = hasCompany ? 'COMPANY' : 'PROVIDER';
              this.authService.updateUserType(targetType).subscribe({
                next: () => {
                  this.spinnerMsg = '¡Bienvenido de vuelta!';
                  setTimeout(() => {
                    this.showSpinner = false;
                    this.loading = false;
                    this.router.navigate(['/job-list-one']);
                  }, 800);
                },
                error: () => {
                  this.showSpinner = false;
                  this.loading = false;
                  this.router.navigate(['/job-list-one']);
                }
              });
            },
            error: () => {
              // Si falla la verificación, ir al inicio de todos modos
              this.showSpinner = false;
              this.loading = false;
              this.router.navigate(['/job-list-one']);
            }
          });
        } else {
          this.showSpinner = false;
          this.loading = false;
          this.router.navigate(['/job-list-one']);
        }
      },
      error: (err) => {
        this.showSpinner = false;
        this.error = err.error?.message || 'Error al iniciar sesión';
        this.loading = false;
      },
    });
  }
}
