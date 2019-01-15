import { Status } from '../project/status.model';
import { Category } from './category';

export interface Task {
    id: number;
    name: string;
    description: string;
    started_at: string;
    ended_at: string;
    category: Category;
    project_id: number;
    status: Status;
    completed_at?: string;
    time?: string;
    deleted_at?: string;
    created_at?: string;
    updated_at?: string;
}
