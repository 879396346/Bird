import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { DataStore } from "./js/base/DataStore.js";
import { Background } from "./js/runtime/Background.js";
import { Land } from "./js/runtime/Land.js";
import { Director } from "./js/Director.js";
import { UpPipe } from "./js/runtime/UpPipe.js";
import { Birds } from "./js/player/Birds.js";
import { StartButton } from "./js/player/StartButton.js";
import { Score } from "./js/player/Score.js";
import { Tool } from "./js/extra.js";

// 程序的主类，用于小游戏过程中数据的初始化，以及点击事件的绑定

export class Main {
  constructor() {
    console.log('游戏开始了');
    // 初始化画布
    // this.canvas = document.getElementById('game');
    this.canvas = wx.createCanvas('game');
    this.ctx = this.canvas.getContext('2d');
    // 初始化变量池
    this.loader = new ResourceLoader();
    // 初始化资源加载器
    this.dataStore = DataStore.getInstance();
    // 初始化一个导演
    this.director = Director.getInstance();
    // 加载完成后，执行其他的操作
    this.loader.onloaded(map => this.onResourceLoaded(map));
  }
  // 资源加载完成后执行其他操作的方法
  onResourceLoaded(map) {
    // console.log(map);
    // 模拟画背景图
    // let bg = map.get('background'); // 拿背景资源
    // this.ctx.drawImage(bg,0,0,bg.width,bg.height,0,0,this.canvas.width,this.canvas.height);
    // 保存各种资源
    // 不使用set方法保存的原因：set方法保存的数据在游戏中结束时会被销毁
    // 而下面的数据及时游戏结束，也不会销毁，下一局可以继续使用
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    const t = new Tool();
    // t.voice('./audio/bgm.mp3', true).play();
    t.getTelInfo();
    t.getUserInfo();
    this.init();

  }
  //游戏初始化,初始化游戏中的数据，将其保存在变量池中
  init() {
    //将游戏结束改为false
    this.director.isGameOver = false;


    // 模拟画背景图
    // new Background().draw()
    // new Land().draw()
    this.dataStore.set('background', new Background())
      .set('land', new Land())
      .set('pipes', [])
      .set('birds', new Birds())
      .set('startButton', new StartButton())
      .set('score', new Score())
    //调用单击事件的方法
    this.gameEvent();
    //先创建一组水管
    this.director.createPipes();
    // 开始运行
    this.director.run();
  }

  //绑定单击事件
  gameEvent() {
    // this.canvas.addEventListener('touchstart',e=>{
    wx.onTouchStart(res => {
      if (this.director.isGameOver) {
        //游戏结束了,点击重新开始
        this.init();
      } else {
        //游戏未结束，点击触发小鸟向上飞一段的距离
        this.director.birdsUp();
      }
    })
  }
}