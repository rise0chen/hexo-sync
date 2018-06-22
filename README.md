# hexo-sync
[Hexo](http://hexo.io/)上的文章同步 插件。

## 介绍

## 安装
```bash
npm install hexo-sync --save
```

## 使用
1.注册并登录[http://user.crise.cn/](http://user.crise.cn/)  
2.在[http://user.crise.cn/Index/info](http://user.crise.cn/Index/info)上查看密钥  
3.编辑`_config.yml`文件  
```yaml
sync:
  uname: <uname>
  secret: <secret>
```
4.在[网页](http://tool.crise.cn/Hexo/write)上写作  
5.使用插件同步文章到电脑上  
```bash
hexo sync
```

## 许可证
MIT

## 相关链接
[我的博客](http://blog.crise.cn/about/hexo.html)  
[github](https://github.com/rise0chen/hexo-sync)  
[编辑器](http://tool.crise.cn/Hexo/write)  
