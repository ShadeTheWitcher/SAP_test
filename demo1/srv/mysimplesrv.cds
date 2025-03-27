using {demo1.ls.db as My} from '../db/schema.cds';

service mysrvdemo {

    @readonly entity StudentSRV as projection on My.Student;

    function myfoobar(msg:String) returns String;

}