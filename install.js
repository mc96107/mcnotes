if (navigator.userAgent.indexOf("Firefox")!=-1){
var requestt = navigator.mozApps.getSelf();
requestt.onsuccess = function() {
  if (requestt.result) {
	document.getElementById('installdiv').innerHTML='';
  } else {
    document.getElementById('installdiv').innerHTML=' <button onclick="var request = navigator.mozApps.install('+"'"+"https://mcnotes.5apps.com/manifest.webapp"+"'"+');request.onsuccess = function() {};request.onerror = function() {};"> Install</button>';
  }
};}

