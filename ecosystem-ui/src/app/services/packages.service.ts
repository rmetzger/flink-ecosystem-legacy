import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

interface Votes {
  username: string;
  repo: string;
}

export interface Package {
  id: number;
  name: string;
  description: string;
  image: string;
  website: string;
  repository: string;
  license: string;
  upvotes: Array<Votes>;
  downvotes: Array<Votes>;
  tags: Array<string>;
  added: string;
}

interface PackageList {
  items: Array<Package>;
}

@Injectable({ providedIn: "root" })
export class PackagesService {
  constructor(protected http: HttpClient) {}

  getPackages(): Observable<PackageList> {
    return this.http.get<PackageList>("http://localhost:3000/api/v1/packages");
  }
}
