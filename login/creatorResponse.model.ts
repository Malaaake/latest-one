export interface CreatorResponse {
    id: number;
    fullname: string;
    email: string;
    photoUrl?: string;
    roles?: string[];  // Add this line
    active?: boolean; // Add this line
  }