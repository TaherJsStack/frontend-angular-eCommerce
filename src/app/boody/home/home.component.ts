import { WishListService } from './../../services/wishList.service';
import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModule } from 'src/app/modules/product.module';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  filterdProducts: ProductModule[];
  produSub:  Subscription;
  products:  ProductModule[]  = [];
  caregory:  string;

  totalPosts;
  postsPerPage;
  currentPage;

  date = new Date();


  constructor(
    private cateService:  CategoriesService,
    private proService:   ProductService,
    private route:        ActivatedRoute,
    private cartService:  CartService,
    private WLService:    WishListService
  ) { }

  ngOnInit() {
    // get All products in products
    this.proService.getAllProducts(this.postsPerPage, this.currentPage);
    this.produSub = this.proService.getAllProductsUpdatedListener()
    .subscribe(
    (productData: {products: ProductModule[], proCount: number} ) => {
      this.totalPosts = productData.proCount;
      this.filterdProducts   = this.products  = productData.products;
      this.route.queryParamMap
        .subscribe(
          (params: Params) => {
            this.caregory = params.get('caregory');
            // console.log('category =>', this.caregory,);
            this.filterdProducts = (this.caregory) ?
            this.products.filter(p => p.category === this.caregory) :
            this.products;
          });
    });
    // console.log(' this.filterdProducts =>',  this.filterdProducts );


  }

  onAddToCart( product: ProductModule ) {
    this.cartService.addItem( product );
  }

  onAddToWishList( product: ProductModule ) {
    console.log('product wish', product);
    this.WLService.addWish( product );
  }

  // is product on cart
  // to show or hide button
  isBought(product: ProductModule) {
    return this.cartService.isProductOnCart(product);
  }

  isWishOnList( product: ProductModule) {
    return this.WLService.isWishOnList(product);
  }

  // // add more Quantity of item
  // onPlus(product: ProductModule) {
  //   product.clientItems += 1;
  // }


  // delete only item from Quantity of item
  // if no  Quantity Delete item
  onRemove(product, productID) {
    product.clientItems -= 1;
    if ( product.clientItems <= 0 ) {
      this.cartService.deleteProduct(productID);
    }
  }


  ngOnDestroy() {
    this.produSub.unsubscribe();
  }

}
