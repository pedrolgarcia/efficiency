import { Task } from '../task/task.model';
import { Status } from './status.model';

export interface Project {
    id: number;
    name: string;
    description: string;
    started_at: string;
    ended_at: string;
    status_id: number;
    status: Status;
    completed_at?: string;
    deleted_at?: string;
    created_at?: string;
    updated_at?: string;
    tasks?: Task;
}
