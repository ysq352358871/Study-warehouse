import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Injectable} from '@angular/core';


@Injectable()  //这个注解是必须添加的
export class DataProvider {
  TopicDatabase: SQLiteObject;
  callback:any = {
    success: (res) => { },
    topicIsReady: false
  }

  constructor(private sqlite: SQLite) {

  }

  initDatabase(callback) {
    // DELETE FROM table where _id NOT IN (SELECT _id from table ORDER BY insertion_date DESC LIMIT 50)
    this.sqlite.create({
      name: 'topic.db',
      location: 'default'
    }).then((database: SQLiteObject) => {
      database.executeSql('CREATE TABLE IF NOT EXISTS users(userId int(11) PRIMARY KEY,email VARCHAR(100), username VARCHAR(100), token VARCHAR(100),password VARCHAR(30), avatar VARCHAR(120), nickName VARCHAR(60), userCareer varchar(50), country varchar(30), sex int(1), userIndustry varchar(60));', {})
        .then((e) => callback())
        .catch(e => console.log(e));
    //
      database.executeSql('CREATE TABLE IF NOT EXISTS topic(id INTEGER PRIMARY KEY AUTOINCREMENT, topicId int(11),title VARCHAR(255), html TEXT, text TEXT,picUrl TEXT, video TEXT, previewImg VARCHAR(255), createTime int(11), country VARCHAR(30), hot int(11), category VARCHAR(100), chatNum int(11), collectionNum int(11));', {})
          .then((e) =>{
            this.callback.success("ok");
            this.callback.topicIsReady = true;
          } )
          .catch(e =>console.log(JSON.stringify(e),"创建topic失败"));

      database.executeSql('CREATE TABLE IF NOT EXISTS record(id INTEGER PRIMARY KEY AUTOINCREMENT, recordText VARCHAR(100), userId int(11));', {})
        .then((e) => console.log('创建record表成功'))
        .catch(e =>console.log(JSON.stringify(e),"创建record失败"));

      this.TopicDatabase = database;
    })
  }
}
