import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../../services/users.service';
import { UserModule } from '../../../modules/user.module';
import { NgForm } from 'node_modules/@angular/forms';
import { Subscription } from 'node_modules/rxjs';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as data from './countriesData';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  // @ViewChild('user') userForm: NgForm;

  minDate =      new Date(2019, 1, 1);
  maxDate =      new Date(2020, 1, 1);
  users:         UserModule[] = [];
  allCountries: any;
  blockUser =   false;
  errMsg: string;

  // alertVerifyEmail = new Subject<boolean>();
  alertVerifyEmail;

  constructor( private usersService: UsersService,
               private route: ActivatedRoute,
               private router: Router,
               // tslint:disable-next-line:variable-name
               private _flashMessagesService: FlashMessagesService,
              ) { }

  ngOnInit() {
    // console.log('D=> ', data.default);
    this.allCountries = data.default;

  } // end ngOnInIt

  getAlertVerifyEmail() {
    // return this.alertVerifyEmail.asObservable();
    return this.alertVerifyEmail;
  }

  onSaveUser(user: NgForm) {
    console.log('user value =>', user.value);
    if (user.invalid) { return; }
    const pass1 = user.value.userPassword;
    const pass2 = user.value.userConfig;
    if ( pass1 === pass2 ) {
        const newUser = {
          id:        null,
          name:      {
            firstname: user.value.name.firstname,
            lastname:  user.value.name.lastname,
          },
          address: {
            country: user.value.address.country,
            street:  user.value.address.street,
            zip:     user.value.address.zip,
            city:    user.value.address.city
          },
          email:     user.value.userEmail,
          password:  user.value.userPassword,
          phone:     user.value.userPhone,
          ginder:    user.value.userGinder,
          blockUser: this.blockUser,
          roll:      'user',
          date:      user.value.userDate,
          created_at: new Date(),
          orders:    [],
          photoURL:  'https://st-listas.20minutos.es/images/2014-06/383064/4461159_249px.jpg?1403287587',
        };
        // console.log('new User =>', newUser);
        this.usersService.addUser(newUser)
          .subscribe( msg => {
            // this.alertVerifyEmail.next(true);
            this.alertVerifyEmail = true;
            this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
            this.router.navigate(['/User/Login/', true]);
          }, err => {
            // console.log('err =>', err);
            this.errMsg = err.error.error;
            console.log('this errMsg ::=>', this.errMsg);
            this._flashMessagesService.show( err.error.error , { cssClass: 'alert-danger flash-message', timeout: 7000 });
          });
    } else {
      this._flashMessagesService.show('password doesn\'t match ', { cssClass: 'alert-danger flash-message', timeout: 6000 });
    }
    // user.resetForm();
  }





}
