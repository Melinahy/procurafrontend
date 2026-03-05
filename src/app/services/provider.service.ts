import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { ApiResponse } from '../models/user.model';

export interface ProviderProfile {
  id?: number;
  userId?: number;
  providerName: string;
  description: string;
  specialty: string;
  services: string;
  experienceYears: number | null;
  certifications?: string;
  rating?: number;
  totalReviews?: number;
  logo?: string;
  website?: string;
  address?: string;
  city: string;
  country: string;
  contactEmail: string;
  contactPhone: string;
  hourlyRate: number | null;
  isAvailable: boolean;
  brochureUrl: string;
  whatsappNumber: string;
  workersCount: number | null;
  applicationsCount?: number;
  clientsList?: string;
  associatedCompanyIds?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private apiUrl = `${environment.apiUrl}/providers`;

  constructor(private http: HttpClient) {}

  create(data: ProviderProfile): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, data);
  }

  getAll(): Observable<ApiResponse<ProviderProfile[]>> {
    return this.http.get<ApiResponse<ProviderProfile[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponse<ProviderProfile>> {
    return this.http.get<ApiResponse<ProviderProfile>>(`${this.apiUrl}/${id}`);
  }

  getMyProfile(): Observable<ApiResponse<ProviderProfile>> {
    return this.http.get<ApiResponse<ProviderProfile>>(`${this.apiUrl}/my`);
  }

  updateMyProfile(data: Partial<ProviderProfile>): Observable<ApiResponse<ProviderProfile>> {
    return this.http.put<ApiResponse<ProviderProfile>>(`${this.apiUrl}/profile`, data);
  }
}
