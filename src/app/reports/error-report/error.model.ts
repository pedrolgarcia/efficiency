import { ErrorType } from './error-type.model';

export interface Error {
    id: number;
    ocurrences: number;
    error_type_id: number;
    attempts_solve: number;
    discovery_at: string;
    removed_at: string;
    description: string;
    error_report_id: number;
    error_type: ErrorType;
}
