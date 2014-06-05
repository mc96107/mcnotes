if(navigator.mozSetMessageHandler){
navigator.mozSetMessageHandler("activity", function (activityRequest) {
var option = activityRequest.source;
var url1 = option.data.url;
var url = decodeURIComponent(url1);

var todayb = new Date();
var ddb = todayb.getDate(); ddb<10 ? ddb="0"+ddb : 0;
var mmb = todayb.getMonth()+1; mmb<10 ? mmb="0"+mmb : 0; //January is 0!
var yyyyb = todayb.getFullYear();



 var bookmarkprompt = prompt('title');
 if (bookmarkprompt) remoteStorage.mcnotes.writeFile('bookmarks/'+yyyyb+'/'+mmb+'/'+ddb+'/'+bookmarkprompt+'.md',url);
else 
remoteStorage.mcnotes.writeFile('bookmarks/'+yyyyb+'/'+mmb+'/'+ddb+'/'+url.split('/')[2]+'.md',url);
});
}
