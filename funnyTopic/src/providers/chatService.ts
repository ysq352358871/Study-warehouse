declare var JMessage:any;
import { Injectable } from '@angular/core';
@Injectable()
export class ChatServiceClass {
  user:any = {};
  newMessageCallback:any = {
    callback:(res)=>{

    }
  }
  constructor() {

  }

  //用户注册。
  JMRegister(params,callback){
    JMessage.register(params,
      (e) => {
        callback(e);
      },
      (error) => {
      console.log("注册失败12" + JSON.stringify(error));
    });
  }
  //用户登录
  JMLogin(params,callback){
    JMessage.login(params,(e)=>{
      console.log(JSON.stringify(e),"登录成功");
      callback()
    },error=>{
      console.log(JSON.stringify(error),"登录错误");
    });
  }
  updateMyPassword(params){
    JMessage.updateMyPassword(params,
      () => {
        // do something.
        console.log("修改极光密码成功")
      }, (error) => {
        var code = error.code;
        var desc = error.description;
        console.log("修改极光密码失败");
      })
  }
  updateMyAvatar(params){
    JMessage.updateMyAvatar(params,
      () => {
        // do something.
      }, (error) => {
        var code = error.code;
        var desc = error.description;
        console.log(desc,"设置头像失败")
      })
  }

  updateMyInfo(params){
    JMessage.updateMyInfo(params,
      () => {
        // do something.
        console.log("---更新昵称成功");
      }, (error) => {
        var code = error.code;
        var desc = error.description;
        console.log(code,desc,JSON.stringify(params)+"修改昵称");
      })
  }
  getUserInfo(params,success,err){

    JMessage.getUserInfo(params,
      (userInfo) => {
        // do something.
        success(userInfo);
      }, (error) => {
        var code = error.code;
        var desc = error.description;
        err(desc)
      })
  }



  //创建会话, 第一次发消息时,必须先创建会话
  createConversation(params){
    JMessage.createConversation(params,
      (conversation) => {
        // do something.
        console.log(JSON.stringify(conversation),"会话");
      }, (error) => {
        var code = error.code;
        var desc = error.description;
        console.log(JSON.stringify(error),"会话失败")
      })
  }
  //创建群组
  createGroup(params,callback){
    JMessage.createGroup(params,
      (groupId) => {  // groupId: 新创建的群组 ID
        // do something.
        callback(groupId);
      }, (error) => {
        var code = error.code;
        var desc = error.description;
        console.log(JSON.stringify(error),"创建群组")
      })
  }
  getGroupInfo(params,success,err){
    JMessage.getGroupInfo(params,
      (groupInfo) => {
        success(groupInfo)
      }, (error) => {
        var code = error.code;
        var desc = error.description;
        err(desc)
      })
  }
  //群组添加成员
  addGroupMembers(params,success,err){
    JMessage.addGroupMembers(params,
      () => {
        success();
      }, (error) => {
        var code = error.code;
        var desc = error.description;
        err(desc)
      })
  }
  getGroupMembers(groupId:number,success,err){
    JMessage.getGroupMembers({ id: groupId },
      (userArray) => {  // 用户对象数组
        // do something.
        success(userArray)
      }, (error) => {
        var code = error.code;
        var desc = error.description;
        err(desc)
      })
  }



  //获取会话列表
  getConversations(callback){
    JMessage.getConversations((conArr) => { // conArr: 会话数组。
      // do something.
      //console.log(JSON.stringify(conArr),"会话数组");
      callback(conArr);
    }, (error) => {
      var code = error.code;
      var desc = error.description
    })
  }

  //重置未读消息数
  resetUnreadMessageCount(groupId){
    JMessage.resetUnreadMessageCount({ type: 'group', groupId: groupId},
      (conversation) => {
        // do something.
        console.log(JSON.stringify(conversation),"--重置未读消息数成功");
      }, (error) => {
        var code = error.code;
        var desc = error.description;
      })
  }

  //发送文本消息
  sendTextMessage(params,callback,errorCallback){
    console.log("--------发送消息了");
    JMessage.sendTextMessage(params,
      (msg) => {
        // do something.
        callback(msg);
      }, (error) => {
        var code = error.code;
        var desc = error.description;
        errorCallback(error);
      })
  }
  //发送语音消息
  sendVoiceMessage(params,callback,errorCallback){
    JMessage.sendVoiceMessage(params,
      (msg) => {
        // do something.
        callback(msg);
      },(error) => {
        var code = error.code;
        var desc = error.description;
        errorCallback(desc)
      })
  }
  // 发送图片消息
  sendImageMessage(params,success,err){
    //{ type: 'group', groupId: '1111', path: 'image_path'}
    JMessage.sendImageMessage(params,
      (msg) => {
        // do something.
        success(msg);
      }, (error) => {
        var code = error.code;
        var desc = error.description;
        err(desc);
      })
  }



  //获取历史消息
  getHistoryMessages(params,success,err){
    JMessage.getHistoryMessages(params,
      (msgArr) => { // 以参数形式返回消息对象数组1
        // do something.
        success(msgArr)
      }, (error) => {
        var code = error.code;
        var desc = error.description;
        err(error)
      })
  }


}
