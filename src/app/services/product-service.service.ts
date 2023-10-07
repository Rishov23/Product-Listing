import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  constructor(private http: HttpClient) { 
    
  }
  getProducts() {
    return this.http.get(URL.getAllProducts);
  }
  addProduct(body: any) {
    console.log(body);
    this.http.post(URL.addProduct, body);
    // return this.getProducts();
  }
}
