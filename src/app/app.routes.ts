import { Routes } from '@angular/router';

export const routes: Routes = [
  // Página principal - Cargar inmediatamente
  {
    path: '', 
    loadComponent: () => import('./pages/index/index-one/index-one.component').then(c => c.IndexOneComponent)
  },
  
  // Páginas de índice
  {
    path: 'index-two', 
    loadComponent: () => import('./pages/index/index-two/index-two.component').then(c => c.IndexTwoComponent)
  },
  {
    path: 'index-three', 
    loadComponent: () => import('./pages/index/index-three/index-three.component').then(c => c.IndexThreeComponent)
  },
  
  // Rutas de trabajo (Jobs)
  {
    path: 'job-categories', 
    loadComponent: () => import('./pages/job/job-categories/job-categories.component').then(c => c.JobCategoriesComponent)
  },
  {
    path: 'job-list-one', 
    loadComponent: () => import('./pages/job/job-list-one/job-list-one.component').then(c => c.JobListOneComponent)
  },
  {
    path: 'job-detail-one', 
    loadComponent: () => import('./pages/job/job-detail-one/job-detail-one.component').then(c => c.JobDetailOneComponent)
  },
  {
    path: 'job-detail-one/:id', 
    loadComponent: () => import('./pages/job/job-detail-one/job-detail-one.component').then(c => c.JobDetailOneComponent)
  },
  {
    path: 'job-apply', 
    loadComponent: () => import('./pages/job/job-apply/job-apply.component').then(c => c.JobApplyComponent)
  },
  {
    path: 'job-post', 
    loadComponent: () => import('./pages/job/job-post/job-post.component').then(c => c.JobPostComponent)
  },
  {
    path: 'career', 
    loadComponent: () => import('./pages/job/career/career.component').then(c => c.CareerComponent)
  },
  
  // Rutas de empleadores (Employers)
  {
    path: 'employers', 
    loadComponent: () => import('./pages/employer/employers/employers.component').then(c => c.EmployersComponent)
  },
  {
    path: 'employer-profile', 
    loadComponent: () => import('./pages/employer/employer-profile/employer-profile.component').then(c => c.EmployerProfileComponent)
  },
  {
    path: 'employer-profile/:id',
    loadComponent: () => import('./pages/employer/employer-profile/employer-profile.component').then(c => c.EmployerProfileComponent)
  },
  {
    path: 'employer-profile-edit',
    loadComponent: () => import('./pages/employer/employer-profile-edit/employer-profile-edit.component').then(c => c.EmployerProfileEditComponent)
  },
  
  // Rutas de candidatos (Candidates)
  {
    path: 'candidates', 
    loadComponent: () => import('./pages/candidate/candidates/candidates.component').then(c => c.CandidatesComponent)
  },
  {
    path: 'candidate-profile', 
    loadComponent: () => import('./pages/candidate/candidate-profile/candidate-profile.component').then(c => c.CandidateProfileComponent)
  },
  {
    path: 'candidate-profile/:id', 
    loadComponent: () => import('./pages/candidate/candidate-profile/candidate-profile.component').then(c => c.CandidateProfileComponent)
  },
  {
    path: 'candidate-profile-setting',
    loadComponent: () => import('./pages/candidate/candidate-profile-setting/candidate-profile-setting.component').then(c => c.CandidateProfileSettingComponent)
  },
  {
    path: 'candidate-profile-edit',
    loadComponent: () => import('./pages/candidate/candidate-profile-edit/candidate-profile-edit.component').then(c => c.CandidateProfileEditComponent)
  },

  // Gestión de proyectos (empresa)
  {
    path: 'my-projects',
    loadComponent: () => import('./pages/company/my-projects/my-projects.component').then(c => c.MyProjectsComponent)
  },
  {
    path: 'project-form',
    loadComponent: () => import('./pages/company/project-form/project-form.component').then(c => c.ProjectFormComponent)
  },
  {
    path: 'project-form/:id',
    loadComponent: () => import('./pages/company/project-form/project-form.component').then(c => c.ProjectFormComponent)
  },
  {
    path: 'project-bids/:id',
    loadComponent: () => import('./pages/company/project-bids/project-bids.component').then(c => c.ProjectBidsComponent)
  },

  // Gestión de ofertas (proveedor)
  {
    path: 'my-bids',
    loadComponent: () => import('./pages/provider/my-bids/my-bids.component').then(c => c.MyBidsComponent)
  },

  // Páginas informativas
  {
    path: 'aboutus', 
    loadComponent: () => import('./pages/aboutus/aboutus.component').then(c => c.AboutusComponent)
  },
  {
    path: 'services', 
    loadComponent: () => import('./pages/services/services.component').then(c => c.ServicesComponent)
  },
  {
    path: 'pricing', 
    loadComponent: () => import('./pages/pricing/pricing.component').then(c => c.PricingComponent)
  },
  
  // Centro de ayuda (Help Center)
  {
    path: 'helpcenter-overview', 
    loadComponent: () => import('./pages/helpcenter/helpcenter-overview/helpcenter-overview.component').then(c => c.HelpcenterOverviewComponent)
  },
  {
    path: 'helpcenter-faqs', 
    loadComponent: () => import('./pages/helpcenter/helpcenter-faqs/helpcenter-faqs.component').then(c => c.HelpcenterFaqsComponent)
  },
  {
    path: 'helpcenter-guides', 
    loadComponent: () => import('./pages/helpcenter/helpcenter-guides/helpcenter-guides.component').then(c => c.HelpcenterGuidesComponent)
  },
  {
    path: 'helpcenter-support', 
    loadComponent: () => import('./pages/helpcenter/helpcenter-support/helpcenter-support.component').then(c => c.HelpcenterSupportComponent)
  },
  
  // Blog
  {
    path: 'blogs', 
    loadComponent: () => import('./pages/blog/blogs/blogs.component').then(c => c.BlogsComponent)
  },
  {
    path: 'blog-sidebar', 
    loadComponent: () => import('./pages/blog/blog-sidebar/blog-sidebar.component').then(c => c.BlogSidebarComponent)
  },
  {
    path: 'blog-detail', 
    loadComponent: () => import('./pages/blog/blog-detail/blog-detail.component').then(c => c.BlogDetailComponent)
  },
  {
    path: 'blog-detail/:id', 
    loadComponent: () => import('./pages/blog/blog-detail/blog-detail.component').then(c => c.BlogDetailComponent)
  },
  
  // Autenticación (Auth)
  {
    path: 'login', 
    loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup/signup.component').then(c => c.SignupComponent)
  },
  {
    path: 'create-profile',
    loadComponent: () => import('./pages/auth/create-profile/create-profile.component').then(c => c.CreateProfileComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/auth/reset-password/reset-password.component').then(c => c.ResetPasswordComponent)
  },
  {
    path: 'new-password',
    loadComponent: () => import('./pages/auth/new-password/new-password.component').then(c => c.NewPasswordComponent)
  },
  {
    path: 'lock-screen', 
    loadComponent: () => import('./pages/auth/lock-screen/lock-screen.component').then(c => c.LockScreenComponent)
  },
  
  // Páginas de utilidad
  {
    path: 'terms', 
    loadComponent: () => import('./pages/utility/terms/terms.component').then(c => c.TermsComponent)
  },
  {
    path: 'privacy', 
    loadComponent: () => import('./pages/utility/privacy/privacy.component').then(c => c.PrivacyComponent)
  },
  
  // Páginas especiales
  {
    path: 'comingsoon', 
    loadComponent: () => import('./pages/special/comingsoon/comingsoon.component').then(c => c.ComingsoonComponent)
  },
  {
    path: 'maintenance', 
    loadComponent: () => import('./pages/special/maintenance/maintenance.component').then(c => c.MaintenanceComponent)
  },
  {
    path: 'error', 
    loadComponent: () => import('./pages/special/error/error.component').then(c => c.ErrorComponent)
  },
  
  // Contacto
  {
    path: 'contactus', 
    loadComponent: () => import('./pages/contactus/contactus.component').then(c => c.ContactusComponent)
  },
  
  // Ruta wildcard - debe ir al final
  {
    path: '**', 
    redirectTo: 'error'
  }
];