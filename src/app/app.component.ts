import { Component } from '@angular/core';
import { ProductServiceService } from './services/product-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'products';
  products: any[] = [];
  recordForm: FormGroup;
  constructor(private service: ProductServiceService, private fb: FormBuilder) {
    this.getAllProducts();
    this.recordForm = this.fb.group({
      sku: '',
      name: '',
      price: ''
    });
  }

  addRecord(form: any) {
    console.log('form values', form.value);
    this.service.addProduct(form.value);
    // this.router.navigate(['/']);
  }

  clearForm() {
    this.recordForm.reset();
  }

  getAllProducts():Object {
    this.service.getProducts().subscribe((data: any) => {
      this.products.push(...data);
    });
    return this.products;
  }

  openModal() {
    let modal = document.getElementById('myModal');
    if(modal != null) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    let modal = document.getElementById('myModal');
    if(modal != null) {
      modal.style.display = 'none';
    }
  }

  updateRecord(index: any) {
    
  }

  deleteRecord(index: any) {

  }
}
