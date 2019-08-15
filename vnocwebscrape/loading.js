function showLoaderVNOC(msg,msgid){
	var msgid = msgid==undefined?'loadervnoc':msgid;
	msg = msg==undefined?"Loading...":msg;
	jQuery('body').append('<div id="'+msgid+'" style="display: none;background: none repeat scroll 0 0 #000000;border-radius: 10px;bottom: 40px;color: #FFFFFF;'+
		'height: 100px;left: 45%;opacity: 0.8;padding: 3px;position: fixed;text-align: center;top: 50%;width: 250px;z-index: 999999;">'+
		'<img src="https://www.contrib.com/images/loading0.gif" alt="...">'+
		'<div><em>'+msg+'</em></div></div>');
	jQuery('body').find('#'+msgid).show();
}
showLoaderVNOC('Processing, Please wait','loadingtracker');