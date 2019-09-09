import { map } from 'rxjs/operators';
import { ProductModule } from './../modules/product.module';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductModule[];
  productsUpdated = new Subject<{products: ProductModule[], proCount: number}>();

  constructor( private http: HttpClient ) { }

  // get All products
  getAllProducts(postsPerPage: number, currentPage: number) {

    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, products: any; maxPosts: number }>(
      'http://localhost:3000/api/products' + queryParams
      )
      .pipe( map( (productsData) => {
        return  {products: productsData.products.map( product => {
            return {
              id:          product._id,
              name:        product.name,
              price:       product.price,
              discount:    product.discount,
              priceDisc:   product.priceDisc,
              image:       product.image,
              description: product.description,
              category:    product.category,
              creatorId:   product.creatorId,
              creatorName: product.creatorName,
              clientItems: product.clientItems,
              addedDate:   product.addedDate,
              showProduct: product.showProduct,
              status:      product.status
            };
          }),
          maxPost: productsData.maxPosts
        };
      })
    )
      .subscribe( transformedProductsData => {
        this.products = transformedProductsData.products;
        this.productsUpdated.next({
          products: [...this.products],
          proCount: transformedProductsData.maxPost
        });
        // console.log(transformedProductsData);
      });
  }

  getAllProductsUpdatedListener() {
    return this.productsUpdated.asObservable();
  }

  // get only one product
  getPro(productsId) {
    return {...this.products.find(p => p.id === productsId)};
  }

  // add and save new  product
  addPro( proData ) {
    return this.http.post<{ newProductID: string, message: string}>(
      'http://localhost:3000/api/products', proData
      );
  }

//  after updates to save
  updatePro(productId, proData) {

    return this.http.put<{ message: string}>(
      'http://localhost:3000/api/products' + productId, proData
      );

  }

// delet product by id
  deletePro(productId)  {
    return this.http.delete<{ message: string}>(
      'http://localhost:3000/api/products/' + productId
      );
  }




}
