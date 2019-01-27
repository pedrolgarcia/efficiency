import { Annotation } from './annotations/annotation.model';
import { TimeReport } from './time-report/time-report.model';
import { ErrorReport } from './error-report/error-report.model';

export interface Report {
    id: number;
    task_id: number;
    deleted_at: string;
    created_at: string;
    updated_at: string;
    annotation?: Annotation;
    time_report?: TimeReport;
    error_report?: ErrorReport;
}
