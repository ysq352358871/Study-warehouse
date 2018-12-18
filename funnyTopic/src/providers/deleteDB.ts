import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Injectable} from '@angular/core';


@Injectable()  //这个注解是必须添加的
export class DeleteDBProvider {

  constructor(private sqlite: SQLite) {

  }

  deleteDB() {
    this.sqlite.deleteDatabase({
      name: 'data.db'
    })
      .then((e) => {
          console.log(JSON.stringify(e)+"------");
      })
      .catch(e =>  console.log(JSON.stringify(e)+"------"));
  }
}
