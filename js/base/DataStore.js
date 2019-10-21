// 变量池，用于保存游戏过程中用到的所有数据，方便我们在不同的类中访问和修改变量


export class DataStore{
  constructor(){
    // 用于保存数据
    this.map = new Map();
  }
  // 单例，保证变量池只有一个
  static getInstance(){
    if(!DataStore.instance){
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }
  // 保存数据
  set(key,val){
    this.map.set(key,val);
    return this; // 方便链式调用
  }
  // 获取数据
  get(key){
    return this.map.get(key);
  }
  // 销毁数据
  destroy(){
    for(let val of this.map.values()){
      val = null;
    }
  }
}







