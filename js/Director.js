import { DataStore } from "./base/DataStore.js";
import { UpPipe } from "./runtime/UpPipe.js";
import { DownPipe } from "./runtime/DownPipe.js";

// 导演类，控制游戏的主流程，逻辑

export class Director{
  constructor(){
    // 获取变量池
    this.dataStore = DataStore.getInstance();
  }
  // 导演只能有一个
  static getInstance(){
    if(!Director.instance){
      Director.instance = new Director();
    }
    return Director.instance;
  }

  // 创建水管
  createPipes(){
    const minTop = this.dataStore.canvas.height/8; // 最小值
    const maxTop = this.dataStore.canvas.height/2; // 最大值
    const top = Math.random()*(maxTop-minTop) + minTop; // top值
    this.dataStore.get('pipes').push(new UpPipe(top));
    this.dataStore.get('pipes').push(new DownPipe(top));
  }


  // 运行
  run(){
    // 画背景图
    this.dataStore.get('background').draw();
    // 获取水管数组
    const pipes = this.dataStore.get('pipes');
    // this.createPipes(); // 调用创建水管的方法
    // 创建水管之前先判断
    // 有没有出界的，出界就将其从数组中删除
    if(pipes[0].x<-pipes[0].width && pipes.length==4){
      pipes.shift();
      pipes.shift();
    }
    // 创建水管：前面一组水管有没有越过屏幕中央，如果越过，则开始创建下一组水管
    const CanvasWidth = this.dataStore.canvas.width;
    if(pipes[0].x<(CanvasWidth-pipes[0].width)/2 && pipes.length==2){
      this.createPipes();
    }
    // 遍历数组，画水管
    pipes.forEach(pipe=>{
      pipe.draw();
    });
    // 获取小鸟并画出来
    this.dataStore.get('birds').draw();
    // 画地板图
    this.dataStore.get('land').draw();
    // 循环运行
    requestAnimationFrame(()=>this.run());
  }
}






