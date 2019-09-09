import { ProductModule } from 'src/app/modules/product.module';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  wishItems: ProductModule[] = [];
  wishUpdated = new Subject<ProductModule[]>();

  constructor(private http: HttpClient) { }

  getAllWishItems() {
      this.wishUpdated.next([...this.wishItems]);
      return this.wishItems;
  }

  getAllWishesUpdatedListener() {
    return this.wishUpdated.asObservable();
  }

  addWish(productData: ProductModule) {
    console.log('productData =>', productData);
    this.wishItems.push(productData);
    this.wishUpdated.next([...this.wishItems]);
  }


  isWishOnList(product: ProductModule) {
    return this.wishItems.find( (producEl: ProductModule) => {
        return producEl.id === product.id;
    });
  }


  deleteWish(productID: string) {
    const index = this.wishItems.findIndex(producs => producs.id === productID);
    if (index !== -1) {
        this.wishItems.splice(index, 1);
    }
  }



}
