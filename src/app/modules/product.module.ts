export interface ProductModule {
  id:          string;
  name:        string;
  price:       number;
  discount:    number;
  priceDisc:   number;
  image:       string;
  description: string;
  category:    string;
  creatorId:   string;
  creatorName: string;
  clientItems: number;
  addedDate:   string;
  showProduct: string;
  status:      string;
}
