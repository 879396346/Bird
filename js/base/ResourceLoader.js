// 资源加载器，保证游戏是在图片加载完成之后开始主循环
// 当图片加载完成，canvas才开始渲染，否则canvas无法渲染到图片
import { Resources } from "./Resources.js";


export class ResourceLoader{
  constructor(){
    // 获取图片资源的路径
    this.map = new Map(Resources);
    // console.log(this.map);
    // 遍历集合map，将其中的字符串路径替换为img对象
    for(let [k,v] of this.map){
      // const img = new Image();

      const img = wx.createImage();
      img.src = v; // 将图片路径赋值给img的src属性
      // 将原来的字符串替换为img对象(重新设置k对应的值)
      // map.set(key,value)设置map集合中某个key的值为value
      this.map.set(k,img);
    }
    // console.log(this.map);
  }

  // 定义一个图片加载完成的方法
  onloaded(callback){
    let n = 0; // 计数器，记加载图片成功的数目
    // 遍历map集合
    for(let val of this.map.values()){
      // 使用箭头函数，保证this的指向不变
      val.onload = ()=>{
        n++;
        // 判断n有没有达到map集合的长度(有没有全部加载完成)
        // map数据的长度用size表示
        if(n>=this.map.size){
          // 全部加载完成,返回加载成功后的map集合
          callback(this.map);
        }
      }
    }
  }

}



