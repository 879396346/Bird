// 背景图，继承图片父类

import { Sprite } from '../base/Sprite.js';
import { DataStore } from '../base/DataStore.js';

export class Background extends Sprite{
  constructor(){
    // 获取地板图片
    const img = Sprite.getImage('background');
    // 获取画布的宽高
    const width = DataStore.getInstance().canvas.width;
    const height = DataStore.getInstance().canvas.height;
    // 重写父类的构造方法，初始化其中的数据
    super(img,0,0,img.width,img.height,0,0,width,height);
  }
}