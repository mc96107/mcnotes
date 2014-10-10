marked.setOptions({
	gfm: true,
	pedantic: false,
	sanitize: false,
	tables: true,
	smartLists: true,
	langPrefix: 'language-'
});
var cfile="";
var cfolder="";
var frmclndr=0;
var breadcrumbs=[];
var list=document.querySelector("#list");
//var lll=list;
var synctmp=1;
var indxarr=[];
//var listf=document.querySelector("#listf");
var edtr=document.querySelector("#edtr");
var mrkd=document.querySelector("#mrkd");
var breadcrumbsdiv=document.querySelector("#breadcrumbs");
var relatednotesdiv=document.querySelector("#relatednotes");
var relatednotesside=document.querySelector("#relatednotesside");
var actioncon=document.querySelector("#actioncon");
var actionconl=document.querySelector("#actionconl");
var nav=document.querySelector("#nav");
var settingsbtn=document.querySelector("#settingsbtn");
var aboutbtn=document.querySelector("#aboutbtn");
var expandbtn=document.querySelector("#expandbtn");
var compressbtn=document.querySelector("#compressbtn");
var newfilebtn=document.querySelector("#newfilebtn");
var searchbtn=document.querySelector("#searchbtn");
var searchdiv=document.querySelector("#searchdiv");
var clearsrchformbtnn=document.querySelector("#clearsrchformbtnn");
var listsearchres=document.querySelector("#listsearchres");
nav.onclick=function(){nav.className='nav center hidden';};
expandbtn.innerHTML='<i class="fa fa-expand"></i>';
expandbtn.onclick=function(){setclli(list.childNodes[0],'isDir current');remoteStorage.mcnotes.expand('');};
compressbtn.innerHTML='<i class="fa fa-compress"></i>';
compressbtn.onclick=function(){setclli(list.childNodes[0],'isDir');remoteStorage.mcnotes.collapse('');};
settingsbtn.innerHTML='<i class="fa fa-wrench"></i>';
settingsbtn.onclick=function() {flpcrd('settings')};
aboutbtn.innerHTML='<i class="fa fa-info"></i>';
aboutbtn.onclick=function() {flpcrd('about')};
newfilebtn.innerHTML='<i class="fa fa-calendar"></i>';
newfilebtn.onclick=function(){
flpcrd('calendar');
 /*//var nfld = prompt('new file','');if (nfld) 
 var today = new Date();
 var dd = today.getDate(); dd<10 ? dd="0"+dd : 0;
var mm = today.getMonth()+1; mm<10 ? mm="0"+mm : 0; //January is 0!
var yyyy = today.getFullYear();
 remoteStorage.mcnotes.createFile(yyyy+'/'+mm+'/'+dd,' ');*/
};
searchbtn.innerHTML='<i class="fa fa-search"></i>';
searchbtn.onclick=function(){
tcls(searchdiv,'','hidden');tcls(list,'','hidden');
};
clearsrchformbtnn.innerHTML='<i class="fa fa-times-circle"></i>';
clearsrchformbtnn.onclick=function(){tcls(searchdiv,'','hidden');tcls(list,'','hidden');};

//swipe to prev/next note
function chckdr(f,s){
	var findx=indxarr.indexOf(f);
	findx+=s;
	if (findx<0) findx=indxarr.length-1;
	if (findx>indxarr.length-1) findx=0;
	while(indxarr[findx].slice(-1)=='/')
	{
	findx+=s;
	if (findx<0) findx=indxarr.length-1;
	if (findx>indxarr.length-1) findx=0;
	}
	return indxarr[findx];
}

var hammertime = Hammer(mrkd.parentElement).on("swipeleft", function(event) {
remoteStorage.mcnotes.readFile(chckdr(cfile,1));
});

var hammertime = Hammer(mrkd.parentElement).on("swiperight", function(event) {
remoteStorage.mcnotes.readFile(chckdr(cfile,-1));
});

var hammertime = Hammer(mrkd.parentElement).on("pinchin", function(event) {
flpcrd('breadcrumbs');
});

var hammertime = Hammer(mrkd.parentElement).on("pinchout", function(event) {
flpcrd('relatednotes');

});

var hammertime = Hammer(breadcrumbsdiv.parentElement).on("pinchout", function(event) {
remoteStorage.mcnotes.readFile(cfile);
});

var hammertime = Hammer(relatednotesdiv.parentElement).on("pinchin", function(event) {
remoteStorage.mcnotes.readFile(cfile);
});

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;
if(flipbx){
if(flipbx.selectedIndex==card.view){
    if (e.keyCode == '37' && e.ctrlKey) { // left arrow
	remoteStorage.mcnotes.readFile(chckdr(cfile,-1));
    }
    else if (e.keyCode == '39' && e.ctrlKey) { // right arrow
	remoteStorage.mcnotes.readFile(chckdr(cfile,1));
    }
	else if (e.keyCode == '66') { // right arrow
	flpcrd('breadcrumbs');
    }
	else if (e.keyCode == '83') { // right arrow
	flpcrd('relatednotes');
    }
 }

if(flipbx.selectedIndex==card.breadcrumbs || flipbx.selectedIndex==card.relatednotes){
	if (e.keyCode == '86') { // right arrow
	remoteStorage.mcnotes.readFile(cfile);
    }
}
}
}
var eventrf = new Event('readf');

function showError(error){alert('error');}
/*
window.onload = function() {
    var t = document.getElementsByTagName('textarea')[0];
    var offset= !window.opera ? (t.offsetHeight - t.clientHeight) : (t.offsetHeight + parseInt(window.getComputedStyle(t, null).getPropertyValue('border-top-width'))) ;
 
    var resize  = function(t) {
        t.style.height = 'auto';
        t.style.height = (t.scrollHeight  + offset ) + 'px';   
    }
 
    t.addEventListener && t.addEventListener('input', function(event) {
        resize(t);
    });
	
    t.addEventListener && t.addEventListener('readf', function(event) {
        resize(t);
    });
 
    t['attachEvent']  && t.attachEvent('onkeyup', function() {
        resize(t);
    });
}
*/
function pinput(){
mrkd.innerHTML=marked(edtr.value);
remoteStorage.mcnotes.writeFile(cfile, '\ufeff'+edtr.value);
}

//cards
var card={
list:0,
edit:1,
view:2,
settings:3,
about:4,
calendar:5,
breadcrumbs:6,
relatednotes:7
};
document.addEventListener('DOMComponentsLoaded', function(){
flipbx = document.querySelector('x-deck');
flpcrd('list');
if(!remoteStorage.connected) flpcrd('settings');
});
function flpnxt(){
var flipbx = document.querySelector('x-deck');
flipbx.shuffleNext();
}

function flpcrd(crd){
nav.className='nav center hidden';
//var flipbx = document.querySelector('x-deck');
/*var index = flipbx.selectedIndex(flipbx.selectedCard());
if (index!=card[crd])
flipbx.showCard(card[crd]);
else flipbx.showCard(card.map);*/
flipbx.showCard(card[crd]);
if(crd=='edit') {
/*
if(frmclndr){
actioncon.innerHTML ='<i class="fa fa-calendar"></i>';
actioncon.onclick=function() {flpcrd('calendar')};
}
else {
actioncon.innerHTML ='<i class="fa fa-list-ul"></i>';
actioncon.onclick=function() {flpcrd('list')};
}
*/

actioncon.innerHTML ='<i class="fa fa-terminal"></i>';
actioncon.onclick=function() {
 var sPattern = /\{\{([^)]+)\}\}/;
var str = edtr.value.match(sPattern)[1];
var indxarrr=0; 
var indxarri = 0; 
do { 
if(indxarr[indxarri].indexOf(str)!=-1 && indxarr[indxarri].slice(-1)!='/') {indxarrr=indxarr[indxarri]; }indxarri+=1;
}while(indxarri<indxarr.length && !indxarrr); 
if(indxarrr) {edtr.value=edtr.value.replace(sPattern,'[['+indxarrr+']]');pinput();}

};

actionconl.innerHTML ='<i class="fa fa-eye"></i>';
actionconl.onclick=function() {flpcrd('view')};
}
else if(crd=='view') {
if(frmclndr){
actioncon.innerHTML ='<i class="fa fa-calendar"></i>';
actioncon.onclick=function() {flpcrd('calendar')};
}
else {
actioncon.innerHTML ='<i class="fa fa-list-ul"></i>';
actioncon.onclick=function() {flpcrd('list')};
}
actionconl.innerHTML ='<i class="fa fa-pencil"></i>';
actionconl.onclick=function() {flpcrd('edit')};
}
else if(crd=='list') {
actionconl.innerHTML ='<i class="fa fa-file-o"></i>';
actionconl.onclick=function(){
 var nfld = prompt('new file',cfolder);
 if (nfld) remoteStorage.mcnotes.createFile(nfld,' ');
};
actioncon.innerHTML='<i class="fa fa-ellipsis-v"></i>';
actioncon.onclick=function(){tcls(nav,'nav center hidden','nav center');};
 /*
 var x=document.createElement('button'); x.innerHTML='<i class="fa fa-expand"></i>';x.onclick=function(){setclli(list.childNodes[0],'isDir current');remoteStorage.mcnotes.expand('');};
  var y=document.createElement('button'); y.innerHTML='<i class="fa fa-compress"></i>';y.onclick=function(){setclli(list.childNodes[0],'isDir');remoteStorage.mcnotes.collapse('');};
  document.querySelector('x-appbar').heading.appendChild(x);  document.querySelector('x-appbar').heading.appendChild(y);
  var ttt='<button onclick="setclli(list.childNodes[0],'+"'"+'isDir current'+"'"+');remoteStorage.mcnotes.expand('+"'"+"'"+');"><i class="fa fa-expand"></i></button>';
+'<button onclick="setclli(list.childNodes[0],'+"'"+'isDir'+"'"+');remoteStorage.mcnotes.collapse('+"'"+"'"+');"><i class="fa fa-compress"></i></button>';
xtraicons1.innerHTML='<i class="fa fa-expand"></i>';
xtraicons1.onclick=function(){setclli(list.childNodes[0],'isDir current');remoteStorage.mcnotes.expand('');};
xtraicons2.innerHTML='<i class="fa fa-compress"></i>';
xtraicons2.onclick=function(){setclli(list.childNodes[0],'isDir');remoteStorage.mcnotes.collapse('');};
*/
//document.querySelector('x-appbar').heading='<form action="" method="get"><input type="text" name="search" placeholder="search"/><input type="reset" value="&#xf002" alt="clear" /></form>'; //http://jsbin.com/uloli3/63/edit
cfile="";cfolder="";frmclndr=0;//refreshlist();
document.querySelector('x-appbar').heading='mcnotes';
}
else if(crd=='settings') {
synctmp=1;
actionconl.innerHTML ='<i class="fa fa-list-ul"></i>';
actionconl.onclick=function() {flpcrd('list')};
actioncon.innerHTML ='<i class="fa fa-info"></i>';
actioncon.onclick=function() {flpcrd('about')};
document.querySelector('x-appbar').heading='settings';
}
else if(crd=='about') {
actionconl.innerHTML ='<i class="fa fa-wrench"></i>';
actionconl.onclick=function() {flpcrd('settings')};
actioncon.innerHTML ='<i class="fa fa-list-ul"></i>';
actioncon.onclick=function() {flpcrd('list')};
document.querySelector('x-appbar').heading='about';
}
else if(crd=='calendar') {
frmclndr=1;
document.querySelector("x-calendar").render();
actionconl.innerHTML ='<i class="fa fa-calendar-o"></i>';
actionconl.onclick=function() {
var today = new Date();
var dd = today.getDate(); dd<10 ? dd="0"+dd : 0;
var mm = today.getMonth()+1; mm<10 ? mm="0"+mm : 0; //January is 0!
var yyyy = today.getFullYear();
 remoteStorage.mcnotes.createFile(yyyy+'/'+mm+'/'+dd,' ');
};
actioncon.innerHTML ='<i class="fa fa-list-ul"></i>';
actioncon.onclick=function() {flpcrd('list')};
document.querySelector('x-appbar').heading='calendar';
}
else if(crd=='breadcrumbs' || crd=='relatednotes') {
actioncon.innerHTML ='<i class="fa fa-list-ul"></i>';
actioncon.onclick=function() {flpcrd('list')};
actionconl.innerHTML ='<i class="fa fa-arrow-left"></i>';
actionconl.onclick=function() {remoteStorage.mcnotes.readFile(cfile);};
//document.querySelector('x-appbar').heading='breadcrumbs';
}
else {
actionconl.onclick='';actionconl.innerHTML='';
actioncon.onclick='';actioncon.innerHTML='';
}//actioncon.innerHTML='';actionconl.innerHTML='';
}

var layout = document.getElementById('layout-1');
xtag.addEvents(document, {
        'tap:delegate(button)': function(){
                layout.maxcontent = !layout.maxcontent;
        }
});


function setcurfolder(f){
cfolder=f.t;
var fa=f.t.split('/');
//document.querySelector('x-appbar').heading=fa[fa.length-2];
//actioncon.innerHTML='<i class="fa fa-file-o"></i>';
/*newfilebtn.onclick=function(){
 var nfld = prompt('new file',cfolder);
 if (nfld) remoteStorage.mcnotes.createFile(nfld,' ');
 //remoteStorage.mcnotes.readFile(nfld);
};
*/
/*actionconl.innerHTML ='/';// '<i class="fa fa-bars"></i>'
actionconl.onclick=function() {flpcrd('list')};*/
if (f.parentElement.className=='isDir') f.parentElement.className='isDir current';
else f.parentElement.className='isDir';
localStorage.setItem(f.t,f.parentElement.className);
//list.innerHTML='';remoteStorage.mcnotes.readdir(f,list);
}

function headingcl(){
if (cfile){
 var nfl = prompt('new name',cfile.split('.md')[0]);
 if(nfl){
 if (nfl.substring(nfl.length-3,nfl.length)!='.md') nfl=nfl+'.md';
 remoteStorage.mcnotes.mf(cfile,nfl);
cfile=nfl;
}
}
}

//setclli(list.childNodes[0],'isDir current');remoteStorage.mcnotes.expand('');
//setclli(list.childNodes[0],'isDir');remoteStorage.mcnotes.collapse('');

function setclli(p,cl){
var t=p.childNodes;
for (var i = 0; i < t.length; i++) {
if(t[i].className=='isDir' || t[i].className=='isDir current'){
t[i].className=cl;
setclli(t[i].childNodes[2],cl);
}
}
}

function tcls(e,c1,c2){
if (e.className==c1) e.className=c2;
else e.className=c1;
}


function srchfn(a,b,p){
p.innerHTML='';
var ul = document.createElement("UL");
for (var i = 0; i < a.length; i++) {
if (a[i].slice(-1)!='/'){
if(a[i].indexOf(b)!=-1 && a[i] != cfile) ul.appendChild(readflls(a[i]));
else remoteStorage.mcnotes.searchdoc(a[i],b,ul);
}
}
p.appendChild(ul);
}

function readflls(item){
	var li = document.createElement("LI");
	var a = document.createElement('a'); 
	if(item.slice(-1)=='/') var textnode=document.createTextNode(item.slice(0,item.length-1));
	else var textnode=document.createTextNode(item.split('.md')[0]);
	a.appendChild(textnode);
	a.href = "#";
	a.t=item;
	if(item.slice(-1)=='/') a.onclick=function() {setcurfolder(this);};
	else a.onclick=function() {remoteStorage.mcnotes.readFile(this.t);};
	li.appendChild(a);
if(!cfile){
	var x=document.createElement('button'); 
	x.innerHTML='<i class="fa fa-times"></i>';
	x.t=item;
	if(item.slice(-1)!='/') x.onclick=function(){if(confirm("remove "+this.t+" ?")) remoteStorage.mcnotes.removeFile(this.t);};
	else x.onclick=function(){if(confirm("remove "+this.t+" ?")) remoteStorage.mcnotes.rmdir(this.t);};
	x.className='endoftheline';
	li.appendChild(x);
}
	if(item.slice(-1)=='/') {
		if(localStorage.getItem(item)) li.className=localStorage.getItem(item);
		else li.className='isDir';
	}
	else li.className='isnotDir';
	return li;
}
