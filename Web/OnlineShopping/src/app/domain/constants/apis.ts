import { ConfigService } from "../helpers/config.service";

export class Apis {

  domainName: any;
  constructor(private env: ConfigService) {
    this.domainName = this.env.apiUrl;
  }

  //Account
  static login = 'api/Account/Login';
  static register = 'api/Account/Register';


  //UOM
  static getUOMs = 'api/UOM/GetUOMs';
  static getUOMByCode = 'api/UOM/GetUOMByCode/';
  static addUOM = 'api/UOM/AddUOM';
  static deleteUOM = 'api/UOM/DeleteUOM';


  //Tax
  static getTaxes = 'api/Tax/GetTaxes';
  static getTaxByCode = 'api/Tax/GetTaxByCode/';
  static addTax = 'api/Tax/AddTax';
  static deleteTax = 'api/Tax/DeleteTax';

  //Category
  static getCategories = 'api/Category/GetCategories';
  static getCategoryByName = 'api/Category/GetCategoryByName/';
  static addCategory = 'api/Category/AddCategory';
  static deleteCategory = 'api/Category/DeleteCategory';

  //Discount
  static getDiscounts = 'api/Discount/GetDiscounts';
  static getDiscountByCode = 'api/Discount/GetDiscountByCode/';
  static addDiscount = 'api/Discount/AddDiscount';
  static deleteDiscount = 'api/Discount/DeleteDiscount';


  //Order
  static getOrders = 'api/Order/GetOrders';
  static getOrderItems = 'api/Order/GetOrderItems/';
  static getCustomerOrders = 'api/Order/GetCustomerOrders/';
  static changeStatus = 'api/Order/ChangeStatus';
  static addOrder = 'api/Order/Insert';
  static updateOrder = 'api/Order/Update';


  //Item
  static getItems = 'api/Items/GetItems';
  static addItem = 'api/Items/AddItem';
  static updateItem = 'api/Items/UpdateItem';
  static deleteItem = 'api/Items/DeleteItem';
  static getItemById = 'api/Items/GetItemById/';
}
