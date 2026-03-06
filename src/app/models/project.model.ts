interface Project {
  id?: number;
  title: string;
  description: string;
  category: string; // CONSTRUCTION | MINING | AGROINDUSTRY | OTHER
  budgetMin: number | null;
  budgetMax: number | null;
  location: string;
  deadline: string;
  status?: string; // DRAFT | OPEN | CLOSED | IN_PROGRESS | COMPLETED
  requirements?: string;
  attachmentUrl?: string;
  logo?: string;
  createdAt?: string;
  companyId?: number;
  companyName?: string;
  specialty?: string;
}

interface ProjectResponse {
  success: boolean;
  message: string;
  data: Project[];
}

interface Bid {
  id?: number;
  projectId?: number;
  projectTitle?: string;
  providerId?: number;
  providerName?: string;
  providerSpecialty?: string;
  amount: number | null;
  proposal: string;
  estimatedDays: number | null;
  status?: string; // PENDING | ACCEPTED | REJECTED | WITHDRAWN
  createdAt?: string;
}

interface BidResponse {
  success: boolean;
  message: string;
  data: Bid[];
}

export type { Project, ProjectResponse, Bid, BidResponse };
