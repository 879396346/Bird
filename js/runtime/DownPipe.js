import { Pipe } from "./Pipe.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 下水管

export class DownPipe extends Pipe{
  constructor(top){
    const img = Sprite.getImage('pieDown');
    super(img, top);
  }

  draw(){
    // gap表示上下水管的空隙
    let gap = DataStore.getInstance().canvas.height/6;
    this.y = this.top + gap;
    super.draw();
  }
}