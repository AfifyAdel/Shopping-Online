export class Apis {

  static domainName = 'https://localhost:44329/';

  //Account
  static login = Apis.domainName + 'api/Account/Login';
  static register = Apis.domainName + 'api/Account/Register';


  //UOM
  static getUOMs = Apis.domainName + 'api/UOM/GetUOMs';
  static getUOMByCode = Apis.domainName + 'api/UOM/GetUOMByCode/';
  static addUOM = Apis.domainName + 'api/UOM/AddUOM';
  static deleteUOM = Apis.domainName + 'api/UOM/DeleteUOM';


  //Tax
  static getTaxes = Apis.domainName + 'api/Tax/GetTaxes';
  static getTaxByCode = Apis.domainName + 'api/Tax/GetTaxByCode/';
  static addTax = Apis.domainName + 'api/Tax/AddTax';
  static deleteTax = Apis.domainName + 'api/Tax/DeleteTax';


  //Discount
  static getDiscounts = Apis.domainName + 'api/Discount/GetDiscounts';
  static getDiscountByCode = Apis.domainName + 'api/Discount/GetDiscountByCode/';
  static addDiscount = Apis.domainName + 'api/Discount/AddDiscount';
  static deleteDiscount = Apis.domainName + 'api/Discount/DeleteDiscount';


  //Order
  static getOrders = Apis.domainName + 'api/Order/GetOrders';
  static getOrderItems = Apis.domainName + 'api/Order/GetOrderItems/';
  static getCustomerOrders = Apis.domainName + 'api/Order/GetCustomerOrders/';
  static changeStatus = Apis.domainName + 'api/Order/ChangeStatus';
  static addOrder = Apis.domainName + 'api/Order/Insert';


  //Item
  static getItems = Apis.domainName + 'api/Items/GetItems';
  static addItem = Apis.domainName + 'api/Items/AddItem';
  static updateItem = Apis.domainName + 'api/Items/UpdateItem';
  static deleteItem = Apis.domainName + 'api/Items/DeleteItem';

}
