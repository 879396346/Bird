import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 重新开始的按钮，游戏结束时显示在屏幕上
export class StartButton extends Sprite{
    constructor(){
        const img=Sprite.getImage('startButton');
        const canvas=DataStore.getInstance().canvas;
        const land=Sprite.getImage('land');
        const x=(canvas.width-img.width)/2;
        const y=(canvas.height-land.height-img.height)/2;
        super(img,0,0,img.width,img.height,x,y,img.height,img.width)
    }
}



















