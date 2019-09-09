import { ProductModule } from './../../modules/product.module';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  wishes: ProductModule[];
  wishesSub: Subscription;

  constructor(private WLService: WishListService, private cartService: CartService ) { }

  ngOnInit() {
    this.wishes = this.WLService.getAllWishItems();
    this.wishesSub = this.WLService.getAllWishesUpdatedListener()
      .subscribe( cartitems => {
          this.wishes = cartitems;
          console.log( 'get All wishes => ', this.wishes);
        });
    console.log( 'get All wishes => ', this.wishes);
  }

  onAddToCart( product: ProductModule ) {
    this.cartService.addItem( product );
  }

  // is product on cart
  // to show or hide button
  isBought(product: ProductModule) {
    return this.cartService.isProductOnCart(product);
  }

  
  // delete only item from Quantity of item
  // if no  Quantity Delete item
  onRemove(product, productID) {
    product.clientItems -= 1;
    if ( product.clientItems <= 0 ) {
      this.cartService.deleteProduct(productID);
    }
  }

  onRemoveWish( product: string) {
    this.WLService.deleteWish(product);
  }
  
}
