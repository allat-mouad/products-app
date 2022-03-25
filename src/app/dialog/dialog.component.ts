import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  freshnessList=["brand new","seconde hand","refurbished"]
  productForm !: FormGroup;

  constructor(private  FormBuilder:FormBuilder,private api : ApiService,private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm= this.FormBuilder.group({
      productName :['',Validators.required],
      category :['',Validators.required],
      freshness :['',Validators.required],
      price :['',Validators.required],
      comment :['',Validators.required],
      date :['',Validators.required]
    })
  }
  addProduct() {
   if(this.productForm.valid){
     this.api.postProduct(this.productForm.value)
       .subscribe({
         next:(res)=>{
           alert("product added successfully");
           this.productForm.reset();
           this.dialogRef.close();
         },
         error:()=>{
           alert("something went wrong")

         }
       })
   }
  }


}
