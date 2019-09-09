import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './boody/user/profile/profile.component';
import { RegisterComponent } from './boody/user/register/register.component';
import { LoginComponent } from './boody/user/login/login.component';
import { CartComponent } from './boody/cart/cart.component';
import { ProductComponent } from './boody/shop/product/product.component';
import { ContactUsComponent } from './boody/contact-us/contact-us.component';
import { ShopComponent } from './boody/shop/shop.component';
import { AboutUsComponent } from './boody/about-us/about-us.component';
import { HomeComponent } from './boody/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WishListComponent } from './boody/wish-list/wish-list.component';
import { UserComponent } from './boody/user/user.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '' , children: [
    { path: '', component: HomeComponent},
    { path: 'Shop', children: [
      { path: '', component: ShopComponent},
      { path: 'Product', component: ProductComponent }
    ]},
    { path: 'Cart', component: CartComponent},
    { path: 'WishList', component: WishListComponent},
    { path: 'User', children: [
      // { path: '', component: UserComponent},
      { path: 'Login', component: LoginComponent},
      { path: 'Login/:verify', component: LoginComponent},
      { path: 'Register', component: RegisterComponent },
      { path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard] }
    ]},
    { path: 'ContactUs', component: ContactUsComponent },
    { path: 'AboutUs', component: AboutUsComponent },
  ]},
  { path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ]

})
export class AppRoutingModule { }
