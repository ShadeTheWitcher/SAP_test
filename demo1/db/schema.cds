namespace demo1.ls.db;

entity Student {
  key ID : Integer;
  name : String;
  surname : String;
  email : String(50);
  date_sign_up : Date;
}

annotate Student with @(
    UI:{
        LineItem:[
                {
                  Label : 'ID',
                  Value : ID,
                },
                {
                  Label : 'Name',
                  Value : name,
                },
                {
                  Label : 'Surname',
                  Value : surname,
                },
                {
                  Label : 'Email',
                  Value : email,
                },
                {
                  Label : 'Date Sign Up',
                  Value : date_sign_up,
                }
             ]
                
    }

);
