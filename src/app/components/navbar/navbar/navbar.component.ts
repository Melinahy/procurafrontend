import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import * as feather from 'feather-icons'
import {NgClickOutsideDirective} from 'ng-click-outside2';
import { AuthService } from '../../../services/auth.service';
import { CompanyService } from '../../../services/company.service';
import { ProviderService } from '../../../services/provider.service';
import { User } from '../../../models/user.model';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,
    NgClickOutsideDirective,
    SpinnerComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() navclass:any

  ngAfterViewInit() {
    feather.replace();
  }

  manu:string = '';
  subManu:string = '';
  toggleManu:boolean = false

  isLoggedIn = false;
  needsProfile = false;
  missingProfileType: 'COMPANY' | 'PROVIDER' | null = null;
  hasBothProfiles = false;
  switchingType = false;
  currentUser: User | null = null;
  profilePhoto = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private companyService: CompanyService,
    private providerService: ProviderService,
  ) {}

  ngOnInit() {
    const current = this.router.url;
    this.manu = current
    this.subManu = current
    window.scrollTo(0, 0);

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = this.authService.isLoggedIn();
      this.needsProfile = this.isLoggedIn && !!user && !user.hasCompanyProfile && !user.hasProviderProfile;
      this.hasBothProfiles = !!user?.hasCompanyProfile && !!user?.hasProviderProfile;

      if (user && user.hasProviderProfile && !user.hasCompanyProfile) {
        this.missingProfileType = 'COMPANY';
      } else if (user && user.hasCompanyProfile && !user.hasProviderProfile) {
        this.missingProfileType = 'PROVIDER';
      } else {
        this.missingProfileType = null;
      }

      // Load profile photo
      if (user && this.isLoggedIn) {
        this.loadProfilePhoto(user);
      } else {
        this.profilePhoto = '';
      }
    });
  }

  private loadProfilePhoto(user: User): void {
    if (user.primaryType === 'COMPANY' || user.hasCompanyProfile) {
      this.companyService.getMyProfile().subscribe({
        next: (res) => { this.profilePhoto = res.data?.logo || ''; },
        error: () => { this.profilePhoto = ''; }
      });
    } else if (user.primaryType === 'PROVIDER' || user.hasProviderProfile) {
      this.providerService.getMyProfile().subscribe({
        next: (res) => { this.profilePhoto = res.data?.logo || ''; },
        error: () => { this.profilePhoto = ''; }
      });
    }
  }

  openManu(item:string){
    this.subManu = item
  }

  toggleMenu(){
    this.toggleManu = !this.toggleManu
  }

  scroll:boolean = false

  @HostListener("window:scroll",['event'])

  onhandlerScroll(){
    if (window.scrollY > 0) {
      this.scroll = true
    }else{
      this.scroll = false
    }
  }

  searchMenu = false

  onClickedOutside(e: Event) {
    this.searchMenu = false
  }

  userMenu = false

  onClickedOutside2(e: Event) {
    this.userMenu = false
  }

  switchUserType(): void {
    if (!this.currentUser || this.switchingType) return;
    const target: 'COMPANY' | 'PROVIDER' =
      this.currentUser.primaryType === 'PROVIDER' ? 'COMPANY' : 'PROVIDER';
    this.switchingType = true;
    this.authService.updateUserType(target).subscribe({
      next: () => {
        this.switchingType = false;
        this.loadProfilePhoto(this.currentUser!);
        this.router.navigate(['/job-list-one']);
      },
      error: () => { this.switchingType = false; }
    });
  }

  logout(): void {
    this.authService.logout();
    this.profilePhoto = '';
    this.router.navigate(['/login']);
  }
}
