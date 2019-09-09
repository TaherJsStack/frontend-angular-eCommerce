export interface UserModule {
  id:        string;
  name: {
    firstname: string,
    lastname:  string,
  };
  address: {
    country: string;
    street:  string,
    zip:     string,
    city:    string
  };
  email:     string;
  password:  string;
  phone:     number;
  ginder:    string;
  photoURL:  string;
  roll:      string;
  date:      Date;
  created_at: Date;
  orders:    any[];
  blockUser: boolean;
}
