var fs = require('hexo-fs');
var request = require('request');

var host='http://tool.crise.cn/Hexo/write';
var postDir = hexo.source_dir+'/_posts/';
var file={};

requestTask = function(){
	request(host+'?f=g&uname='+hexo.config.sync.uname+'&secret='+hexo.config.sync.secret, function (error, response, content) {
		if(!error && (response.statusCode==200)){
			if(content.charCodeAt(0) == 0xFEFF){//rm bom
				content = content.slice(1);
			}
			//console.log('content:'+content);
			JSON.parse(content, function(k, v) {
				if(k=='id'){
					file['id']=v;
				}else if(k=='filename'){
					file['name']=v;
				}else if(k=='content'){
					if(fs.existsSync(postDir+file['name'])){
						var i=1;
						while(fs.existsSync(postDir+'sync-'+i+'-'+file['name'])){i++;}
						file['name']='sync-'+i+'-'+file['name'];
					}
					fs.writeFile(postDir+file['name'], v, (err)=>{
						if(err){
							console.log(err);
						}else{
							request(host+'?f=d&uname='+hexo.config.sync.uname+'&secret='+hexo.config.sync.secret+'&id='+file['id'], requestTask);
							console.log('Success: wrote "'+file['name']+'"');
						}
					});
				}else if(k=='error'){
					if(v=='null'){
						console.log('\nFinish.');
					}else{
						console.log('\n'+v);
					}
				}
			});
		}else{
			console.log('net:'+response);
		}
	});
}
var consoleOpts = {};
hexo.extend.console.register('sync', 'Sync writing what you post on web', consoleOpts, function(args){
	requestTask();
});
