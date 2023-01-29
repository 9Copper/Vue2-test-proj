import Mock from "mockjs";

Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "https://img2.baidu.com/it/u=2300523846,3444589856&fm=253&fmt=auto&app=138&f=JPEG?w=463&h=500",
    siteTitle: "派大派大派",
    github: "https://github.com/9Copper",
    qq: "1299785882",
    qqQrCode:
      "http://photogz.photo.store.qq.com/psc?/V50EFDra15jFOU1Br0aL2ajd7e49LblD/ruAMsa53pVQWN7FLK88i5hwbirogeU6fe0*udbyz9wYc.YM8WDrXptPvl8NE8SVTFQ69empuwFiCjswhJ2Asg9wHUIGFD26yJMqi3jEIMlQ!/mnull&bo=vwG.AQAAAAABByE!&rf=photolist&t=5",
    weixin: "bwxfw7",
    weixinQrCode:
      "http://photogz.photo.store.qq.com/psc?/V50EFDra15jFOU1Br0aL2ajd7e49LblD/ruAMsa53pVQWN7FLK88i5hwbirogeU6fe0*udbyz9waAXm..DbdIMZbe4XghB06bgNEPX52c**G8LZByPjj2iXM6Cohw24GLnaBzCJsssbY!/mnull&bo=rgGuAQAAAAABByA!&rf=photolist&t=5",
    mail: "1299785882@qq.com",
    icp: "黑ICP备17001719号",
    githubName: "9Copper",
    favicon: "https://img0.baidu.com/it/u=1530187057,505346031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666",
  },
});
