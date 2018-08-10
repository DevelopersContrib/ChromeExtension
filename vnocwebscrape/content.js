console.log('content.js');
var rowVal;

chrome.runtime.sendMessage({
	from:    'content',
	subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	if ((msg.from === 'popup') && (msg.subject === 'getTable')) {
		//document.querySelectorAll('input').length;
		response($('div#trkr-tbl-container')[0].outerHTML);
	}else if ((msg.from === 'popup') && (msg.subject === 'updateContentTable')) {
		$('div#trkr-tbl-container').replaceWith(msg.html);
	}
});





if($('#trkr-selector').length==0){
	$("body").append('<div id="trkr-selector">'+
	'<div id="trkr-selector-top"></div>'+
	'<div id="trkr-selector-left"></div>'+
	'<div id="trkr-selector-right"></div>'+
	'<div id="trkr-selector-bottom"></div>'+
	'</div>');
	
	var $head = $("head"); 
	var css = '<style>'+
	
	'#trkr-selector-top, #trkr-selector-bottom {'+
		'background: blue;'+
		'height:3px;'+
		'position: fixed;'+
		'transition:all 300ms ease;'+
		'z-index:99999;'+
	'}'+
	'#trkr-selector-left, #trkr-selector-right {'+
		'background: blue;'+
		'width:3px;'+
		'position: fixed;'+
		'transition:all 300ms ease;'+
		'z-index:99999;'+
	'}'+

	/*'.n{'+
	 '-webkit-transform: scale(3) translateX(100px)'+
	'}'+*/

	'.trkr-selectedelement {'+
		'border-width: 2px !important;'+
		'border-color: red !important;'+
		'border-style: solid !important;'+
	'}';
	
	'</style>';
	$head.append(css);
	
	var tbl = ('<div id="trkr-tbl-container" class="stdform" style="margin-left:10px">'+
	'<a id="btn-export-row" href="javascript:;" class="btn btn-primary trkr-btn-export trkr-btn-tbl" style="display:none;color:#ffff;background: #333;margin-bottom:10px">Export to CSV</a>'+
	'<button class="btn btn-primary trkr-btn-proceed trkr-btn-tbl" style="display:none;color:#ffff;background: #333;margin-bottom:10px">Proceed to Research</button>'+	
	'<button style="display:none;background: #333;margin-bottom:10px;color:#ffff;" class="trkr-btn-tbl btn btn-danger  trkr-btn-remove">Delete Selected</button>'+
	'<form id="trkr-frmprocess" method="POST" action="https://manage.vnoc.com/research/tool" target="_blank">'+			
	'</form>'+
	'<table border=1 id="trkr-result" class="stdtable" style="background: #fff;"></table>'+
	'</div>');
	
	
	
	if(document.getElementById('notifyvnoc')==undefined){
		var css = '<style>.trkr-popup{z-index:99999;position:fixed;left:0;top:0;height:100%;width:450px;background-color:transparent;;opacity:0;visibility:hidden;-webkit-transition:opacity .3s 0s,visibility 0 .3s;-moz-transition:opacity .3s 0s,visibility 0 .3s;transition:opacity .3s 0s,visibility 0 .3s}.trkr-popup.is-visible{opacity:1;visibility:visible;-webkit-transition:opacity .3s 0s,visibility 0 0;-moz-transition:opacity .3s 0s,visibility 0 0;transition:opacity .3s 0s,visibility 0 0}.trkr-popup-container{overflow:auto;height: 70%;position:relative;margin:4em auto;background:#FFF;border-radius:.25em .25em .4em .4em;text-align:center;box-shadow:0 0 20px rgba(0,0,0,0.2);-webkit-transform:translateY(-40px);-moz-transform:translateY(-40px);-ms-transform:translateY(-40px);-o-transform:translateY(-40px);transform:translateY(-40px);-webkit-backface-visibility:hidden;-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;transition-property:transform;-webkit-transition-duration:.3s;-moz-transition-duration:.3s;transition-duration:.3s}.trkr-popup-container p{padding:3em 1em}.trkr-popup-container .cd-buttons:after{content:"";display:table;clear:both}.trkr-popup-container .cd-buttons li{float:left;width:50%}.trkr-popup-container .cd-buttons a{display:block;height:60px;line-height:60px;text-transform:uppercase;color:#FFF;-webkit-transition:background-color .2s;-moz-transition:background-color .2s;transition:background-color .2s}.trkr-popup-container .cd-buttons li:first-child a{background:#fc7169;border-radius:0 0 0 .25em}.no-touch .trkr-popup-container .cd-buttons li:first-child a:hover{background-color:#fc8982}.trkr-popup-container .cd-buttons li:last-child a{background:#b6bece;border-radius:0 0 .25em 0}.no-touch .trkr-popup-container .cd-buttons li:last-child a:hover{background-color:#c5ccd8}.trkr-popup-container .trkr-popup-close{position:absolute;top:8px;right:8px;width:30px;height:30px}.trkr-popup-container .trkr-popup-close::before,.trkr-popup-container .trkr-popup-close::after{content:"";position:absolute;top:12px;width:14px;height:3px;background-color:#8f9cb5}.trkr-popup-container .trkr-popup-close::before{-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);left:8px}.trkr-popup-container .trkr-popup-close::after{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg);right:8px}.is-visible .trkr-popup-container{-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}</style>';
		var html = '<div id="notifyvnoc" class="trkr-popup" role="alert">	<div  class="trkr-popup-container"><div id="notifyvnocmsg">'+tbl+'</div><ul class="cd-buttons"></ul><a href="#0" class="trkr-popup-close img-replace">&nbsp;</a></div></div>';
		jQuery('body').append(css+html);
		//$( "#notifyvnoc" ).draggable();
	}
	
	jQuery('.trkr-popup').off('click').on('click', function(event){
		if( jQuery(event.target).is('.trkr-popup-close') || jQuery(event.target).is('.trkr-popup') ) {
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
			///jQuery('.trkr-popup').addClass('is-visible');
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
		row.append($('<td />').html('<input class="trkr-chck_row" type="checkbox" value="" />'));
		for (j = 0; j < data[i].length; j++) {
			row.append($('<td />').html("<input type='text' value='"+data[i][j]+"' />"));
		}
		rows.push(row);
	}
		//$('#trkr-result tr').remove();

	for(var x=0;x<rows.length;x++){
		$('#trkr-result').append(rows[x][0].outerHTML);
	}
	hideLoaderVNOC('writeTable');
	$('.trkr-btn-proceed').show();
	$('.trkr-btn-export').show();
	showFields();
	
}

function fixColumns()
{
	var highestRows = 0;
	$('#trkr-result tr').each(function(){
		var colCount = $(this).find('td').length;
		highestRows = colCount > highestRows?colCount:highestRows;
	});
	
	$('#trkr-result tr').each(function(){
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
		$('#trkr-result tr>td:nth-child('+(x+1)+')').each(function(){
			if($(this)[0].innerHTML!=undefined && $(this)[0].innerHTML!=''){
				hasValue = true;
			}
		});
		if(!hasValue){
			$('#trkr-result tr>td:nth-child('+(x+1)+')').addClass('forRemove');
		}
	}
	$('.forRemove').remove();
}

function showFields()
{
	$('#trkr-result').find('#fields').remove();
	fixColumns();
	var select = '<select id="" class="form-control trkr-selectfields">'+
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
	
	var colLength = $('#trkr-result tr:first td').length-1;
	var firstTD = '';
	
	var row = $('<tr />');
	row.attr('id','fields');
	row.append($('<td />').html('<input class="chckall" type="checkbox" value="" />'));
	for(var x=0; x<colLength;x++){
		row.append($('<td />').html(select));
	}
	
	$('#trkr-result').prepend(row);
}

function endSelect(){
	console.log('end select');
}