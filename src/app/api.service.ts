import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({providedIn: "root"})
export class ApiService {
  readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getData(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  saveData(arr: any): Observable<any> {
    console.log('mail', JSON.stringify({result: arr}));
    return this.httpClient.post(this.apiUrl, JSON.stringify({result: arr}));
  }

  deleteData(): Observable<any> {
    return this.httpClient.delete(this.apiUrl);
  }

}
