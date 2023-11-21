export interface TasksModel {
    task_name: string;
    description: string;
    start_date: string;
    due_date: string;
    points: number;
    status: boolean;
    completed_date: string;
    user_id: number;
    approved: boolean;
    priority: number;
    task_id: number;
    created_at: any
  }