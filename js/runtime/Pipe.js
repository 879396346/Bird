import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

//上下水管的父类
// 继承Sprite


export class Pipe extends Sprite{
    constructor(img,top){
        const w = DataStore.getInstance().canvas.width;
        super(img,0,0,img.width,img.height,w,0,img.width,img.height);
        this.top=top;
    }
    draw(){
        this.y=this.top-this.height;
        super.draw()
    }
}







