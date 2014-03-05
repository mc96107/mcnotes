if (navigator.userAgent.indexOf("Firefox")!=-1){
var requestt = navigator.mozApps.getSelf();
requestt.onsuccess = function() {
  if (requestt.result) {
	document.getElementById('installdiv').innerHTML='';
  } else {
    document.getElementById('installdiv').innerHTML=' <a href="" onclick="var request = navigator.mozApps.install('+"'"+"https://mc96107.dyndns.org:10022/manifest.webapp"+"'"+');request.onsuccess = function() {};request.onerror = function() {};"> Install</a>';
  }
};}

