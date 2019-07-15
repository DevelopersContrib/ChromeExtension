document.getElementById("startwebcrape").addEventListener('click', () => {
	var elem = document.getElementById("startwebcrape");
	
    if (elem.innerHTML=="Start"){
		elem.innerHTML="End";
		chrome.tabs.executeScript({file: "startSelect.js"});
		chrome.browserAction.setBadgeText({text: 'Start'});
    }else {
		elem.innerHTML ="Start";
		chrome.tabs.executeScript({file: "endSelect.js"});
		
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.storage.sync.get(['count'], function(item) {
				var current_count = item.count['tab'+tabs[0].id];
				var obj = item.count;
				if(current_count==undefined){
					current_count = 0;					
				}
				obj['tab'+tabs[0].id] = current_count;
				chrome.storage.sync.set({count: obj});
				if(current_count==0)
					chrome.browserAction.setBadgeText({text: ''});
				else
					chrome.browserAction.setBadgeText({text: current_count+''});
			});
		});
	}
});

function setTable(info) {
	if(info == undefined) window.location.reload();
	document.getElementById('trkr-container_result').innerHTML =  info;
	if($('#trkr-result tr').length>1){
		$('#trkr-container_result').show();
		$('.no-activity').hide();
	}
	else $('#trkr-container_result').hide();
}

window.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.query({active: true,currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id,{from: 'popup', subject: 'getTable'},setTable);
	});
});

function _cookie(key, value, options) {
	// key and value given, set cookie...
	if (arguments.length > 1 && (value === null || typeof value !== "object")) {
		options = options || {};

		if (value === null) {
			options.expires = -1;
		}

		if (typeof options.expires === 'number') {
			var days = options.expires, t = options.expires = new Date();
			//t.setDate(t.getDate() + days);
			t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
		}

		return (document.cookie = [
			encodeURIComponent(key), '=',
			options.raw ? String(value) : encodeURIComponent(String(value)),
			options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		].join(''));
	}

	// key and possibly options given, get cookie...
	options = value || {};
	var result, decode = options.raw ? function (s) {
		return s;
	} : decodeURIComponent;
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
}

function getCookies(callback) {
    chrome.cookies.get({"url": 'http://localhost', "name": 'trackers-save-page'}, function(cookie) {
        if(callback) {
            callback(cookie);
        }
    });
}

function setCookies(value, callback) {
	chrome.cookies.set({ url: "http://localhost", name: "trackers-save-page", value: value, expirationDate: (new Date().getTime()/1000) + 3600 },function(cookie){
        if(callback) {
            callback(cookie);
        }
    });
}

function initRemove(){
	$(document).on('click','.remove-save-page', function(){
		var url = $(this).attr('data-url');
		$(this).parents('li').remove();
		
		getCookies(function(cookie){
			if(cookie!=undefined){
				var c = cookie.value.split('||');
				var index = c.indexOf(url);
				
				if (index > -1) {
					c.splice(index, 1);
					setCookies(c.join('||'));
				}
			}
		});
		
		if($('#save-page li').length>0){
			$('.no-activity').hide();
			$('.page-saved-container').show();
		}else{

			if($('#trkr-result tr').length>0){
				$('.no-activity').hide();
			}else{
				$('.no-activity').show();			
			}
			$('.page-saved-container').hide();
		}
	});
}

function initClickSavePage(){
	$(document).on('click','.load-page', function(){
		var newurl = $(this).html();
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.update(tabs[0].id, {url: newurl});
		});
	});
}

$(document).ready(function() {
	getCookies(function(cookie){
		if(cookie!=undefined){
			var c = cookie.value.split('||');
			for(var x=0;x<c.length;x++){
				if(c[x]!='')
					$('#save-page').append('<li><a class="load-page" href="javascript:;">'+c[x]+'</a>&nbsp;<a data-url="'+c[x]+'" class="remove-save-page tarcker-btn-default tarcker-btn-danger tarcker-btn-sm" href="javascript:;">remove</a></li>');
			}
			if($('#save-page li').length>0){
				$('.no-activity').hide();
				$('.page-saved-container').show();
			}else{
				//setTimeout(function(){
					if($('#trkr-result tr').length>0){
						$('.no-activity').hide();
					}else{
						$('.no-activity').show();			
					}
				//},500);
				$('.page-saved-container').hide();
			}
			
			initClickSavePage();
			initRemove();
		}else{
			
			if($('#trkr-result tr').length>0){
				$('.no-activity').hide();
			}else{
				$('.no-activity').show();			
			}
			$('.page-saved-container').hide();
		}		
	});
	
	$(document).on('click','.trkr-btn-save-page', function(){
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs) {
			// and use that tab to fill in out title and url
			var tab = tabs[0];
			var url = tab.url;
			var val = '';
			
			getCookies(function(cookie){
				if(cookie!=undefined){
					var c = cookie.value.split('||');
					c.push(url);
					var uniqueUrl = [];
					$.each(c, function(i, el){
						if($.inArray(el, uniqueUrl) === -1) uniqueUrl.push(el);
					});
					
					$('#save-page li').remove();
					for(var x=0;x<uniqueUrl.length;x++){
						if(uniqueUrl[x]!='')
							$('#save-page').append('<li><a class="load-page" href="javascript:;">'+uniqueUrl[x]+'</a>&nbsp;<a data-url="'+uniqueUrl[x]+'" class="remove-save-page tarcker-btn-default tarcker-btn-danger tarcker-btn-sm" href="javascript:;">remove</a></li>');
					}

					val = uniqueUrl.join('||');
					setCookies(val);
				}else{
					$('#save-page').append('<li><a class="load-page" href="javascript:;">'+url+'</a>&nbsp;<a data-url="'+url+'" class="remove-save-page tarcker-btn-default tarcker-btn-danger tarcker-btn-sm" href="javascript:;">remove</a></li>');
					setCookies(url);
				}
			});

			//$('#save-page').append('<li><a class="load-page" href="javascript:;">'+url+'</a><a data-url="'+url+'" class="remove-save-page tarcker-btn-default tarcker-btn-danger tarcker-btn-sm" href="javascript:;">remove</a></li>');
			initClickSavePage();
			initRemove();
			$('.no-activity').hide();
			$('.page-saved-container').show();
		});
	});
    $(document).on('click','#trkr-tbl-container input[type=text]',function(){ this.select(); });

	$(document).on('click','.trkr-btn-remove',function(){
		jQuery('.trkr-chck_row:checked').parents('tr').remove();
		jQuery('.trkr-btn-remove').hide();
		//showFields();
		
		chrome.tabs.query({active: true,currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id,{from: 'popup', subject: 'updateContentTable',html:$('div#trkr-tbl-container')[0].outerHTML});
			var _rows = $('#trkr-tbl-container tr').length - 1;
			chrome.storage.sync.get(['count'], function(item) {
				var obj = item.count;

				obj['tab'+tabs[0].id] = _rows;
				chrome.storage.sync.set({count: obj});
				if(_rows==0)
					chrome.browserAction.setBadgeText({text: ''});
				else
					chrome.browserAction.setBadgeText({text: _rows+''});
			});
		});
	});
	
	$(document).on('click','#btn-export-row',function(){
		exportTableToCSV.apply(this, [$('table#trkr-result'), 'export.csv']);
	});
	
	function exportTableToCSV($table, filename) {
		jQuery.fn.reverse = [].reverse;
	var $rows = jQuery('table#trkr-result td input:text').parents('tr').reverse();
	
	tmpColDelim = String.fromCharCode(11),
	tmpRowDelim = String.fromCharCode(0),

	colDelim = '","',
	rowDelim = '"\r\n"',

	csv = '"' + $rows.map(function (i, row) {
		var $row = $(row),
			$cols = $row.find('td').find('input:text');

		return $cols.map(function (j, col) {
			var $col = $(col)
			var a = $col.clone();
			a.val($col.val().replace('<br>',' '));
			var text = a.val();
			
			return text.replace(/"/g, '""'); // escape double quotes

		}).get().join(tmpColDelim);

	}).get().join(tmpRowDelim)
		.split(tmpRowDelim).join(rowDelim)
		.split(tmpColDelim).join(colDelim) + '"',

	// Data URI
	csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

	   chrome.downloads.download({
		  url: csvData,
		  filename: filename
		});
   }
   
	$(document).on('click','.trkr-btn-proceed',function(){
		var data = [];
		var x = 0;
		jQuery('#trkr-frmprocess').html('');
		jQuery('#trkr-result tr').not('#fields').each(function(){
			var col = {name:'',email:'',address:'',phone:'',company:'',notes:'',social:'',domains:''};
			var hasValue = false;

			jQuery(this).find('td').not(':first').each(function(){
				var field = jQuery(this).attr('data-field');
				if(field!='' && field!=undefined){
					col[field] += jQuery(this).find('input').val()+" ";
					hasValue = true;
				}
			});
			
			if(hasValue){
				data.push(col);
				jQuery('#trkr-frmprocess').append('<input name="people['+x+'][name]" type="hidden" value="'+col.name.replace("'",'').replace('"','')+'" />');
				jQuery('#trkr-frmprocess').append('<input name="people['+x+'][email]" type="hidden" value="'+col.email.replace("'",'').replace('"','')+'" />');
				jQuery('#trkr-frmprocess').append('<input name="people['+x+'][address]" type="hidden" value="'+col.address.replace("'",'').replace('"','')+'" />');
				jQuery('#trkr-frmprocess').append('<input name="people['+x+'][phone]" type="hidden" value="'+col.phone.replace("'",'').replace('"','')+'" />');
				jQuery('#trkr-frmprocess').append('<input name="people['+x+'][company]" type="hidden" value="'+col.company.replace("'",'').replace('"','')+'" />');
				jQuery('#trkr-frmprocess').append('<input name="people['+x+'][notes]" type="hidden" value="'+col.notes.replace("'",'').replace('"','')+'" />');
				jQuery('#trkr-frmprocess').append('<input name="people['+x+'][social]" type="hidden" value="'+col.social.replace("'",'').replace('"','')+'" />');
				jQuery('#trkr-frmprocess').append('<input name="people['+x+'][domains]" type="hidden" value="'+col.domains.replace("'",'').replace('"','')+'" />');
				jQuery('#trkr-frmprocess').append('<input name="people['+x+'][twitter]" type="hidden" value="" />');
				x++;
			}
		});
		
		if(jQuery('#trkr-frmprocess').html()==''){
			alert('Please select column for research');
			return false;
		}else{
			jQuery('#trkr-frmprocess').attr('action',jQuery('.proceed:checked').val());
			jQuery('#trkr-frmprocess').submit();
		}
	});
	
	$(document).on('change','.trkr-selectfields',function(){
		var colIndex = $(this).parents('tr').children().index($(this).parent());
		$('#trkr-result tr td:nth-child('+(colIndex+1)+')').attr('data-field',$(this).val());
	});
	
	$(document).on('click','.chckall',function(){
		$('.trkr-chck_row').prop('checked',$(this).is(':checked'));
		if($(this).is(':checked')){
			$('.trkr-btn-remove').show();
		}else{
			$('.trkr-btn-remove').hide();
		}
	});
	
	$(document).on('click','.trkr-chck_row',function(){
		$('.chckall').prop('checked',$('.trkr-chck_row').length==$('.trkr-chck_row:checked').length);
		if($(this).is(':checked')){
			$('.trkr-btn-remove').show();
		}else{
			if($('.trkr-chck_row:checked').length==0) $('.trkr-btn-remove').hide();
		}
	});
	
});



