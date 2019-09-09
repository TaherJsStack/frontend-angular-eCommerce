import { ProductModule } from './product.module';

export interface WishListModule {
  id:          string;
  creator:     string;
  products:    ProductModule[];
  addedDate:   Date;
}