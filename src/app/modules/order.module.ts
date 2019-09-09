import { ProductModule } from './product.module';
export interface OrderModule {
  creatorId:   string;
  creatorName: string;
  products:    ProductModule[];
  active:      boolean;
  addedDate:   Date;
  totalPrice:  number
}

