using myCompany.hr.lms from '../db/Students';
using mysrvdemo as mysrvdemo from './mysimplesrv';



extend service mysrvdemo with @(path:'mylms',impl:'./mynewsrv.js'){ //funciona igual el alias al ser una extension del anterior srv da igual si esta o no | impl es para que use el .js nuevo
    @readonly entity CustomGetStudent as projection on lms.Students{
        *,
        first_name ||' '|| last_name as full_name: String
    }excluding{
        date_sign_up
    }
}
