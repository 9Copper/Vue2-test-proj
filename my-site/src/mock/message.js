import Mock from "mockjs";
import qs from "querystring";

//提交留言
Mock.mock("/api/message", "post", {
  code: 0,
  msg: "",
  data: {
    id: "@guid",
    nickname: "@cname",
    content: "@cparagraph(1, 10)",
    createDate: Date.now(),
    "avatar|1": [
      "https://img1.baidu.com/it/u=695609245,3889806637&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=866",
      "https://img2.baidu.com/it/u=4254344620,3197327776&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
      "https://img2.baidu.com/it/u=4042813557,691172810&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333",
      "https://img0.baidu.com/it/u=3970780365,370340276&fm=253&fmt=auto&app=138&f=JPEG?w=436&h=500",
    ],
  },
});

//分页获取留言
Mock.mock(/^\/api\/message\/?(\?.+)?$/, "get", function (options) {
  const query = qs.parse(options.url);
  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      total: 52,
      [`rows|${query.limit || 10}`]: [
        {
          id: "@guid",
          nickname: "@cname",
          content: "@cparagraph(1, 10)",
          createDate: Date.now(),
          "avatar|1": [
            "https://img1.baidu.com/it/u=695609245,3889806637&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=866",
            "https://img2.baidu.com/it/u=4254344620,3197327776&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
            "https://img2.baidu.com/it/u=4042813557,691172810&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333",
            "https://img0.baidu.com/it/u=3970780365,370340276&fm=253&fmt=auto&app=138&f=JPEG?w=436&h=500",
          ],
        },
      ],
    },
  });
});
