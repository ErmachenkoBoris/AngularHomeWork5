export class Student {
  name: string;
  surname: string;
  patronymic: string;
  datebd: Date;
  mark: number;
  constructor(name: string, surname: string, patronymic: string, datebd: any, mark: number) {
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.datebd = datebd;
    this.mark = mark;
  }
}
