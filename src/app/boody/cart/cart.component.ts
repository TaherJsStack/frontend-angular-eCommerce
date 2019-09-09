import { UsersService } from './../../services/users.service';
import { OrderModule } from './../../modules/order.module';
import { ProductModule } from './../../modules/product.module';
import { CartService } from './../../services/cart.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {


  items;
  total: number;

  itemsSub: Subscription;
  totalSub: Subscription;
  orderDone = false;

  constructor( .............. ) { }

  ngOnInit() {
    this.items = this.cartService.getAllItems();
    this.itemsSub = this.cartService.getAllcartsUpdatedListener()
      .subscribe( cartitems => {
          this.items = cartitems.length;
        });

    this.total = this.cartService.getTotal();
    this.totalSub =  ......................()
    .subscribe( total => {
      console.log('totla -> ', total);
      return this.total = total;
    });

  }

  // is product on cart
  // to show or hide button
  isBought(product: ProductModule) {
    return this.cartService.isProductOnCart(product);
  }

  // add more Quantity of item
  onPlus(product: ProductModule) {

  }

  // delete only item from Quantity of item
  // if no  Quantity Delete item
  onRemove(product, productID) {
    product.clientItems -= 1;
    if ( product.clientItems <= 0 ) {
      this.cartService.deleteProduct(productID);
      product.clientItems = 1 ;
    }
    this.total = this.cartService.getTotal();
  }


  onSendorder() {
    const orderInfo = {
        creatorId:   ' ',
        creatorName: ' ',
        products:    this.cartService.getAllItems(),
        active:      false,
        addedDate:   new Date(),
        totalPrice:  this.total
     };
    console.log('orderInfo =>', orderInfo);
    this.cartService.sendOrder(orderInfo)
    .subscribe( async r => {
      console.log(r);
      const userId = localStorage.getItem('userId');
      this.userService.getAllUserOrders(userId);
      await setTimeout( () => {
        this.orderDone = false;
        }, 3000);
      // this.router.navigate(['/']);
      this.orderDone = true;
      this.cartService.declareCartItems();
      this.total = 0;
    },
    // tslint:disable-next-line:no-unused-expression
    err => console.log('err ::===>', err.error.message)
    );
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }

}
