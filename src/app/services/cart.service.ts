
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: ProductModule[] = [];
  cartUpdated = new Subject<ProductModule[]>();


  orders: OrderModule[] = [];
  ordersUpdated = new Subject<OrderModule[]>();

  totalprice: number;
  cartPriceUpdated = new Subject<number>();



  constructor(private http: HttpClient) { }

  getAllItems() {
      this.cartUpdated.next([...this.cartItems]);
      return this.cartItems;
  }


  getTotal() {
    let total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].price) {
          total += this.cartItems[i].priceDisc * this.cartItems[i].clientItems;
     ...................................
        }
    }
  // console.log('this.totalprice =>', this.totalprice);
    return total;
  // return this.totalprice;
}

  getAllcartsUpdatedListener() {
    return this.cartUpdated.asObservable();
  }

  getTotalUpdatedListener() {
    return this.cartPriceUpdated.asObservable();
  }

  addItem(productData: ProductModule) {
    console.log('productData =>', productData);
    this.cartItems.push(productData);
    this.cartUpdated.next([...this.cartItems]);
    this.cartPriceUpdated.next( this.getTotal() );

  }


  isProductOnCart(product: ProductModule) {
    return this.cartItems.find( (producEl: ProductModule) => {
        return producEl.id === product.id;
    });
  }

  addItemsQun( product: ProductModule ) {
    product.clientItems += 1;
    this.cartPriceUpdated.next( this.getTotal() );
  }

  addRemoveQun( product: ProductModule, productID: string ) {
    product.clientItems -= 1;
    if (product.clientItems <= 0) {
      this.deleteProduct(productID);
    }
    this.cartPriceUpdated.next( this.getTotal() );
  }

  deleteProduct(productID: string) {
    // console.log(productID, ' => product id');
    const index = this.cartItems.findIndex(producs => producs.id === productID);
    // console.log(index, productID, ' Deleted Done...');
    if (index !== -1) {
        this.cartItems.splice(index, 1);
    }
    this.cartPriceUpdated.next( this.getTotal() );
  }


// ===============================================>    <========================================================


  //  save new  Order
  sendOrder( orderData: OrderModule ) {
    return this.http.post<{ newCategoryID: string, message: string }>(
      'http://localhost:3000/api/orders', orderData
      );
  }

  // after send Order empty cart from items and total price to 0
  declareCartItems() {
    length =  this.cartItems.length;
    this.cartUpdated.next( this.cartItems.splice(length) );
    this.cartUpdated.next( this.cartItems = [] );
    this.cartPriceUpdated.next( 0 );
  }


  getAllOrders() {
    this.http.get<{ message: string, orders: OrderModule[] }>('http://localhost:3000/api/orders')
    .subscribe( ordersData => {
      this.orders = ordersData.orders;
      this.ordersUpdated.next([...this.orders]);
      console.log(ordersData.message);
    });
  }


  getOrderInvoice(orderId: string) {
    console.log('http://localhost:3000/api/orders/getOrderInvoice/' + orderId);
    return this.http.get('http://localhost:3000/api/orders/getOrderInvoice/' + orderId).subscribe( );
  }



  getAllOrdersUpdatedListener() {
    return this.ordersUpdated.asObservable();
  }


  fiendOrder(orderId) {
    console.log(orderId);
  }






}
