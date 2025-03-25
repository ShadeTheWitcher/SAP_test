using app.elearning from '../db/elearning';

service eLearnig {
    entity Categories as projection on elearning.Categories;

    entity Courses as projection on elearning.Courses;
}
