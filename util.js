function decodeUtf8(arrayBuffer) {
var result = "";
var i = 0;
var c = 0;
var c1 = 0;
var c2 = 0;
 
var data = new Uint8Array(arrayBuffer);
 
// If we have a BOM skip it
if (data.length >= 3 && data[0] === 0xef && data[1] === 0xbb && data[2] === 0xbf) {
i = 3;
}
 
while (i < data.length) {
c = data[i];
 
if (c < 128) {
result += String.fromCharCode(c);
i++;
} else if (c > 191 && c < 224) {
if( i+1 >= data.length ) {
throw "UTF-8 Decode failed. Two byte character was truncated.";
}
c2 = data[i+1];
result += String.fromCharCode( ((c&31)<<6) | (c2&63) );
i += 2;
} else {
if (i+2 >= data.length) {
throw "UTF-8 Decode failed. Multi byte character was truncated.";
}
c2 = data[i+1];
c3 = data[i+2];
result += String.fromCharCode( ((c&15)<<12) | ((c2&63)<<6) | (c3&63) );
i += 3;
}
}
return result;
}
