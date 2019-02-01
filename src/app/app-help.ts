import {Student} from './app-Student';

export class AppHelp {
  static HideEdit = 0;
  static HideAdd = 0;
  static HideDel = 0;

  static ConfirmDel = 0 ;
  static ConfirmAdd = 0 ;
  static ConfirmEdit = 0 ;

  static EditStudent = new Student('1', '1', '1', '1', 1);
  static FromEditStudent = new Student('1', '1', '1', '1', 1);
  static AddStudent = new Student('1', '1', '1', '1', 1);
  static DelStudent = new Student('1', '1', '1', '1', 1);
}
