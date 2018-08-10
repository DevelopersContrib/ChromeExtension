console.log('popup.js');

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
	if($('#trkr-result tr').length>1) $('#trkr-container_result').show();
	else $('#trkr-container_result').hide();
}

window.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.query({active: true,currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id,{from: 'popup', subject: 'getTable'},setTable);
	});
});

$(document).ready(function() {
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
	var $rows = jQuery('table#trkr-result td input:text').parents('tr'),

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



