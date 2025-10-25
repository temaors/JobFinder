const API_BASE_URL = '/api';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  workerId: string;
  workerName: string;
  createdAt: string;
  status: 'Available' | 'Unavailable' | 'Paused';
  category: 'Cleaning' | 'Repair' | 'Delivery' | 'Gardening' | 'PetCare' | 'Tutoring' | 'Photography' | 'Beauty' | 'Other';
  location?: string;
  isRemote: boolean;
  rating: number;
  completedOrders: number;
}

export interface CreateServiceRequest {
  title: string;
  description: string;
  price: number;
  category: 'Cleaning' | 'Repair' | 'Delivery' | 'Gardening' | 'PetCare' | 'Tutoring' | 'Photography' | 'Beauty' | 'Other';
  location?: string;
  isRemote: boolean;
}

export interface UpdateServiceRequest {
  title: string;
  description: string;
  price: number;
  status: 'Available' | 'Unavailable' | 'Paused';
  category: 'Cleaning' | 'Repair' | 'Delivery' | 'Gardening' | 'PetCare' | 'Tutoring' | 'Photography' | 'Beauty' | 'Other';
  location?: string;
  isRemote: boolean;
}

export interface Order {
  id: string;
  serviceId: string;
  serviceTitle: string;
  customerId: string;
  customerName: string;
  createdAt: string;
  scheduledDate?: string;
  completedAt?: string;
  status: 'Pending' | 'Confirmed' | 'InProgress' | 'Completed' | 'Cancelled' | 'Rejected';
  customerNotes?: string;
  workerNotes?: string;
  totalPrice: number;
  address?: string;
  contactPhone?: string;
}

export interface CreateOrderRequest {
  serviceId: string;
  scheduledDate?: string;
  customerNotes?: string;
  address?: string;
  contactPhone?: string;
}

class ServicesApi {
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

  async getAllServices(): Promise<Service[]> {
    return this.request<Service[]>('/services');
  }

  async getServiceById(id: string): Promise<Service> {
    return this.request<Service>(`/services/${id}`);
  }

  async createService(service: CreateServiceRequest): Promise<Service> {
    return this.request<Service>('/services', {
      method: 'POST',
      body: JSON.stringify(service),
    });
  }

  async updateService(id: string, service: UpdateServiceRequest): Promise<void> {
    return this.request<void>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    });
  }

  async deleteService(id: string): Promise<void> {
    return this.request<void>(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  async getAllOrders(): Promise<Order[]> {
    return this.request<Order[]>('/orders');
  }

  async getOrderById(id: string): Promise<Order> {
    return this.request<Order>(`/orders/${id}`);
  }

  async createOrder(order: CreateOrderRequest): Promise<Order> {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }
}

export const servicesApi = new ServicesApi(); 