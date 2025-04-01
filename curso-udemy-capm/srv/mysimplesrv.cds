using myCompany.hr.lms from '../db/Students';

service mysrvdemo @(path:'mylms'){  //@(path:'mylms') es un alias para el endpoint, ej: http://localhost:4004/odata/v4/mylms/GetStudent
    @readonly entity StudentSRV as projection on lms.Students;
    @readonly entity StudentsSRV as projection on lms.Students;
    @readonly entity StudentsSRV2 as projection on lms.Students;

    @updateonly entity UpdateStudent1 as projection on lms.Students;

    @readonly entity GetStudent as projection on lms.Students;
    @updateonly entity UpdateStudent as projection on lms.Students;
    @insertonly entity InsertStudent as projection on lms.Students;
    @deleteonly entity DeleteStudent as projection on lms.Students;

}



