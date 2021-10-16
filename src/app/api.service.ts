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

  saveData(arr: MockModel[]) {
    console.log('saveArr', arr);
    localStorage.setItem('mock', JSON.stringify(arr));
  }

  getData():Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

}
