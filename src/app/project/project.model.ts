import { Task } from '../task/task.model';

export interface Project {
    id: number;
    name: string;
    started_at: string;
    ended_at: string;
    status: string;
    completed_at?: string;
    deleted_at?: string;
    created_at?: string;
    updated_at?: string;
    tasks?: Task;
}
