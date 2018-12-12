# 目录

```bash
├── /config/
│   └── sequelize.ts
├── /interface/
│   ├── admin.ts
│   ├── album.ts
│   ├── article.ts
│   ├── base.ts
│   ├── context.ts
│   ├── data.ts
│   ├── learn.ts
│   ├── router.ts
```

# 更新

2018.11.13 使用TypeSciprt重构，api部分调整为RESTful风格

2018.10.26 学习笔记增加更新时间update、文章类型type字段

2018.9.11 使用sequelize重构mysql

2018.8.30 更新one·一个api

2018.8.7 增加访问接口，记录访问信息

2018.7.21 增加指定某天查询打卡记录api、删除相册功能

2018.7.18 增加打卡模块

2018.7.7 除去说说内容必填限制

2018.6.4 增加说收模块

2018.5.30 增加知乎日报模块

2018.5.6 eslint 重构代码

2018.4.29 增加花瓣相册模块

2018.4.22 配置七牛云

2018.4.10 增加学习笔记模块

2018.3.31 文章列表增加阅读量，评论昵称附带ip显示

2018.3.28 上线第三版博客


# 服务端api变更

1. 获取文章列表 GET `/api/article/list` -> GET `/api/article`
2. 获取文章详情 GET `/api/article/info?id=:id` -> GET `/api/article/:id`
3. 删除文章 POST `/api/article/delete?id=:id` -> DELETE `/api/article/:id`
4. 添加文章 POST `/api/article/add` -> POST `/api/article`
5. 删除文章标签 POST `/api/article/tag/delete` -> DELETE `/api/article/tag`
6. 更新文章 POST `/api/article/update` -> PATCH `/api/article/:id`
7. 添加文章评论 POST `/api/article/comment` -> POST `/api/article/:id/comment`
8. 获取文章评论 GET `/api/article/comment` -> GET `/api/article/:id/comment`
9. 相册删除 POST `/api/album/album/delete` -> DELETE `/api/album/:id`
10. 获取相册列表 GET `/api/album/album` -> GET `/api/album`
11. 添加相册 POST `/api/album/album` -> POST `/api/album`
12. 添加相册图片 POST `/api/album/group` -> POST `/api/album/:id/group`
13. 获取相册图片 GET `/api/album/group` -> GET `/api/album/:id/group`
14. 删除相册图片 POST `/api/album/group/delete` -> DELETE `/api/album/group/:id`
15. 获取学习笔记列表 GET `/api/learn/list` -> GET `/api/learn`
16. 获取文章详情 GET `/api/learn/info` -> GET `/api/learn/:id`
17. 删除文章 POST `/api/learn/delete` -> DELETE `/api/learn/:id`
18. 添加文章 POST `/api/learn/add` -> POST `/api/learn`
19. 更新文章 POST `/api/learn/update` -> PATCH `/api/learn/:id`
20. 获取打卡列表 GET `/api/plan/list` -> GET `/api/plan`
21. 添加打卡记录 POST `/api/plan/list` -> POST `/api/plan`
22. 删除打卡记录 POST `/api/plan/list/delete` -> DELETE `/api/plan/:id`
23. 获取说说列表 GET `/api/think/list` -> GET `/api/think`
24. 获取说说详情 GET `/api/think/info` -> GET `/api/think/:id`
25. 添加说说 POST `/api/think/info` -> POST `/api/think`
26. 删除说说 POST `/api/think/delete` -> DELETE `/api/think/:id`
26. 修改说说 POST `/api/think/delete` -> POST `/api/think/:id`