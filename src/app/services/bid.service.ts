import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Bid, BidResponse } from '../models/project.model';
import { ApiResponse } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class BidService {
  private apiUrl = `${environment.apiUrl}/bids`;

  constructor(private http: HttpClient) {}

  /** Proveedor: mis ofertas enviadas */
  getMyBids(): Observable<BidResponse> {
    return this.http.get<BidResponse>(this.apiUrl);
  }

  /** Empresa: ofertas recibidas para un proyecto */
  getBidsByProject(projectId: number): Observable<BidResponse> {
    return this.http.get<BidResponse>(`${this.apiUrl}/project/${projectId}`);
  }

  getById(id: number): Observable<ApiResponse<Bid>> {
    return this.http.get<ApiResponse<Bid>>(`${this.apiUrl}/${id}`);
  }

  /** Proveedor: crear oferta */
  create(data: Bid): Observable<ApiResponse<Bid>> {
    return this.http.post<ApiResponse<Bid>>(this.apiUrl, data);
  }

  /** Proveedor: retirar oferta */
  withdraw(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  /** Empresa: rechazar oferta */
  reject(id: number): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/${id}/reject`, {});
  }

  /** Empresa: aceptar oferta */
  accept(id: number): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/${id}/accept`, {});
  }
}
