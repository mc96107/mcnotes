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
var list=document.querySelector("#list");
//var lll=list;
var synctmp=1;
var indxarr=[];
var listf=document.querySelector("#listf");
var edtr=document.querySelector("#edtr");
var mrkd=document.querySelector("#mrkd");
var actioncon=document.querySelector("#actioncon");
var actionconl=document.querySelector("#actionconl");
var eventrf = new Event('readf');

function showError(error){alert('error');}

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
about:4
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
//var flipbx = document.querySelector('x-deck');
/*var index = flipbx.selectedIndex(flipbx.selectedCard());
if (index!=card[crd])
flipbx.showCard(card[crd]);
else flipbx.showCard(card.map);*/
flipbx.showCard(card[crd]);
if(crd=='edit') {
actionconl.innerHTML ='<i class="fa fa-list-ul"></i>';
actionconl.onclick=function() {flpcrd('list')};
actioncon.innerHTML ='<i class="fa fa-eye"></i>';
actioncon.onclick=function() {flpcrd('view')};
}
else if(crd=='view') {
actionconl.innerHTML ='<i class="fa fa-list-ul"></i>';
actionconl.onclick=function() {flpcrd('list')};
actioncon.innerHTML ='<i class="fa fa-pencil"></i>';
actioncon.onclick=function() {flpcrd('edit')};
}
else if(crd=='list') {
actionconl.innerHTML ='<i class="fa fa-wrench"></i>';
actionconl.onclick=function() {flpcrd('settings')};
actioncon.innerHTML='<i class="fa fa-file-o"></i>';
actioncon.onclick=function(){
 var nfld = prompt('new file','');
 if (nfld) remoteStorage.mcnotes.createFile(nfld,'');
 //remoteStorage.mcnotes.readFile(nfld);
 };
 /*
 var x=document.createElement('button'); x.innerHTML='<i class="fa fa-expand"></i>';x.onclick=function(){setclli(list.childNodes[0],'isDir current');remoteStorage.mcnotes.expand('');};
  var y=document.createElement('button'); y.innerHTML='<i class="fa fa-compress"></i>';y.onclick=function(){setclli(list.childNodes[0],'isDir');remoteStorage.mcnotes.collapse('');};
  document.querySelector('x-appbar').heading.appendChild(x);  document.querySelector('x-appbar').heading.appendChild(y);*/
  var ttt='<button onclick="setclli(list.childNodes[0],'+"'"+'isDir current'+"'"+');remoteStorage.mcnotes.expand('+"'"+"'"+');"><i class="fa fa-expand"></i></button>'+'<button onclick="setclli(list.childNodes[0],'+"'"+'isDir'+"'"+');remoteStorage.mcnotes.collapse('+"'"+"'"+');"><i class="fa fa-compress"></i></button>';
 document.querySelector('x-appbar').heading=ttt;

cfile="";cfolder="";//refreshlist();
//document.querySelector('x-appbar').heading='';
}
else if(crd=='settings') {
actionconl.innerHTML ='<i class="fa fa-list-ul"></i>';
actionconl.onclick=function() {flpcrd('list')};
actioncon.innerHTML ='<i class="fa fa-question"></i>';
actioncon.onclick=function() {flpcrd('about')};
}
else if(crd=='about') {
actionconl.innerHTML ='<i class="fa fa-wrench"></i>';
actionconl.onclick=function() {flpcrd('settings')};
actioncon.innerHTML ='<i class="fa fa-list-ul"></i>';
actioncon.onclick=function() {flpcrd('list')};
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
actioncon.innerHTML='<i class="fa fa-file-o"></i>';
actioncon.onclick=function(){
 var nfld = prompt('new file',cfolder);
 if (nfld) remoteStorage.mcnotes.createFile(nfld,'');
 //remoteStorage.mcnotes.readFile(nfld);
};
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
