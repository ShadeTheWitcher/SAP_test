using mysrvdemo as service from '../../srv/mysimplesrv';

annotate service.StudentSRV with @(
     UI: {
    SelectionFields: [ email,name],
    LineItem: [
      {Value: email,
            Label:'email'},
      {Value: name,
            Label:'first_name'},
      {Value: surname,
            Label:'last_name'},
      {Value: date_sign_up,
            Label:'date_sign_up'}
    ],
  HeaderInfo: {
      TypeName: 'email', TypeNamePlural: 'Emails',
      Title: { Value: email },
      Description: { Value: name }
    }
}
);