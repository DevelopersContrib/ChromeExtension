console.log('content.js');
var rowVal;

chrome.runtime.sendMessage({
	from:    'content',
	subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	if ((msg.from === 'popup') && (msg.subject === 'getTable')) {
		//document.querySelectorAll('input').length;
		response($('div#tbl-container')[0].outerHTML);
	}else if ((msg.from === 'popup') && (msg.subject === 'updateContentTable')) {
		$('div#tbl-container').replaceWith(msg.html);
	}
});





if($('#selector').length==0){
	$("body").append('<div id="selector">'+
	'<div id="selector-top"></div>'+
	'<div id="selector-left"></div>'+
	'<div id="selector-right"></div>'+
	'<div id="selector-bottom"></div>'+
	'</div>');
	
	var $head = $("head"); 
	var css = '<style>'+
	
	'#selector-top, #selector-bottom {'+
		'background: blue;'+
		'height:3px;'+
		'position: fixed;'+
		'transition:all 300ms ease;'+
		'z-index:99999;'+
	'}'+
	'#selector-left, #selector-right {'+
		'background: blue;'+
		'width:3px;'+
		'position: fixed;'+
		'transition:all 300ms ease;'+
		'z-index:99999;'+
	'}'+

	'.n{'+
	 '-webkit-transform: scale(3) translateX(100px)'+
	'}'+

	'.selectedelement {'+
		'border-width: 2px !important;'+
		'border-color: red !important;'+
		'border-style: solid !important;'+
	'}';
	
	'</style>';
	$head.append(css);
	
	var tbl = ('<div id="tbl-container" class="stdform" style="margin-left:10px">'+
	'<button class="btn btn-primary btn-proceed btn-tbl" style="display:none;color:#ffff;background: #333;margin-bottom:10px">Proceed to Research</button>'+
	'<button style="display:none;background: #333;margin-bottom:10px;color:#ffff;" class="btn-tbl btn btn-danger  btn-remove">Delete Selected</button>'+
	'<form id="frmprocess" method="POST" action="https://manage.vnoc.com/research/tool" target="_blank">'+			
	'</form>'+
	'<table border=1 id="result" class="stdtable" style="background: #fff;"></table>'+
	'</div>');
	
	
	
	if(document.getElementById('notifyvnoc')==undefined){
		var css = '<style>.cd-popup{z-index:99999;position:fixed;left:0;top:0;height:100%;width:450px;background-color:transparent;;opacity:0;visibility:hidden;-webkit-transition:opacity .3s 0s,visibility 0 .3s;-moz-transition:opacity .3s 0s,visibility 0 .3s;transition:opacity .3s 0s,visibility 0 .3s}.cd-popup.is-visible{opacity:1;visibility:visible;-webkit-transition:opacity .3s 0s,visibility 0 0;-moz-transition:opacity .3s 0s,visibility 0 0;transition:opacity .3s 0s,visibility 0 0}.cd-popup-container{overflow:auto;height: 70%;position:relative;margin:4em auto;background:#FFF;border-radius:.25em .25em .4em .4em;text-align:center;box-shadow:0 0 20px rgba(0,0,0,0.2);-webkit-transform:translateY(-40px);-moz-transform:translateY(-40px);-ms-transform:translateY(-40px);-o-transform:translateY(-40px);transform:translateY(-40px);-webkit-backface-visibility:hidden;-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;transition-property:transform;-webkit-transition-duration:.3s;-moz-transition-duration:.3s;transition-duration:.3s}.cd-popup-container p{padding:3em 1em}.cd-popup-container .cd-buttons:after{content:"";display:table;clear:both}.cd-popup-container .cd-buttons li{float:left;width:50%}.cd-popup-container .cd-buttons a{display:block;height:60px;line-height:60px;text-transform:uppercase;color:#FFF;-webkit-transition:background-color .2s;-moz-transition:background-color .2s;transition:background-color .2s}.cd-popup-container .cd-buttons li:first-child a{background:#fc7169;border-radius:0 0 0 .25em}.no-touch .cd-popup-container .cd-buttons li:first-child a:hover{background-color:#fc8982}.cd-popup-container .cd-buttons li:last-child a{background:#b6bece;border-radius:0 0 .25em 0}.no-touch .cd-popup-container .cd-buttons li:last-child a:hover{background-color:#c5ccd8}.cd-popup-container .cd-popup-close{position:absolute;top:8px;right:8px;width:30px;height:30px}.cd-popup-container .cd-popup-close::before,.cd-popup-container .cd-popup-close::after{content:"";position:absolute;top:12px;width:14px;height:3px;background-color:#8f9cb5}.cd-popup-container .cd-popup-close::before{-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);left:8px}.cd-popup-container .cd-popup-close::after{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg);right:8px}.is-visible .cd-popup-container{-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}</style>';
		var html = '<div id="notifyvnoc" class="cd-popup" role="alert">	<div  class="cd-popup-container"><div id="notifyvnocmsg">'+tbl+'</div><ul class="cd-buttons"></ul><a href="#0" class="cd-popup-close img-replace">&nbsp;</a></div></div>';
		jQuery('body').append(css+html);
		$( "#notifyvnoc" ).draggable();
	}
	
	jQuery('.cd-popup').off('click').on('click', function(event){
		if( jQuery(event.target).is('.cd-popup-close') || jQuery(event.target).is('.cd-popup') ) {
			event.preventDefault();
			jQuery(this).removeClass('is-visible');
		}
	});
	
	$(document).on('keydown', function ( e ) {
		if ((e.metaKey || e.ctrlKey) && ( String.fromCharCode(e.which).toLowerCase() === 'c') ) {
			var text = "";
			if (window.getSelection) {
				text = window.getSelection().toString();
			} else if (document.selection && document.selection.type != "Control") {
				text = document.selection.createRange().text;
			}
			if(text=='') return;
			writeTable([[text]]);
			///jQuery('.cd-popup').addClass('is-visible');
			chrome.runtime.sendMessage({
				from:    'content',
				subject: 'Copied',
				text:text
			});
		}
	});
}

function showLoaderVNOC(msg,msgid){
	var msgid = msgid==undefined?'loadervnoc':msgid;
	msg = msg==undefined?"Loading...":msg;
	jQuery('body').append('<div id="'+msgid+'" style="display: none;background: none repeat scroll 0 0 #000000;border-radius: 10px;bottom: 40px;color: #FFFFFF;'+
		'height: 100px;left: 45%;opacity: 0.8;padding: 10px;position: fixed;text-align: center;top: 50%;width: 250px;z-index: 999999;">'+
		'<img src="https://www.contrib.com/images/loading0.gif" alt="...">'+
		'<div><em>'+msg+'</em></div></div>');
	jQuery('body').find('#'+msgid).show();
}
function hideLoaderVNOC(msgid){
	var msgid = msgid==undefined?'loadervnoc':msgid;
	jQuery('body').find('#'+msgid).remove();
}

function getValues(element)
{
	if(element.is(':visible')){
		if(element.children().length>0){
			element.children().each(function(){
				getValues($(this));
			});
			
			var text = element.contents().filter(function() {
			  return this.nodeType == 3;
			}).text();
			text = text.trim();
			if(text!=undefined && text!=''){
				colVal.push(text);
			}
		}else{
			if(element.get(0).tagName=='IMG'){
				//console.log(element.attr('src'));
				var src = element.attr('src');
				if(element.attr('src').indexOf('//')==-1){
					src = window.location.hostname+'/'+src;
				}
				//colVal.push('<img style="width:100px" src="'+src+'" />');
				colVal.push(src);
				return element.attr('src');
			}else{
				//console.log(element[0].innerHTML);
				colVal.push(element[0].innerHTML.trim());
				return element[0].innerHTML.trim();
			}
		}
	}
}

function writeTable(data) {
	var rows = [];
	var row;
	showLoaderVNOC("Writing table "+data.length,'writeTable');
	for (i = 0; i < data.length; i = i + 1) {
		row = $('<tr />');
		row.append($('<td />').html('<input class="chck_row" type="checkbox" value="" />'));
		for (j = 0; j < data[i].length; j++) {
			row.append($('<td />').html("<input type='text' value='"+data[i][j]+"' />"));
		}
		rows.push(row);
	}
		//$('#result tr').remove();

	for(var x=0;x<rows.length;x++){
		$('#result').append(rows[x][0].outerHTML);
	}
	hideLoaderVNOC('writeTable');
	$('.btn-proceed').show();
	showFields();
	
}

function fixColumns()
{
	var highestRows = 0;
	$('#result tr').each(function(){
		var colCount = $(this).find('td').length;
		highestRows = colCount > highestRows?colCount:highestRows;
	});
	
	$('#result tr').each(function(){
		var colCount = $(this).find('td').length;
		if(highestRows>colCount){
			var diff = highestRows - colCount;
			for(var x=0;x<diff;x++){
				$(this).append('<td></td>');
			}
		}
	});
	
	for(var x=0;x<highestRows;x++){
		var hasValue = false;
		$('#result tr>td:nth-child('+(x+1)+')').each(function(){
			if($(this)[0].innerHTML!=undefined && $(this)[0].innerHTML!=''){
				hasValue = true;
			}
		});
		if(!hasValue){
			$('#result tr>td:nth-child('+(x+1)+')').addClass('forRemove');
		}
	}
	$('.forRemove').remove();
}

function showFields()
{
	$('#result').find('#fields').remove();
	fixColumns();
	var select = '<select id="" class="form-control selectfields">'+
		'<option value=""></option>'+
		'<option value="name">Name</option>'+
		'<option value="email">Email</option>'+
		'<option value="address">Address</option>'+
		'<option value="phone">Phone Number</option>'+
		'<option value="company">Company</option>'+
		'<option value="notes">Notes</option>'+
		'<option value="social">Social Accounts</option>'+
		'<option value="domains">Number Of Domains</option>'+
		'</select>';
	
	var colLength = $('#result tr:first td').length-1;
	var firstTD = '';
	
	var row = $('<tr />');
	row.attr('id','fields');
	row.append($('<td />').html('<input class="chckall" type="checkbox" value="" />'));
	for(var x=0; x<colLength;x++){
		row.append($('<td />').html(select));
	}
	
	$('#result').prepend(row);
}

function endSelect(){
	console.log('end select');
}