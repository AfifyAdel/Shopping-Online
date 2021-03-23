import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { ConfigService } from 'src/app/domain/helpers/config.service';
import { Category } from 'src/app/domain/models/category';
import { Discount } from 'src/app/domain/models/discount';
import { Item } from 'src/app/domain/models/item';
import { Tax } from 'src/app/domain/models/tax';
import { UnitOfMeasure } from 'src/app/domain/models/unitOfMeasure';
import { CategoryService } from 'src/app/domain/services/category.service';
import { DiscountService } from 'src/app/domain/services/discount.service';
import { ItemService } from 'src/app/domain/services/item.service';
import { TaxService } from 'src/app/domain/services/tax.service';
import { UnitofmeasureService } from 'src/app/domain/services/unitofmeasure.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  addProductForm: FormGroup;
  submitted: boolean = false;
  formData: FormData;
  profileFile: any;
  defaultImage: string = "assets/default-product.jpg";
  imgURL: any;
  taxes: Tax[] = new Array<Tax>();
  categories: Category[] = [];
  discounts: Discount[] = new Array<Discount>();
  uoms: UnitOfMeasure[] = new Array<UnitOfMeasure>();
  editMode: boolean = false;
  editItemId: number = 0;
  constructor(private _formBuilder: FormBuilder,
    private _router: Router,
    private _itemsService: ItemService,
    private _categoryService: CategoryService,
    private _uomService: UnitofmeasureService,
    private _discountService: DiscountService,
    private _taxService: TaxService,
    private SpinnerService: NgxSpinnerService,
    private activeRoute: ActivatedRoute,
    private config: ConfigService) {
    this.imgURL = this.defaultImage;
    this.createForm();
  }
  async ngOnInit() {
    this.getProduct();
  }
  getProduct() {
    this.activeRoute.paramMap.subscribe(param => {

      var id = param.get('id');
      if (id != null) {
        this.editMode = true;
        this.editItemId = Number(id);
        this._itemsService.getItemById(Number(id)).subscribe(responce => {
          if (responce.resource && responce.status == Responsestatus.success) {
            var it: Item = responce.resource;
            this.addProductForm.patchValue({
              name: it.name,
              quantity: it.quantity,
              price: it.price,
              description: it.description,
              uom: it.uom,
              taxcode: it.taxId,
              discountcode: it.discountId,
              attributes: it.attributes,
              category: it.category
            });
            debugger;
            if (it.imagePath) {
              this.imgURL = this.getImagePath(it.imagePath);
              this.profileFile = it.imagePath;
            }
          } else if (responce.status == Responsestatus.error) {
            alert(responce.message);
          } else alert("Server Error");
        });
      }
    })
  }
  getImagePath(path) {
    debugger;
    return (path == null || path == "" || path == "undefined") ? "assets/default-product.jpg" : this.config.imagePath + 'ItemsImages/' + path;
  }
  async createForm() {
    this.SpinnerService.show();
    this.addProductForm = this._formBuilder.group(
      {
        name: new FormControl("", Validators.required),
        quantity: new FormControl(0, Validators.required),
        category: new FormControl("", Validators.required),
        price: new FormControl(0, Validators.required),
        description: new FormControl("", Validators.required),
        uom: new FormControl("", Validators.required),
        taxcode: new FormControl(1),
        discountcode: new FormControl(1),
        attributes: new FormControl(""),
      }
    );
    await this.getCategories();
    await this.getTaxes();
    await this.getUOMs();
    await this.getDiscounts();
    this.SpinnerService.hide();
  }
  async getCategories() {

    this.SpinnerService.show();
    this._categoryService.getCategories().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.categories = responce.resource;
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
      this.SpinnerService.hide();
    });
  }
  async getTaxes() {
    this._taxService.getTaxes().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.taxes = responce.resource;
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
    });
  }
  async getUOMs() {
    this._uomService.getUOMs().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.uoms = responce.resource;
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
    });
  }
  async getDiscounts() {
    this._discountService.getDiscounts().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.discounts = responce.resource;
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
    });
  }
  get formControls() {
    return this.addProductForm.controls;
  }


  getImageFile(file: any) {
    if (!(!!file))
      return;
    this.profileFile = file[0];

    var ext = this.profileFile.name.substring(
      this.profileFile.name.lastIndexOf(".") + 1
    );
    if (
      ext.toLowerCase() != "png" &&
      ext.toLowerCase() != "jpg" &&
      ext.toLowerCase() != "jpeg"
    ) {
      this.profileFile = null;
      alert("Please upload a valid image");
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.profileFile);
    reader.onload = _event => {
      this.imgURL = reader.result;
    };
  }
  deleteImage() {
    this.profileFile = '';
    // this.imageChanged = true;
    $('#btnUploadEdit').val('');
    this.imgURL = this.defaultImage;
  }


  addProductSubmit() {

    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    }
    var controls = this.addProductForm.value;

    this.formData = new FormData();
    this.formData.append("name", controls.name.toString());
    this.formData.append("quantity", controls.quantity.toString());
    this.formData.append("price", controls.price.toString());
    this.formData.append("discountid", controls.discountcode.toString());
    this.formData.append("imageUrl", this.profileFile);
    this.formData.append("description", controls.description.toString());
    this.formData.append("taxid", controls.taxcode.toString());
    this.formData.append("uom", controls.uom.toString());
    this.formData.append("category", controls.category.toString());
    this.formData.append("attributes", controls.attributes.toString());
    if (this.editMode) {
      this.formData.append("id", this.editItemId.toString());
      this._itemsService.updateItem(this.formData).subscribe(responce => {
        if (responce.resource && responce.status == Responsestatus.success) {
          this.navigateToProducts();
        } else if (responce.status == Responsestatus.error) {
          alert(responce.message);
        } else alert("Server Error");
      });
    }
    else {
      this._itemsService.addItem(this.formData).subscribe(responce => {
        if (responce.resource && responce.status == Responsestatus.success) {
          this.navigateToProducts();
        } else if (responce.status == Responsestatus.error) {
          alert(responce.message);
        } else alert("Server Error");
      });
    }
  }
  navigateToProducts() {
    this._router.navigate(["/admin/products"]);
  }


}
