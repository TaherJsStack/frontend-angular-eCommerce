import { WishListService } from './../services/wishList.service';
import { ProductModule } from './../modules/product.module';
import { CartService } from './../services/cart.service';
import { AuthService } from './../services/auth.service';
import { UsersService } from './../services/users.service';
import { Subscription } from 'node_modules/rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModule } from '../modules/user.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthSub: Subscription;
  isAuth = false;
  userId;
  user: UserModule;
  userSub: Subscription;

  userIdSub: Subscription;

  items: number;
  itemsSub: Subscription;

  wishes;
  wishesSub: Subscription;


  constructor( private authService: AuthService,
               private userService: UsersService,
               private cartService: CartService,
               private WLService:   WishListService
               ) {
                  this.userId = localStorage.getItem('userId');
                  this.userSub = this.userService.getDBUser(this.userId)
                  .subscribe( userData => {
                    console.log('userData =>', userData);
                    if (userData) {
                      this.isAuth = true;
                      this.user = userData.userData;
                    }
                  });
               }


  ngOnInit() {

    this.isAuthSub = this.authService.getAuthStatusListener()
        .subscribe( auth => {
          this.isAuth = auth;
          if (auth) {
            this.userId = localStorage.getItem('userId');
            this.userSub = this.userService.getDBUser(this.userId)
            .subscribe( userData => {
              // console.log('userData =>', userData);
              this.user = userData.userData;
            });
          }
        });

    this.userIdSub = this.authService.getUserIdListener().subscribe( userId => this.userId = userId);

    this.cartService.getAllItems();
    this.itemsSub = this.cartService.getAllcartsUpdatedListener()
      .subscribe( cartitems => {
          this.items = cartitems.length;
        });

    this.wishes = this.WLService.getAllWishItems();
    this.wishesSub = this.WLService.getAllWishesUpdatedListener()
      .subscribe( cartitems => {
          this.wishes = cartitems.length;
        });

  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
    this.itemsSub.unsubscribe();
    this.wishesSub.unsubscribe();
    this.userIdSub.unsubscribe();
  }

}
