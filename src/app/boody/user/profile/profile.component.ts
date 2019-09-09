import { CartService } from './../../../services/cart.service';
import { UserModule } from './../../../modules/user.module';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { OrderModule } from 'src/app/modules/order.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {


  private authStatusListener = new Subject<boolean>();

  private authListenerSubs: Subscription;
  isAuth = false;
  user: UserModule;
  userSub: Subscription;

  orders: OrderModule[];
  ordersInfo: OrderModule;

  constructor(  private authService: AuthService,
                private userService: UsersService,
                private cartService: CartService) {
                  const token = localStorage.getItem('token');
                  const userId = localStorage.getItem('userId');
                  this.userService.getDBUser(userId)
                  .subscribe( userData => {
                    console.log('userData =>', userData);
                    this.user = userData.userData;
                    this.authStatusListener.next(true);
                    // this.userInfo.next(userData.userData);
                  });

                  this.userService.getAllUserOrders(userId)
                    .subscribe( orders => {
                      console.log('user msg =>', orders.message);
                      console.log('user orderInfo =>', orders.orderInfo);
                      console.log('user orders =>', orders.orders);
                      this.ordersInfo = orders.orderInfo;
                      this.orders = orders.orders;
                    });

  }

  ngOnInit() {
  }

  // to make every component in app know user status true or false
  // 1=> private authStatusListener = new Subject<boolean>();
  // 2=> return this.authStatusListener.asObservable();
  // 3=> this.authStatusListener.next(true);
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  onGetOrderInvoice(orderId) {
    console.log('orderId =>', orderId);
    this.cartService.getOrderInvoice(orderId);
  }

  onLogout() {
    this.authService.logout();
    this.authStatusListener.next(false);
  }


  ngOnDestroy() {
    // this.userSub.unsubscribe();
    // this.authListenerSubs.unsubscribe();
  }



}
