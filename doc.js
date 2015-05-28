var retries = 0;
var tmpgear = false;
var timeoutIDx; 
var timeoutresetsync; 
var cacheforcesync = false; 

if(!RemoteStorage) {RemoteStorage = remoteStorage;}
RemoteStorage.defineModule('mcnotes', function(privateClient, publicClient) {
//privateClient.cache('');
var util = RemoteStorage.util;
  function rmRf(path) {
    if(util.isFolder(path)) {
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
//      return privateClient.remove(path);
      return remoteStorage.mcnotes.removeFile(path);
    }
  }


privateClient.declareType('index', {
"description": "index",
"type": "object"
});

  return {
    exports: {
    on: privateClient.on,
	//checkdir: function(p){return privateClient.getListing(p).then(function(objects){for(var item in objects) console.log(item);});},
	readdir: function(path,parent){privateClient.getListing(path).then(function(objects) {
		var ul = document.createElement("UL");
		if (path=='') indxarr=[];
		var ijk=0;
		for(var item in objects) {
		indxarr.push(path+item);
	    if((path+item).slice(-1)!='/') {
    		remoteStorage.mcnotes.indexer(path+item);
        }
		ul.appendChild(readfll(path+item));
		ijk=ijk+1;
		  }
		  if(!ijk) parent.className = 'hidden';
			else parent.appendChild(ul);
	});},
	collapse: function(path){privateClient.getListing(path).then(function(objects) {for(var item in objects) {colfl(path,item);}});},
	expand: function(path){privateClient.getListing(path).then(function(objects) {for(var item in objects) {expfl(path,item);}});},
	readFile: function(f){if (indxarr.indexOf(f)!=-1) {privateClient.getFile(f,cachefsyncfunc(cacheforcesync)).then(function(file) {
	cfile=f;
	edtr.value=file.data;
	mrkd.innerHTML=marked(file.data);
	flpcrd('view');
	breadfun(f);
	relatedfun(f);
	var fa=f.split('/');
	document.querySelector('x-appbar').heading=f.split('.md')[0];//fa[fa.length-1]
	edtr.dispatchEvent(eventrf);
	});}
	else remoteStorage.mcnotes.createFile(f,'');
	},
	searchdoc: function(f,b,ul){
	privateClient.getFile(f,cachefsyncfunc(cacheforcesync)).then(function(file) {
		if(file.data && file.data.indexOf(b)!=-1) ul.appendChild(readflls(f));
		else return false;
		});
	},
	indexer: function(path){
        //if (remoteStorage.remote.online) {
		privateClient.getFile(path,cachefsyncfunc(cacheforcesync)).then(function(file) {
		        var doc = {
		        	    "title": path,
		    			"body": file.data,
		    			"id": path
		        	};
		        idx.add(doc);
		        if (!tmpgear){
		        document.querySelector("#rotatingicon").innerHTML = '<br><center><i class="fa fa-cog fa-spin fa-5x"></i></center>';
		        document.querySelector("#rotatingicon").style.color = "#A3A3A3";
                tmpgear = true;}
		        window.clearTimeout(timeoutIDx);
		        timeoutIDx = window.setTimeout(function(){
                    tmpgear = false;
                    document.querySelector("#rotatingicon").innerHTML = '';
                    window.clearTimeout(timeoutresetsync);
                    timeoutresetsync = window.setTimeout(function(){
                        cacheforcesync = false; 
                    },remoteStorage.getCurrentSyncInterval()*5);
                },3000);
		     //   console.log(doc);
	        });
      /*  }
        else {
            var doc = {
                "title": path,
                "body": path,
                "id": path
                };
		        idx.add(doc);
        }*/
	},
	addbookmark: function(url){
	privateClient.getFile('bookmarks.md',cachefsyncfunc(cacheforcesync)).then(function(file) {
	if(file.data) var bookmarks=file.data;
	else bookmarks='';
	bookmarks=bookmarks+'  \n* '+url;
	remoteStorage.mcnotes.writeFile('bookmarks.md',bookmarks);
	});},
	writeFile: function(p,t){return privateClient.storeFile('text/plain', p, t).then(function(){
		idx.add({
	        	    "title": p,
	    			"body": t,
	    			"id": p
	    		});
		retries = 0;
	});},
	cwriteFile: function(p,t){return privateClient.storeFile('text/plain', p, t).then(function(){
	    refreshlist();//alert('conflicted copy, please reconnect');flpcrd('settings');
	   // var confl = confirm('conflicted copy, reconnect?');
       // if (confl) {remoteStorage.disconnect();flpcrd('settings');}
	    });
	},
	createFile: function(f,t){
	if (f.substring(f.length-3,f.length)!='.md') f=f+'.md';
	if (indxarr.indexOf(f)==-1){
	return privateClient.storeFile('text/plain', f, t).then(function(){
		//f.split("/").slice(0,-1).join("/")+"/";
		refreshlist();
	//remoteStorage.caching.waitForPath('/mcnotes/').then(function(){
	cfile=f;
	breadfun(f);
	relatedfun(f);
	edtr.value=t;
	flpcrd('edit');
	var fa=f.split('/');
	document.querySelector('x-appbar').heading=f.split('.md')[0];//fa[fa.length-1]
	edtr.dispatchEvent(eventrf);
	synctmp=1;
	});
	//});
	}
	else remoteStorage.mcnotes.readFile(f);
	},
	removeFile: function(f){privateClient.remove(f).then(function(){
		idx.remove({"id":f,"body":f,"title":f});
    var texttxt;
    var item = f;
	if(item.slice(-1)=='/') {texttxt=item.slice(0,item.length-1);}
	else {texttxt=item.split('.md')[0];}
        var frameid = document.getElementById(texttxt);
        if (frameid) {
            frameid.parentNode.removeChild(frameid);
        }
        /*
		if(!synctmp) var timeoutID = window.setTimeout(function(){
        //remoteStorage.mcnotes.removeFile(f);
        synctmp=1;syncrefreshlista();}, 5000);});
        */
        });
	},
	mf: function(p1,p2){privateClient.getFile(p1,cachefsyncfunc(cacheforcesync)).then(function(file){
	//privateClient.storeFile('text/plain', p2, file.data);
	remoteStorage.mcnotes.writeFile(p2,file.data);
	remoteStorage.mcnotes.removeFile(p1);
	document.querySelector('x-appbar').heading=p2.split('.md')[0];
	});},
	rmdir: function(dir){rmRf(dir);}
	},
      };
});
if (!localStorage.getItem('ini')) localStorage.setItem('ini','1');//dropbox auth ini
remoteStorage.access.claim('mcnotes', 'rw');
remoteStorage.caching.enable('/mcnotes/');
//remoteStorage.caching.enable('/public/mcnotes/');
remoteStorage.setApiKeys('dropbox', {api_key: 'kgpcm1nmvoo59z8'});
//remoteStorage.setApiKeys('googledrive', {client_id: '244222371468-mv7b7aro2ljt4ln6jr5viunmrq2ah9ql.apps.googleusercontent.com'});
if (localStorage.getItem('ini')=='1') {localStorage.setItem('ini','2');location.reload();}//dropbox auth ini
document.addEventListener('DOMComponentsLoaded', function(){
remoteStorage.displayWidget({domID:"rswd"});
//remoteStorage.mcnotes.readdir('',list);
});
remoteStorage.mcnotes.on('change', function (evt) {
  if(evt.origin === 'conflict') {
    //console.log('conflict');console.log(evt);
    //if (evt.newValue == ' ') 
    if (retries < 3) {
    window.setTimeout(function(){console.log('retry');remoteStorage.mcnotes.writeFile(evt.path.split('/mcnotes/')[1],evt.oldValue);},2000);retries++;
    }
    else {retries=0;
    remoteStorage.mcnotes.cwriteFile(evt.path.split('/mcnotes/')[1].split('.md')[0]+'_conflict'+'.md',evt.oldValue);}
}
});
//check periodically for syncing not completing and resolve
var intervalDelta = window.setInterval(checksyncing, 5*60*1000);
function checksyncing(){
if(!remoteStorage.sync.done) {
var timeoutDelta = window.setTimeout(function(){if(!remoteStorage.sync.done)remoteStorage.remote.fetchDelta(); }, 60*1000);
}
}

/*
remoteStorage.addEventListener('connected', function(){
document.addEventListener('DOMComponentsLoaded', function(){
refreshlist();
});
});

remoteStorage.addEventListener('wire-done', function(){
console.log('wiredone');
//if (synctmp) {refreshlist();synctmp=0;}
//refreshlist();
//if(list!=lll) {list.innerHTML='';remoteStorage.mcnotes.readdir('',list);lll=list;}
if(remoteStorage.sync.done) {console.log('syncdone');
if(searchdiv.className!='') list.className='';
refreshlist();}
});
*/
document.addEventListener('DOMComponentsLoaded', function(){
//remoteStorage.sync.sync().then(function(){refreshlist()});
remoteStorage.onChange('/mcnotes/',function(){

if (synctmp && remoteStorage.sync.done) {refreshlist();synctmp=0;}
});
remoteStorage.addEventListener('conflict', function(){
//remoteStorage.disconnect();
flpcrd('settings');
});
syncrefreshlista();
/*
remoteStorage.addEventListener('wire-done', function(){
if (synctmp && remoteStorage.sync.done) {refreshlist();synctmp=0;console.log('synced');}
});*/
});
//remoteStorage.onChange('/',function(){refreshlist();synctmp=0;});

//http://stackoverflow.com/questions/1211764/turning-nested-json-into-an-html-nested-list-with-javascript
function readfll(item){
	var li = document.createElement("LI");
	var a = document.createElement('a'); 
    var texttxt;
	if(item.slice(-1)=='/') {var textnode=document.createTextNode(item.slice(0,item.length-1));texttxt=item.slice(0,item.length-1);}
	else {var textnode=document.createTextNode(item.split('.md')[0]);texttxt=item.split('.md')[0];}
	a.appendChild(textnode);
	a.href = "#";
	a.t=item;
	if(item.slice(-1)=='/') a.onclick=function() {setcurfolder(this);};
	else a.onclick=function() {remoteStorage.mcnotes.readFile(this.t);};
	li.appendChild(a);
    li.id = texttxt;
	var x=document.createElement('button'); 
	x.innerHTML='<i class="fa fa-times"></i>';
	x.t=item;
	if(item.slice(-1)!='/') x.onclick=function(){if(confirm("remove "+this.t+" ?")) remoteStorage.mcnotes.removeFile(this.t);};
	else x.onclick=function(){if(confirm("remove "+this.t+" ?")) remoteStorage.mcnotes.rmdir(this.t);};
	x.className='endoftheline';
	li.appendChild(x);
	if(item.slice(-1)=='/') {
		if(localStorage.getItem(item)) li.className=localStorage.getItem(item);
		else li.className='isDir';
	}
	else li.className='isnotDir';
	/*li.onclick=function(){if (this.className=='isDir'){this.className='isDir current';}
	else if (this.className=='isDir current'){this.className='isDir';}
	else {this.className=this.className;}
	};*/
	if(item.slice(-1)=='/') remoteStorage.mcnotes.readdir(item,li);
	return li;
}

function colfl(path,item){if(item.slice(-1)=='/') {if(localStorage.getItem(path+item)) localStorage.removeItem(path+item); remoteStorage.mcnotes.collapse(path+item);}}
function expfl(path,item){if(item.slice(-1)=='/') {if(localStorage.getItem(path+item)) localStorage.removeItem(path+item); remoteStorage.mcnotes.expand(path+item);}}
function srch(t){}//search function regex filter array

var idx = lunr(function () {
    this.field('title', { boost: 10 })
    this.field('body')
    this.ref('id')
});
//var intervalID = window.setInterval(refreshlist, 60*1000);
function refreshlist(){
list.innerHTML='';remoteStorage.mcnotes.readdir('',list);
/*
	for (var i = 0; i < indxarr.length; i++) {
        if(indxarr[i].slice(-1)!='/') {
        	remoteStorage.mcnotes.indexer(indxarr[i]);
        }
    }
    */
//if(searchdiv.className=='hidden') list.className='';
}

function syncrefreshlista(){
var timeoutIDD = window.setTimeout(synclista, 1000);

function synclista(){
if (remoteStorage.sync && synctmp && remoteStorage.sync.done) {refreshlist();synctmp=0;}
else {window.clearTimeout(timeoutIDD);
timeoutIDD = window.setTimeout(synclista, 1000);
}
}
}


function breadfun(f){
	//breadcrumbs list 
	breadcrumbs.push(f);
	while (breadcrumbs.length>10) breadcrumbs.shift();
	var ul = document.createElement("UL");	
	for (var i = 0; i < breadcrumbs.length; i++){
		var li = document.createElement("LI");
		var a = document.createElement('a'); 
		var textnode=document.createTextNode(breadcrumbs[i].split('.md')[0]);
		a.appendChild(textnode);
		a.href = "#";
		a.t=breadcrumbs[i];
		a.onclick=function() {remoteStorage.mcnotes.readFile(this.t);};
		li.appendChild(a);
		ul.appendChild(li);
	}
	document.querySelector("#breadcrumbs").innerHTML='';
	document.querySelector("#breadcrumbs").appendChild(ul);
}

function relatedfun(f){
var title=f.split('.md')[0];
//console.log(title);
srchfnidx(indxarr,title,relatednotesside);
srchfnidx(indxarr,title,relatednotesdiv);
}


function cachefsyncfunc(c){
    if (c) return remoteStorage.getCurrentSyncInterval()*2;
    else return false;
}

function cachefsyncfuncbtn(){
    cacheforcesync = true;
    refreshlist();flpcrd('list');
}