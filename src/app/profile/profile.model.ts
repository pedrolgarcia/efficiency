export interface Profile {
    id: number;
    name: string;
    email: string;
    totalProjects?: number;
    totalTasks?: number;
    overdueTasks?: number;
    email_verified_at?: string;
    password?: string;
    avatar?: string;
    created_at?: string;
    updated_at?: string;
}
