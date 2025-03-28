namespace demo1.ls.db;

entity Student {
  key ID : Integer;
  name : String;
  surname : String;
  email : String(50);
  date_sign_up : Date;
}


