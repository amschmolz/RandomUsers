import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http:Http) { }

  getUsers(i){
    return this.http.get(`https://randomuser.me/api?inc=name,gender,dob,location,picture&results=${i}`);
  }

}
