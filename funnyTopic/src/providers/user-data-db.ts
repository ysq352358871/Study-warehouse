/*
* 用于用户个人信息的增删改查
*
*
* **/
import {Injectable} from '@angular/core';

import {SQLiteObject} from "@ionic-native/sqlite";

import {DataProvider} from "./db";

import {User} from "./user";

@Injectable()
export class UserDataDBService {

  database: SQLiteObject;

  constructor(private dataProvider: DataProvider) {
    this.database = this.dataProvider.TopicDatabase;
  }

  insertIntoUserTable(user) {
    // console.log(JSON.stringify(user));
    // this.dataProvider.TopicDatabase.executeSql('SELECT * FROM users;', {})
    //   .then((e) => { callback(e.rows.item(0))})
    //   .catch(e => console.log(JSON.stringify(e)));
    this.dataProvider.TopicDatabase.executeSql('INSERT INTO users VALUES (?, ?, ?, ?, NULL, ?, ?, NULL, NULL, NULL, NULL);', [user.userId, user.email, user.username,user.token,user.userAvatar,user.nickName])
      .then(() => console.log('插入数据成功'))
      .catch(e => console.log(JSON.stringify(e),"插入用户失败"));
  }

  queryUserTable(sql,callback){
    let result = "";
    this.dataProvider.TopicDatabase.executeSql(sql, {})
      .then((e) => { callback(e.rows.item(0))})
      .catch(e => console.log(JSON.stringify(e)));
  }

  updateUserById(sql,userData,callback){
    // [user.password, user.userId]
    this.dataProvider.TopicDatabase.executeSql(sql,userData)
      .then((e) => callback())
      .catch(e => console.log(JSON.stringify(e)));
  }

  updateUserTable(sql,user,callback) {
    this.dataProvider.TopicDatabase.executeSql('SELECT * FROM users WHERE userId=?;', [ user.userId])
      .then((e) => {
        if(e.rows.length < 1){
          this.dataProvider.TopicDatabase.executeSql('INSERT INTO users VALUES (?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL);', [user.userId, user.email, user.username,user.token,user.password])
            .then(() => callback())
            .catch(e => console.log(e));
        }else {
          this.dataProvider.TopicDatabase.executeSql(sql,[user.token,user.password, user.userId])
            .then((e) => callback())
            .catch(e => console.log(e));
        }
    })
      .catch(e => console.log(JSON.stringify(e)));

  }






  insertIntoDB(params,callback){
    let sqlStr = 'delete from topic where (select count(id) from topic) > 10 and id in (select id from topic order by id desc limit (select count(id) from topic) offset 10 )';
    this.dataProvider.TopicDatabase.executeSql(params.sql,params.option)
      .then(() => {
        this.dataProvider.TopicDatabase.executeSql(sqlStr,{})
          .then(()=>console.log("删除多余的成功"))
          .catch();
      callback()
    })
      .catch(e => console.log(JSON.stringify(e),"插入数据失败"));
  }
  queryDB(params,callback){
    let result:any = [];
    this.dataProvider.TopicDatabase.executeSql(params.sql, {})
      .then((e) => {
        for(let j=0;j<e.rows.length;j++){
          result.push(e.rows.item(j))
        }
        callback(result);
    })
      .catch(e => console.log(JSON.stringify(e),"查询出错"));
  }

  insertIntoRecord(sql,value){
    /**
     * value是一个数组：['这是一条记录','当前登录用户的ID']
     * */
    this.dataProvider.TopicDatabase.executeSql('SELECT * FROM record WHERE userId=?;', [value[1]])
      .then((e) => {
        for(let j=0;j<e.rows.length;j++){
          if(e.rows.item(j).recordText == value[0]){
            this.deleteRecord("DELETE FROM record WHERE id=?;",[e.rows.item(j).id])
          }
        }
        this.dataProvider.TopicDatabase.executeSql(sql,value)
          .then(() => console.log("----插入record成功"))
          .catch(e => console.log(JSON.stringify(e),"---添加记录出错"));
      })
      .catch(e => console.log(JSON.stringify(e),"----插入之前的查询"));

  }
  deleteRecord(sql,value,callback?){
    this.dataProvider.TopicDatabase.executeSql(sql,value)
        .then(() => callback())
        .catch(e => console.log(JSON.stringify(e),"---删除失败"));

  }


}
