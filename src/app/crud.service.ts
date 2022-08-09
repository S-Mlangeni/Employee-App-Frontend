import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  readURL = "https://employee-app-server1.herokuapp.com/api"; //"http://127.0.0.1:8000/api"; 
  addURL = "https://employee-app-server1.herokuapp.com/api/add"; //"http://127.0.0.1:8000/api/add"; 
  deleteURL = "https://employee-app-server1.herokuapp.com/api/delete";//"http://127.0.0.1:8000/api/delete"; 
  updateURL = "https://employee-app-server1.herokuapp.com/api/edit";//"http://127.0.0.1:8000/api/edit"; 
  
  constructor(private http: HttpClient) { }

  read() {
    return this.http.get(this.readURL);
  }

  add(add_Data: any) {
    return this.http.post(this.addURL, add_Data);
  }

  delete(delete_Data: any) {
    return this.http.post(this.deleteURL, delete_Data);
  }

  update(update_Data: any) {
    return this.http.post(this.updateURL, update_Data);
  }
}
