import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {MockModel} from "./mock.model";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class ApiService {
  readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getData():Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  saveData(arr: MockModel[]) {
    localStorage.setItem('mock', JSON.stringify(arr));
    return this.httpClient.post(this.apiUrl, arr);
  }

}
