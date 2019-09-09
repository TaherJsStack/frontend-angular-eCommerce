import { RegisterComponent } from './../register/register.component';
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  errMsg: string;
  errSub: Subscription;
  showAlertVerifyEmail;

  constructor( private authService: AuthService,
               private registerComponent: RegisterComponent,
               private route:        ActivatedRoute,
               ) { }

  ngOnInit() {
    this.errSub = this.authService.getErrMsg()
      .subscribe( err =>
        { console.log('err=>', err);
          this.errMsg = err;
       });

    this.route.paramMap
       .subscribe( (paramMap: ParamMap ) => {
           if ( paramMap.has('verify') ) {
             this.showAlertVerifyEmail  = true;
            }
          });
    }

  onSignin(auth: NgForm) {

  }


  ngOnDestroy() {
    this.errSub.unsubscribe();
  }


}
