import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-contactus',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    ScrollToTopComponent,
  ],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss',
})
export class ContactusComponent {
  form = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  submitted = false;
  sending = false;
  successMsg = '';
  errorMsg = '';

  onSubmit(): void {
    this.successMsg = '';
    this.errorMsg = '';

    if (!this.form.name || !this.form.email || !this.form.message) {
      this.errorMsg = 'Por favor completa los campos obligatorios.';
      return;
    }

    this.sending = true;

    // Simular envio (reemplazar con API real cuando exista)
    setTimeout(() => {
      this.sending = false;
      this.submitted = true;
      this.successMsg = 'Tu mensaje ha sido enviado correctamente. Te responderemos pronto.';
      this.form = { name: '', email: '', subject: '', message: '' };
    }, 1500);
  }
}
