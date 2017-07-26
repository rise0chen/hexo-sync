var fs  = require('fs');
var request = require('request');

var file={};
var state=0;
var path='./source/_posts/';
var host='http://115.159.216.99/Tool/Hexo/write/';
requestTask = function(){
  request(host+'f/g', function (error, response, content) {
    if(!error && (response.statusCode==200)){
      if(content.charCodeAt(0) == 0xFEFF){//rm bom
        content = content.slice(1);
      }
      //console.log('content:'+content);
      if(content=='null'){
        if(state==0){
          console.log('\nFinish.');
        }else{
          console.log('\nyou can exec "hexo sync [web file name] -r [new file name]" to rename it.');
          console.log('Or exec "hexo sync [web file name] -c" to cover it.');
        }
      }else{
        JSON.parse(content, function(k, v) {
          if(k=='id'){
            file['id']=v;
          }
          if(k=='filename'){
            file['name']=v;
          }
          if(k=='content'){
            fs.access(path+file['name'], (err) => {
              if(!err){
                state=1;
                console.log('Warning: "'+file['name']+'" already exists!');
              }else{
                fs.writeFile(path+file['name'], v, (err)=>{
                  if(err){
                    console.log(err);
                  }else{
                    request(host+'f/d/id/'+file['id'], requestTask);
                    console.log('Success: wrote "'+file['name']+'"');
                  }
                });
              }
            });
          }
        });
      }
    }
  });
}
var consoleOpts = {
  usage: 'sync [web file name] [options]',
  options: [
    {name: '-r, --rename', desc: 'rename file'},
    {name: '-c, --cover',  desc: 'cover file'}
  ]
};
hexo.extend.console.register('sync', 'Sync writing what you post on web', consoleOpts, function(args){
  if(args.r || args.rename){
    console.log('\nrename.');
  }else if (args.c || args.cover){
    console.log('\ncover.');
  }else{requestTask();}
});
