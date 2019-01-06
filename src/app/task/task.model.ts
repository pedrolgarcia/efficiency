export interface Task {
    id: number;
    name: string;
    description: string;
    started_at: string;
    ended_at: string;
    category: string;
    project: string;
    status: string;
    completed_at?: string;
    time?: string;
    deleted_at?: string;
    created_at?: string;
    updated_at?: string;
}
