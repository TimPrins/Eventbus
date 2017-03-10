'use strict'
class Eventbus {
  constructor() {
    this.callback = [];
  }

/**
Unsubscribes the subsscriber, this will be done automaticlly. Makes an 
coppy of this.callback so it can be used to make sure the original array 
doesn't get messed up. Than it runs a for loop to check which id needs 
to be deleted in the this.callback array. 
**/  
  off(id){
    let index = this.callback.length + 1 
    for(let i = 0; i < this.callback.length; i++){
      if (this.callback[ i ].id === id){
        index = i
        break;
      } 
    }
    if (this.callback.length > index){
    this.callback.splice(index, 1)     
    }
  }

/**
Subscribes an user to a topic. The user will get an random id, this will be 
generated automaticly and put in the this.callback array. 
**/  
  on(callback, topicName){
    let id = Math.floor(Math.random() * 10000000);
    let callbackObject = {cal:callback, id:id, topicId:topicName};
    this.callback.push(callbackObject) ;
    console.log(callbackObject);
    return ()=>{this.off(id)}
  }

/**
The emit function, will check in the this.callback array who is subscribed 
to the emiter. After that automaticlly the callback that is specified by 
the subscriber will be executed.
**/
  emit(data, topicName){
    for(let i = 0; i < this.callback.length; i++){
     if(this.cal[i].topicId == topicName){
      this.callback[i].cal(data);
     }
    }
  }
}

/**
Exports the eventbus class
**/
module.exports = Eventbus