import { DataStore } from "./DataStore";

// 各种图片的父类

export class Sprite{
    constructor(img=null,srcX=0,srcY=0,srcW=0,srcH=0,x=0,y=0,width=0,height=0){
        // 获取变量池
        const dataStore=DataStore.getInstance();
        this.ctx=dataStore.ctx;
        this.img=img; //图片
        this.srcX=srcX; //起始坐标
        this.srcY=srcY;
        this.srcW=srcW; //图片高
        this.srcH=srcH;
        this.x=x; //在画布上的坐标
        this.y=y;
        this.width=width; //画的宽
        this.height=height;
    }
    // 画图
    draw(img=this.img,srcX=this.srcX,srcY=this.srcY,srcW=this.srcW,
    srcH=this.srcH,x=this.x,y=this.y,width=this.width,
    height=this.height){
        this.ctx.drawImage(img,srcX,srcY,srcW,srcH,x,y,width,height);
    }
    // 获取指定图片
    static getImage(key){
        return DataStore.getInstance().res.get(key);
    }

}