navigator.mozSetMessageHandler("activity", function (activityRequest) {
var option = activityRequest.source;
var url1 = option.data.url;
var url = decodeURIComponent(url1);
remoteStorage.mcnotes.addbookmark(url);
});