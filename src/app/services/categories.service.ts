import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories:               CategoryModule[] = [];
  categoriesUpdated   = new Subject<{categories: CategoryModule[], cateCount: number}>();
  categoriesEditIndex = new Subject<number>();

  constructor(private http: HttpClient) { }


  // get All Categories
  getAllCates(postsPerPage: number, currentPage: number) {

    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    // console.log('queryParams =>', queryParams);
    this.http.get<{ message: string; categories: any; maxPosts: number }>(
      'http://localhost:3000/api/categories' + queryParams
      )
    .pipe(
      map(  categoryData => {
        return { caregories: categoryData.categories.map( category => {
          return {
            id:          category._id,
            name:        category.name,
            showCategory: category.showCategory,
            creatorId:   category.creatorId,
            creatorName: category.creatorName,
            description: category.description,
            addedDate:   category.addedDate,
          };
        }),
        maxPost: categoryData.maxPosts
      };
      })
    )
    .subscribe( transformedCategoryData => {
      this.categories = transformedCategoryData.caregories;
      this.categoriesUpdated.next({
        categories: [...this.categories],
        cateCount: transformedCategoryData.maxPost
        });
    });
  }


  // // get All Categories
  // getAllCates() {
  //   this.http.get<{message: string, categories: any}>('http://localhost:3000/api/categories')
  //   .pipe( map( (categoryData) => {
  //     return categoryData.categories.map( category => {
  //       return {
  //         id:          category._id,
  //         name:        category.name,
  //         icon:        category.icon,
  //         image:       category.image,
  //         creator:     category.creator,
  //         description: category.description,
  //         addedDate:   category.addedDate,
  //       };
  //     });
  //   }))
  //   .subscribe( (transformedCategoryData) => {
  //     this.categories = transformedCategoryData;
  //     this.categoriesUpdated.next([...this.categories]);
  //   });
  // }

  // get All Categories On Update
  getAllCatesUpdatedListener() {
    return this.categoriesUpdated.asObservable();
  }

  // get only one category
  getCate(categoryId) {
   console.log(categoryId, ' => categoryId');
   return {...this.categories.find(c => c.id === categoryId)};
    // return this.http
    //   .get<{category: CategoryModule, message: string}>('http://localhost:3000/api/categories/' + categoryId);
  }

  // add and save new  Category
  addCate( cateData: CategoryModule ) {
    return this.http.post<{ newCategoryID: string, message: string }>(
      'http://localhost:3000/api/categories', cateData
      );
  }

  //  after updates to save
  updateCate(categoryId: string, newCategoryData) {
    console.log(categoryId, newCategoryData);

    console.log('newCategoryData =>', newCategoryData);
    return this.http.put<{category: string, message: string}>(
      'http://localhost:3000/api/categories/' + categoryId, newCategoryData
      );
  }

// // delete category by id
  deleteCate(categoryId: string)  {
    console.log(categoryId, ' => delete category by id');
    return this.http.delete<{message: string}>('http://localhost:3000/api/categories/' + categoryId);
  }

}
