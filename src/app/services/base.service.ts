import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export class BaseService {
    httpOptions() {
        return {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }

    handleError(error: any) {
        return throwError(error);
    }
}