namespace app.elearning;
using {  Language, managed } from '@sap/cds/common';

type String50 : String(50);

entity Categories {
    key id :UUID;
        name : String50;
        description : String50;

}

entity Courses : managed {
    key course_id : UUID;
    course_name : String50;
    price : String(10);
    language : Language;
}
