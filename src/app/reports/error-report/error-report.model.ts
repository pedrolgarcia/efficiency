import { Error } from './error.model';

export interface ErrorReport {
    id: number;
    report_id: number;
    errors: Error[];
}
