import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";
import { Pipe } from "./Pipe.js";

// 下水管

export class DownPipe extends Pipe{
    constructor(){
        const img=Sprite.getImage('pieDown');
        super(img,top);
    }
    draw(){
        let gap=DataStore.getInstance().canvas.height/6;
        this.y=this.top+gap;
        super.draw();
    }
}