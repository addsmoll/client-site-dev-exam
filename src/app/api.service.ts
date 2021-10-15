import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {MockModel} from "./mock.model";

@Injectable({providedIn: "root"})
export class ApiService {
  readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getData(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  saveData(arr: MockModel[]): Observable<any> {
    console.log('mail', JSON.stringify(arr));
    return this.httpClient.put(this.apiUrl, JSON.stringify(arr));
  }

}
