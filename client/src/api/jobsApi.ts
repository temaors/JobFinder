const API_BASE_URL = '/api';

export interface Job {
  id: string;
  title: string;
  description: string;
  price: number;
  workerId: string;
  workerName: string;
  createdAt: string;
  status: 'Active' | 'InProgress' | 'Completed' | 'Cancelled';
  type: 'FullTime' | 'PartTime' | 'Contract' | 'Freelance';
  location?: string;
  isRemote: boolean;
}

export interface CreateJobRequest {
  title: string;
  description: string;
  price: number;
  type: 'FullTime' | 'PartTime' | 'Contract' | 'Freelance';
  location?: string;
  isRemote: boolean;
}

export interface UpdateJobRequest {
  title: string;
  description: string;
  price: number;
  status: 'Active' | 'InProgress' | 'Completed' | 'Cancelled';
  type: 'FullTime' | 'PartTime' | 'Contract' | 'Freelance';
  location?: string;
  isRemote: boolean;
}

class JobsApi {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('API Request URL:', url);
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API Response data:', data);
    return data;
  }

  async getAllJobs(): Promise<Job[]> {
    return this.request<Job[]>('/test/jobs');
  }

  async getJobById(id: string): Promise<Job> {
    return this.request<Job>(`/${id}`);
  }

  async createJob(job: CreateJobRequest): Promise<Job> {
    return this.request<Job>('', {
      method: 'POST',
      body: JSON.stringify(job),
    });
  }

  async updateJob(id: string, job: UpdateJobRequest): Promise<void> {
    return this.request<void>(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(job),
    });
  }

  async deleteJob(id: string): Promise<void> {
    return this.request<void>(`/${id}`, {
      method: 'DELETE',
    });
  }
}

export const jobsApi = new JobsApi(); 