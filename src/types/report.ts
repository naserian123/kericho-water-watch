export type IssueType = 
  | 'leaking_pipe'
  | 'burst_pipe'
  | 'illegal_connection'
  | 'broken_meter'
  | 'other';

export interface ReportFormData {
  fullName: string;
  phone: string;
  email: string;
  issueType: IssueType;
  description: string;
  latitude: number | null;
  longitude: number | null;
  image: File | null;
}

export interface Report extends Omit<ReportFormData, 'image'> {
  id: string;
  imageUrl: string | null;
  createdAt: Date;
  status: 'pending' | 'in_progress' | 'resolved';
}

export const issueTypeLabels: Record<IssueType, string> = {
  leaking_pipe: 'Leaking Pipe',
  burst_pipe: 'Burst Pipe',
  illegal_connection: 'Illegal Connection',
  broken_meter: 'Broken Meter',
  other: 'Other Issue',
};

export const issueTypeIcons: Record<IssueType, string> = {
  leaking_pipe: '💧',
  burst_pipe: '🚿',
  illegal_connection: '⚠️',
  broken_meter: '🔧',
  other: '📋',
};
