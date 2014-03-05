if(!RemoteStorage) {RemoteStorage = remoteStorage;}
RemoteStorage.defineModule('mcnotes', function(privateClient, publicClient) {
//privateClient.cache('');
var util = remoteStorage.util;
  function rmRf(path) {
    if(util.isDir(path)) {
      return privateClient.getListing(path).then(function(items) {
	  if(items){
	  var ka=[];
	  for(var k in items) ka.push(k);
        return util.asyncEach(ka, function(item) {
//		console.log(path+':'+item);
          return rmRf(path + item);
        });}
		else return console.log('hide '+path);//privateClient.remove(path);
      });
    } else {
      return privateClient.remove(path);
    }
  }


privateClient.declareType('index', {
"description": "index",
"type": "object"
});

  return {
    exports: {
	//checkdir: function(p){return privateClient.getListing(p).then(function(objects){for(var item in objects) console.log(item);});},
	readdir: function(path,parent){privateClient.getListing(path).then(function(objects) {
		var ul = document.createElement("UL");
		var ijk=0;
		for(var item in objects) {
		ul.appendChild(readfll(path,item));
		ijk=ijk+1;
		  }
		  if(!ijk) parent.className = 'hidden';
			else parent.appendChild(ul);
	});},
	readFile: function(f){privateClient.getFile(f).then(function(file) {
	cfile=f;
	edtr.value=file.data;
	mrkd.innerHTML=marked(file.data);
	flpcrd('view');
	var fa=f.split('/');
	document.querySelector('x-appbar').heading=fa[fa.length-1].split('.md')[0];
	edtr.dispatchEvent(eventrf);
	});},
	addbookmark: function(url){
	privateClient.getFile('bookmarks.md').then(function(file) {
	if(file.data) var bookmarks=file.data;
	else bookmarks='';
	bookmarks=bookmarks+'  \n* '+url;
	remoteStorage.mcnotes.writeFile('bookmarks.md',bookmarks);
	});},
	writeFile: function(p,t){return privateClient.storeFile('text/plain', p, t);},
	createFile: function(f,t){
	if (f.substring(f.length-3,f.length)!='.md') f=f+'.md';
	return privateClient.storeFile('text/plain', f, t).then(function(){
	remoteStorage.caching.waitForPath('/mcnotes/').then(function(){
	cfile=f;
	edtr.value=t;
	flpcrd('edit');
	var fa=f.split('/');
	document.querySelector('x-appbar').heading=fa[fa.length-1].split('.md')[0];
	edtr.dispatchEvent(eventrf);
	synctmp=1;
	});
	});},
	removeFile: function(f){var timeoutID = window.setTimeout(refreshlist, 60000);privateClient.remove(f).then(function(){synctmp=1;});},
    	mf: function(p1,p2){privateClient.getFile(p1).then(function(file){
    	//privateClient.storeFile('text/plain', p2, file.data);
    	remoteStorage.mcnotes.writeFile(p2,file.data);
    	remoteStorage.mcnotes.removeFile(p1);
    	document.querySelector('x-appbar').heading=p2;
    	});},
    	rmdir: function(dir){rmRf(dir);}
    	},
      };
});
if (!localStorage.getItem('ini')) localStorage.setItem('ini','1');//dropbox auth ini
remoteStorage.access.claim('mcnotes', 'rw');
remoteStorage.caching.enable('/mcnotes/');
remoteStorage.caching.enable('/public/mcnotes/');
remoteStorage.setApiKeys('dropbox', {api_key: 'kgpcm1nmvoo59z8'});
remoteStorage.setApiKeys('googledrive', {client_id: '244222371468.apps.googleusercontent.com'});
if (localStorage.getItem('ini')=='1') {localStorage.setItem('ini','2');location.reload();}//dropbox auth ini
document.addEventListener('DOMComponentsLoaded', function(){
remoteStorage.displayWidget("rswd");
//remoteStorage.mcnotes.readdir('',list);
});
remoteStorage.addEventListener('sync-done', function(){
if (synctmp) {list.innerHTML='';remoteStorage.mcnotes.readdir('',list);synctmp=0;}
//if(list!=lll) {list.innerHTML='';remoteStorage.mcnotes.readdir('',list);lll=list;}
});
//http://stackoverflow.com/questions/1211764/turning-nested-json-into-an-html-nested-list-with-javascript
function readfll(path,item){
	var li = document.createElement("LI");
	var a = document.createElement('a'); 
	if(item.slice(-1)=='/') var textnode=document.createTextNode(item.slice(0,item.length-1));
	else var textnode=document.createTextNode(item);
	a.appendChild(textnode);
	a.href = "#";
	a.t=path+item;
	if(item.slice(-1)=='/') a.onclick=function() {setcurfolder(this.t)};
	else a.onclick=function() {remoteStorage.mcnotes.readFile(this.t);};
	li.appendChild(a);

	var x=document.createElement('button'); 
	x.innerHTML='<i class="fa fa-times"></i>';
	x.t=path+item;
	if(item.slice(-1)!='/') x.onclick=function(){if(confirm("remove "+this.t+" ?")) remoteStorage.mcnotes.removeFile(this.t);};
	else x.onclick=function(){if(confirm("remove "+this.t+" ?")) remoteStorage.mcnotes.rmdir(this.t);};
	x.className='endoftheline';
	li.appendChild(x);
	
	if(item.slice(-1)=='/') remoteStorage.mcnotes.readdir(path+item,li);
	return li;
}
//var intervalID = window.setInterval(refreshlist, 60*1000);
function refreshlist(){
list.innerHTML='';remoteStorage.mcnotes.readdir('',list);
}
