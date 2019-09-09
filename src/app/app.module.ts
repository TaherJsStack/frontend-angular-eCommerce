import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthInterceptor } from './services/auth-interceptor';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BoodyComponent } from './boody/boody.component';
import { HomeComponent } from './boody/home/home.component';
import { AboutUsComponent } from './boody/about-us/about-us.component';
import { ContactUsComponent } from './boody/contact-us/contact-us.component';
import { ShopComponent } from './boody/shop/shop.component';
import { ProductComponent } from './boody/shop/product/product.component';
import { CartComponent } from './boody/cart/cart.component';
import { UserComponent } from './boody/user/user.component';
import { LoginComponent } from './boody/user/login/login.component';
import { RegisterComponent } from './boody/user/register/register.component';
import { ProfileComponent } from './boody/user/profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { WishListComponent } from './boody/wish-list/wish-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoodyComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    ShopComponent,
    ProductComponent,
    CartComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FooterComponent,
    WishListComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
