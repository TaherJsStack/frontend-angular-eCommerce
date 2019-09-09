import { CartService } from './../../services/cart.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModule } from 'src/app/modules/product.module';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { WishListService } from 'src/app/services/wishList.service';
import { CategoryModule } from 'src/app/modules/category.module';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {



  cateSubs: Subscription;
  produSub: Subscription;
  usersSub: Subscription;

  categories;
  caregory:  string;
  products:  ProductModule[]  = [];
  product;
  filterdProducts: ProductModule[];


  totalPosts;
  postsPerPage;
  currentPage;

  date = new Date();

  totalProducts = 0;
  proPerPage = 5;
  proCurrentPage = 1;
  proPageSizeOptions = [1, 2, 25, 30];

  ClassMode;

  constructor(
    private cateService:  CategoriesService,
    private proService:   ProductService,
    private route:        ActivatedRoute,
    private cartService:  CartService,
    private WLService:    WishListService
  ) { }

  ngOnInit() {

    // get categories to know lenght
    this.cateService.getAllCates(this.proPerPage, this.currentPage);
    this.cateService.getAllCatesUpdatedListener()
    .subscribe((categoryData: {categories: CategoryModule[], cateCount: number}) => {
      this.totalProducts = categoryData.cateCount;
      this.categories = categoryData.categories;

    });

    // get All products in productsM
    this.proService.getAllProducts(this.proPerPage, this.currentPage);
    this.produSub = this.proService.getAllProductsUpdatedListener()
    .subscribe( (productData: {products: ProductModule[], proCount: number} ) => {
      this.totalProducts = productData.proCount;
      this.filterdProducts   = this.products  = productData.products;
      this.route.queryParamMap
        .subscribe(
          (params: Params) => {
            this.caregory = params.get('caregory');
            // console.log('category =>', this.caregory,);
            this.filterdProducts = (this.caregory) ?
            this.products.filter(p => p.category === this.caregory) :
            this.products.sort( p => p.price);
          });
    });
  }


  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    console.log('value =>', value );
    return value;
  }

 // mat paginator
  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.proCurrentPage =  pageData.pageIndex + 1;
    this.proPerPage =      pageData.pageSize;
    this.proService.getAllProducts(this.proPerPage, this.proCurrentPage);
  }


  oncha(event) {
    console.log('event =>', event.target.value);
    this.proPerPage =  event.target.value;
    this.proService.getAllProducts(this.proPerPage, this.proCurrentPage);
  }


  productViewMode(r) {
    console.log('r', r);
    this.ClassMode = r;
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
