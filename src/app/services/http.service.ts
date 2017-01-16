import {Http, Response, Headers} from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class HTTPService {

  private url = "http://194.135.90.112:3001/api";

  constructor(private http: Http) {}

  get(api: string) {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type')
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(this.url + api, {headers: headers})
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
  }

  post(api: string, params) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post(this.url + api, params)
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
  }

  remove(api: string) {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type')
    headers.append('Access-Control-Allow-Methods', 'UPDATE');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.delete(this.url + api)
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
  }
}
