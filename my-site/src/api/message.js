import request from "./request";

//提交留言
export async function postMessage(messageInfo) {
  return await request.post("/api/message", messageInfo);
}

//分页获取留言
export async function getMessage(page = 1, limit = 10) {
  return await request.get("/api/message", {
    params: {
      page,
      limit,
    },
  });
}
