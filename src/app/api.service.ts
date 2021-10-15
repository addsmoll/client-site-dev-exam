import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({providedIn: "root"})
export class ApiService {
  readonly url = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  getData(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  saveData(model: any): Observable<any> {
    return this.httpClient.post(this.url, model);
  }

  deleteData(): Observable<any> {
    return this.httpClient.delete(this.url);
  }

}
