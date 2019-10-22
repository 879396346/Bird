import { DataStore } from "./base/DataStore.js";
import { UpPipe } from "./runtime/UpPipe.js";
import { DownPipe } from "./runtime/DownPipe.js";
import { Land } from "./runtime/Land.js";
import { Tool } from "../js/extra.js";

// 导演类，控制游戏的主流程，逻辑

export class Director {
  constructor() {
    // 获取变量池
    this.dataStore = DataStore.getInstance();
  }
  // 导演只能有一个
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }
  //判断小鸟是否碰撞,(小鸟的模型，某个水管的模型)
  isStrike(bird, pipe) {
    // console.log(bird,pipe);
    let strike = true;//假设撞上了
    if (bird.right < pipe.left//小鸟的右边小于水管的左边
      || bird.bottom < pipe.top//小鸟的右边小于水管的上边
      || bird.left > pipe.right//小鸟的右边大于水管的左边
      || bird.top > pipe.bottom//小鸟的上边小于水管的下边
    ) {
      //没撞上
      strike = false;
    }
    return strike;
  }

  // 判断小鸟的撞击事件(天、地、水管)
  check() {
    const birds = this.dataStore.get('birds');
    const land = this.dataStore.get('land');
    const pipes = this.dataStore.get('pipes');
    const score = this.dataStore.get('score');
    //判断与天地相撞
    if (birds.birdsY[0] < 0 || birds.birdsHeight[0] + birds.birdsY[0] > land.y) {
      //游戏结束
      this.isGameOver = true;
      return;
    }
    //判断与水管相撞
    //构建小鸟的模型数据
    const birdBorder = {
      top: birds.birdsY[0],
      right: birds.birdsX[0] + birds.birdsWidth[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0]
    }
    //循环水管，遍历构建
    for (let i = 0; i < pipes.length; i++) {
      const pipe = pipes[i];
      const pipeBorder = {
        top: pipe.y,
        right: pipe.x + pipe.width,
        bottom: pipe.y + pipe.height,
        left: pipe.x
      }
      //判断小鸟与某个水管是否撞击
      if (this.isStrike(birdBorder, pipeBorder)) {
        //撞上了
        this.isGameOver = true;
        return;
      }
    }
    //小鸟越过水管没有撞上，当前可以加分状态，加分
    //越过的肯定是第一组水管，所以只需要判断小鸟与第一组水管的位置关系
    if (birds.birdsX[0] > pipes[0].x + pipes[0].width && score.canAdd) {
      score.score++;
      //改变加分状态为不可加分
      score.canAdd = false;
    }
  }

  //点击屏幕，小鸟向上飞一段距离
  birdsUp() {
    const birds = this.dataStore.get('birds');//获取变量池中的小鸟对象
    for (let i = 0; i < 3; i++) {
      birds.y[i] = birds.birdsY[i];
    }
    birds.time = 0;
  }
  //创建水管的方法
  createPipes() {
    const minTop = this.dataStore.canvas.height / 8;//最小值
    const maxTop = this.dataStore.canvas.height / 2;//最大值
    const top = Math.random() * (maxTop - minTop) + minTop;//top值
    this.dataStore.get('pipes').push(new UpPipe(top));
    this.dataStore.get('pipes').push(new DownPipe(top));
  }
  // 运行
  run() {
    //检查游戏是否结束
    this.check();
    if (!this.isGameOver) {
      // 画背景图
      this.dataStore.get('background').draw();

      //获取水管数组
      const pipes = this.dataStore.get('pipes');
      //this.createPipes();//调用创建水管的方法
      //创建水管之前先判断
      //有没有出界的，出界就将其从数组中删除
      if (pipes[0].x < -pipes[0].width && pipes.length == 4) {
        pipes.shift();
        pipes.shift();
        //修改加分状态为可以加分
        this.dataStore.get('score').canAdd = true;
      }
      //创建水管的条件，前面一组水管有没有越过屏幕中央，如果越过，则开始创建下一组水管
      const Canvaswidth = this.dataStore.canvas.width;
      if (pipes[0].x < (Canvaswidth - pipes[0].width) / 2 && pipes.length == 2) {
        this.createPipes();
      }
      //遍历数组，画水管
      pipes.forEach(pipe => {
        pipe.draw();
      })
      //三只小鸟
      this.dataStore.get('birds').draw();
      // 画地板图
      this.dataStore.get('land').draw();
      //化分数    
      this.dataStore.get('score').draw();
      // 循环运行
      requestAnimationFrame(() => this.run());
    }
    else {
      let t = new Tool();
      t.zhendong();
      t.playMusic('./audio/bgm.mp3', false);
      //游戏结束,
      cancelAnimationFrame(this.id);
      //避免
      this.dataStore.get('background').draw();
      this.dataStore.get('pipes').forEach(p => { p.draw() });
      this.dataStore.get('land').draw();
      this.dataStore.get('birds').draw();
      this.dataStore.get('score').draw();
      //画结束的按钮
      this.dataStore.get('startButton').draw();
      //销毁数据
      this.dataStore.destroy();

    }

  }

}
