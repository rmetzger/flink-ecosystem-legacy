import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { PackageList } from "../interfaces/package";

@Injectable({ providedIn: "root" })
export class PackagesService {
  constructor(protected http: HttpClient) {}

  getPackages(): Observable<PackageList> {
    return this.http.get<PackageList>("http://localhost:3000/api/v1/packages");
  }
}
