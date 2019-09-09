import { OrderModule } from 'src/app/modules/order.module';
// import { AuthModule } from './../auth/auth.module';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // AuthModule: AuthModule[];
  users:      UserModule[];

  constructor( private  http: HttpClient) { }

  // add and save new  user
  addUser( userData: UserModule ) {
    return this.http.post<{newUserID: string, message: string}>(
      'http://localhost:3000/api/users', userData
      );
  }


    // get user by id
    getDBUser(userId: string)  {
      console.log('get DB User =>', 'http://localhost:3000/api/users/' + userId);
      return this.http.get<{message: string, userData: UserModule}>(
        'http://localhost:3000/api/users/' + userId
        );
    }


    getAllUserOrders(userId) {
      console.log('userId =>', 'http://localhost:3000/api/orders/userOrders/' + userId);
      return this.http.get<{ message: string, orderInfo, orders: OrderModule[] }>('http://localhost:3000/api/orders/userOrders/' + userId);
    }


}
