import {Injectable} from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  readonly mockUrl = environment.mockUrl;
  readonly apiUrl = environment.apiUrl;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.method);
    request = request.clone({
      url: request.url === this.apiUrl ? this.mockUrl : request.url
    });

    if (request.method === 'POST') {
      localStorage.setItem('mock', JSON.stringify(request.body));
    }
    return next.handle(request)
  }

}
