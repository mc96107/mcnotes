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
var lll=list;
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
settings:3 
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
actionconl.innerHTML ='<i class="fa fa-bars"></i>';
actionconl.onclick=function() {flpcrd('list')};
actioncon.innerHTML ='<i class="fa fa-eye"></i>';
actioncon.onclick=function() {flpcrd('view')};
}
else if(crd=='view') {
actionconl.innerHTML ='<i class="fa fa-bars"></i>';
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
 remoteStorage.mcnotes.createFile(nfld,'');
 //remoteStorage.mcnotes.readFile(nfld);
};
cfile="";cfolder="";
document.querySelector('x-appbar').heading='/';
}
else if(crd=='settings') {
actionconl.innerHTML ='<i class="fa fa-bars"></i>';
actionconl.onclick=function() {flpcrd('list')};
actioncon.onclick='';actioncon.innerHTML='';
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
cfolder=f;
var fa=f.split('/');
document.querySelector('x-appbar').heading=fa[fa.length-2];
actioncon.innerHTML='<i class="fa fa-file-o"></i>';
actioncon.onclick=function(){
 var nfld = prompt('new file',cfolder);
 remoteStorage.mcnotes.createFile(nfld,'');
 //remoteStorage.mcnotes.readFile(nfld);
};
actionconl.innerHTML ='/';// '<i class="fa fa-bars"></i>'
actionconl.onclick=function() {flpcrd('list')};
}

function headingcl(){
if (cfile){
 var nfl = prompt('new name',cfile);
 remoteStorage.mcnotes.mf(cfile,nfl);
cfile=nfl;
}
}
