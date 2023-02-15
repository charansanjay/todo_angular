export interface Task {
  id?: number;
  title: string;
  status: 'New' | 'Ongoing' | 'Canceled' | 'Completed';
  created: Date;
  updated?: Date;
}