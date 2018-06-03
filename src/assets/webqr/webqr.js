// QRCODE reader Copyright 2011 Lazar Laszlo
// http://www.webqr.com

var gCtx = null;
var gCanvas = null;
var c=0;
var stype=0;
var gUM=false;
var webkit=false;
var moz=false;
var v=null;

var imghtml='<div id="qrfile"><canvas id="out-canvas" width="320" height="240"></canvas>'+
    '<div id="imghelp">drag and drop a QRCode here'+
	'<br>or select a file'+
	'<input type="file" onchange="handleFiles(this.files)"/>'+
	'</div>'+
'</div>';

var vidhtml = '<center><video width="320" height="240" id="v" autoplay></video></center>';
var vidhtml2 = '<center><video controls width="320" height="240" id="v" autoplay></video></center>';

Number.prototype.toMoney = function() {

  var integer = this.toFixed(2).split('.')[0];
  var decimal = this.getDecimal();

  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if( !decimal || !decimal.length ) {
    decimal = "00";
  } else if ( decimal.length === 1) {
    decimal += '0';
  } else if ( decimal.length > 2 ) {
    decimal = decimal.substr(0, 2);
  }

  return integer + '.' + decimal;
};


Number.prototype.getDecimal = function() {
  var n = Math.abs(this);
  var dec = n - Math.floor(n);
  dec = ( Math.round( dec * 100 ) / 100 ).toString();

  if( dec.split('.').length ) {
    return dec.split('.')[1];
  } else return "";
};

    function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    if(cname == "ID"){
      window.sID = cvalue;
    }else{
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}

function getCookie(cname) {

    if(cname == "ID"){
        if(typeof window.sID == "undefined"){
          return "";
        }else{
          return window.sID;
        }
    }

    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}    
        

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}
function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;
  if(files.length>0)
  {
	handleFiles(files);
  }
  else
  if(dt.getData('URL'))
  {
	qrcode.decode(dt.getData('URL'));
  }
}

function checkCamera(){
  if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices){
  return 0;  
}else{
  return 1;
}

}


function handleFiles(f,a)
{
    console.log(f);
    if(typeof a == "undefined"){
        qrcode.callback = read;
    }else{
        qrcode.callback = readC;        
    }

	var o=[];

	for(var i =0;i<f.length;i++)
	{


    if (/^video/.test( f[i].type)){
          window.qrIndex = 1;
    window.qrList = {};
      window.ex2[0].push(ex2[1]);
      window.tfile = f[i];
      setTimeout(function(){
    document.getElementById("outdiv").innerHTML = vidhtml2;
    window.v=document.getElementById("v");
    window.v.src = (window.URL || window.webkitURL).createObjectURL(window.tfile);
window.v.addEventListener('loadedmetadata', function(e){
        initCanvas(window.v.videoWidth,window.v.videoHeight);
      });

    gUM = true;
    stype = 1;
    captureToCanvas();
    },1000);

    }else if (/^image/.test( f[i].type)){
        var reader = new FileReader();
        reader.onload = (function(theFile) {
        return function(e) {
			qrcode.decode(e.target.result);
        };
        })(f[i]);
        reader.readAsDataURL(f[i]);	
    }

    }
}

function initCanvas(w,h)
{
    gCanvas = document.getElementById("qr-canvas");
    gCanvas.style.width = w + "px";
    gCanvas.style.height = h + "px";
    gCanvas.width = w;
    gCanvas.height = h;
    gCtx = gCanvas.getContext("2d");
    gCtx.clearRect(0, 0, w, h);
}


function captureToCanvas() {
    if(stype!=1)
        return;
    if(gUM)
    {
        try{
            gCtx.drawImage(v,0,0,v.videoWidth,v.videoHeight,0,0,v.videoWidth,v.videoHeight);
            try{
                qrcode.decode();
            }
            catch(e){       
              //  console.log(e);
                setTimeout(captureToCanvas, 150);
            };
        }
        catch(e){       
               // console.log(e);
                setTimeout(captureToCanvas, 150);
        };
    }
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function read(a)
{

    if(a.substr(0,5) != "error" && a.trim() != ""){

      if(a.split(",").length > 2){
      

        var t = a.split(",");
        t.shift();
        var m = t.pop();
        var d = t.join(); 
        if(m != md5(d)){
            var tmp = m;
            m = t.pop();
            d = t.join();
            if(m != md5(d)){           
              setTimeout(captureToCanvas, 150);
              return;
            }else{
              window.md5total = tmp;
            }
        }
/*
        var t = a.split(",");
        t.shift();
        var m = t.pop().split(":");
        var d = t.join();
        if(m[0] == "MD5" && m.length > 1){
          if(m[1] != md5(d)){
            setTimeout(captureToCanvas, 150);
            return;
          }
        }else if(m[0] == "MD5TOTAL"){
          window.md5total = m[1];
          m = t.pop().split(":");
          d = t.join();
          if(m[1] != md5(d)){
            setTimeout(captureToCanvas, 150);
            return;
          }          
        }else{
            setTimeout(captureToCanvas, 150);
            return;          
        }
        */
        var k = a.split(",")[0].split(":");
        if(typeof window.qrList["qr"+k[0]] == "undefined"){
          window.qrIndex++;
          //window.qrList["qr"+k[0]] = a.split(/,(.+)/)[1];
          window.qrList["qr"+k[0]] = d;
        }
        
        if(window.qrIndex > k[1]){
          var fullQR = "";
          for(var i=1;i<=k[1];i++){
            fullQR += window.qrList["qr"+i];
          }

          if(window.md5total == md5(fullQR)){
            window.scanPage.readFullQR(fullQR);
            window.scanPage.setPercent(Math.round((window.qrIndex-1)/k[1]*100),window.qrIndex-1,k[1]);
          }else{
            window.qrIndex = 1;
            window.qrList = {}; 
            window.scanPage.setPercent(Math.round((window.qrIndex-1)/k[1]*100),window.qrIndex-1,k[1]);
            setTimeout(captureToCanvas, 150);
            return;
          }
        }else{
          window.scanPage.setPercent(Math.round((window.qrIndex-1)/k[1]*100),window.qrIndex-1,k[1]);
          setTimeout(captureToCanvas, 150);
          return;
        }


      }else{
          setTimeout(captureToCanvas, 150);
          return;  
      
      }
      //parseID(a);
    }


  if(stype==1){
      stype = 0;
      if(checkCamera() == 0){
  localStream.getTracks().forEach((track) => {
      track.stop();
    })
  }
      document.getElementById("outdiv").innerHTML = "";
  }

  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);



 
}


function parseID(a){
  var id = {};
  id.value = a;


          if(id.value.split(":").length > 1 && id.value.split(":")[0].length == 3){
            var v = [];
            v.push(id.value.split(":")[0]);
            id.value = id.value.split(":")[1];
          }else{
            var v = checkAddress(id.value);
          }

          return v;
/*
          var html = "";
          if(v.length>1){
              html = "Choose Coin:";
          }

          html += '<form id="selectc" onclick="refreshTableLocal()">';
          for(var k in v){
            html += '<label><input type="radio" name="selectc" value="'+v[k]+'" '+(k == 0 ? 'checked' : '')+'><img src="assets/'+v[k]+'.svg" width="100"/></label>';
          }
          
          html += '<br><br><b>'+id.value+'<br><br></b>Type label:';


          swal({  input:"text" , html: html, showCloseButton: true, showCancelButton: true }).then(function (i){  if(typeof i.value != "undefined"){addCoin(getCookie("ID"),document.getElementById("selectc").elements["selectc"].value+":"+id.value,i.value); }});

*/
}



function readC(a)
{

    if(stype==1){
    stype = 0;
localStream.getTracks().forEach((track) => {
    track.stop();
  })
    document.getElementById("outdiv").innerHTML = "";
}

if(WAValidator.validate(a,"BTC")){
      window.sendPage.setAddress(a);
    window.scanPage.navCtrl.pop();
}else{
    window.scanPage.navCtrl.pop();
}

}	

function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}
function success(stream) {
      window.localStream = stream;

    if(webkit)
        v.src = window.URL.createObjectURL(stream);
    else
    if(moz)
    {
        v.mozSrcObject = stream;
        v.play();
    }
    else
        v.src = stream;
    gUM=true;
    setTimeout(captureToCanvas, 500);
}
		
function error(error) {
    gUM=false;
    return;
}

function load()
{
	if(isCanvasSupported() && window.File && window.FileReader)
	{
		//initCanvas(320, 240);
		qrcode.callback = read;
	}


        
 


         window.HD = bitcoinjs.getLib().HDNode;
         window.bitcoinjs = bitcoinjs.getLib();

    
}

function updateCur(){
    var c = document.getElementById("CUR").value;
    setCookie("CUR",c);
    getMarketPrice(1);
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 100; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}



function checkAddress(a){
  var l = ["BTC","ETH","LTC"];
  var v = [];
  for(var k in l){
    if(WAValidator.validate(a,l[k]))
      v.push(l[k]);
  }

  if(v.length == 0){
    return ["BTC","ETH","LTC","XMR"];
  }
  return v;
}

function setwebcam(a)
{
    window.qrIndex = 1;
    window.qrList = {};  
    if(typeof a == "undefined"){
        qrcode.callback = read;
    }else{
        qrcode.callback = readC;        
    }
	
	var options = true;
	if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
	{
		try{
			navigator.mediaDevices.enumerateDevices()
			.then(function(devices) {
			  devices.forEach(function(device) {
				if (device.kind === 'videoinput') {
				  if(device.label.toLowerCase().search("back") >-1)
					options={'deviceId': {'exact':device.deviceId}, 'facingMode':'environment'} ;
				}
				console.log(device.kind + ": " + device.label +" id = " + device.deviceId);
			  });
			  setwebcam2(options);
			});
		}
		catch(e)
		{
			//console.log(e);
		}
	}
	else{
		console.log("no navigator.mediaDevices.enumerateDevices" );
		setwebcam2(options);
	}
	
}

function setwebcam2(options)
{
	console.log(options);
    if(stype==1)
    {
        setTimeout(captureToCanvas, 500);    
        return;
    }
    var n=navigator;
    document.getElementById("outdiv").innerHTML = vidhtml;
    v=document.getElementById("v");


    if(n.getUserMedia)
	{
		webkit=true;
        n.getUserMedia({video: options, audio: false}, success, error);
	}
    else
    if(n.webkitGetUserMedia)
    {
        webkit=true;
        n.webkitGetUserMedia({video:options, audio: false}, success, error);
    }
    else
    if(n.mozGetUserMedia)
    {
        moz=true;
        n.mozGetUserMedia({video: options, audio: false}, success, error);
    }


    stype=1;
    setTimeout(captureToCanvas, 500);
}

function setimg()
{
	document.getElementById("result").innerHTML="";
    if(stype==2)
        return;
    document.getElementById("outdiv").innerHTML = imghtml;
    //document.getElementById("qrimg").src="qrimg.png";
    //document.getElementById("webcamimg").src="webcam2.png";
    document.getElementById("qrimg").style.opacity=1.0;
    document.getElementById("webcamimg").style.opacity=0.2;
    var qrfile = document.getElementById("qrfile");
    qrfile.addEventListener("dragenter", dragenter, false);  
    qrfile.addEventListener("dragover", dragover, false);  
    qrfile.addEventListener("drop", drop, false);
    stype=2;
}
