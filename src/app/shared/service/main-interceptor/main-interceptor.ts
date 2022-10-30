import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const header = {
            'method': req.method,
            'apikey': environment.secretKey,
            'redirect': 'follow'
        }
        const modified = req.clone({setHeaders: header});
        return next.handle(modified);
    }
}
