
const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

export interface Producer {
  id: number;
  name: string;
  domain: string;
  firebaseWebAppId: string;
  status: string;
  logo: string;
  phone: string;
  instagram: string;
  createdAt: string;
  updatedAt: string;
  events: Array<{
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    status: string;
    folder: boolean;
    alias: string;
    logo: string;
    createdAt: string;
    updatedAt: string;
    prevents: Array<{
      id: number;
      name: string;
      price: string;
      quantity: number;
      status: string;
      startDate: string;
      endDate: string;
      createdAt: string;
      updatedAt: string;
    }>;
  }>;
  email: {
    id: number;
    email: string;
    key: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export enum ClientTypeEnum {
  REGULAR = 'REGULAR',
  VIP = 'VIP'
}

export async function fetchProducerData(): Promise<ApiResponse<Producer>> {
  try {
    const response = await fetch(`${API_URL}/producer/domain`);
    if (!response.ok) {
      throw new Error("Failed to fetch producer data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching producer data:", error);
    throw error;
  }
}

export async function submitTicketForm(formData: FormData, eventId: number): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_URL}/client/create/${eventId}?type=${ClientTypeEnum.REGULAR}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to submit ticket form");
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting ticket form:", error);
    return { success: false };
  }
}
