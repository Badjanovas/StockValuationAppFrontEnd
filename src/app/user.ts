export class User {

  id?: number;
  userName: string;
  password: string;
  email: string;

  constructor(userName: string, password: string, email: string, id?: number ){
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.email = email;
  }

}
