import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  readURL = "http://127.0.0.1:8000/api"; 
  addURL = "http://127.0.0.1:8000/api/add"; 
  deleteURL = "http://127.0.0.1:8000/api/delete"; 
  updateURL = "http://127.0.0.1:8000/api/edit"; 
  
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
