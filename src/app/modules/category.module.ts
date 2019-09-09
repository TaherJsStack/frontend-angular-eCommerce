export interface CategoryModule {
  id:           string;
  name:         string;
  showCategory: boolean;
  creatorId:    string;
  creatorName:  string;
  description:  string;
  addedDate?:   Date;
}
