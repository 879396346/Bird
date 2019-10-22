// 微信部分api的使用

export class Tool{
  constructor(){
    // 初始化数据(没有数据需要初始化，不写)
  }

  // 手机振动的效果
  zhendong(){
    wx.vibrateLong({
      success(){
        console.log('振动了一次');
      }
    })
  }
  // 播放音乐
  voice(src,loop){
    // 创建音频
    const music = wx.createInnerAudioContext();
    // 音频文件的路径
    music.src = src;
    // 设置循环播放
    music.loop = loop;
    // 播放
    // music.play();
    return music;
  }
  // 获取手机信息
  getTelInfo(){
    wx.getSystemInfo({
      success(res){
        console.log(res);
      }
    })
  }
  // 获取用户的信息
  getUserInfo(){
    // 创建用户信息按钮
    const button = wx.createUserInfoButton({
      type: "text",
      text: "请授权用户信息",
      style: {
        left: 100,
        top: 100,
        width: 150,
        height: 40,
        backgroundColor: '#3ed4a0',
        borderColor: '#e34d0a',
        borderWidth: 2,
        borderRadius: 10,
        color: 'golden',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 40
      }
    });
    // 监听按钮的点击事件
    button.onTap(res=>{
      if(res.userInfo){
        // 用户授权了
        console.log(res.userInfo);
        // 销毁按钮
        button.destroy();
      }
    });
  }

}





