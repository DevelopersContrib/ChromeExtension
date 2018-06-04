document.getElementById("startwebcrape").addEventListener('click', () => {
	var elem = document.getElementById("startwebcrape");
    if (elem.innerHTML=="Start") elem.innerHTML="End";
    else elem.innerHTML ="Start";
	
	function modifyDOM() {
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
			
			$(document).on('click','#tbl-container input[type=text]',function(){ this.select(); });
			
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
			
			jQuery('.btn-remove').click(function(){
				jQuery('.chck_row:checked').parents('tr').remove();
				jQuery('.btn-remove').hide();
				showFields();
			});
			
			jQuery('.btn-proceed').click(function(){
				var data = [];
				var x = 0;
				jQuery('#frmprocess').html('');
				//jQuery('#frmprocess').append('<input name="imported_research_by" type="hidden" value="twitter" />');
				jQuery('#result tr').not('#fields').each(function(){
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
						jQuery('#frmprocess').append('<input name="people['+x+'][name]" type="hidden" value="'+col.name.replace("'",'').replace('"','')+'" />');
						jQuery('#frmprocess').append('<input name="people['+x+'][email]" type="hidden" value="'+col.email.replace("'",'').replace('"','')+'" />');
						jQuery('#frmprocess').append('<input name="people['+x+'][address]" type="hidden" value="'+col.address.replace("'",'').replace('"','')+'" />');
						jQuery('#frmprocess').append('<input name="people['+x+'][phone]" type="hidden" value="'+col.phone.replace("'",'').replace('"','')+'" />');
						jQuery('#frmprocess').append('<input name="people['+x+'][company]" type="hidden" value="'+col.company.replace("'",'').replace('"','')+'" />');
						jQuery('#frmprocess').append('<input name="people['+x+'][notes]" type="hidden" value="'+col.notes.replace("'",'').replace('"','')+'" />');
						jQuery('#frmprocess').append('<input name="people['+x+'][social]" type="hidden" value="'+col.social.replace("'",'').replace('"','')+'" />');
						jQuery('#frmprocess').append('<input name="people['+x+'][domains]" type="hidden" value="'+col.domains.replace("'",'').replace('"','')+'" />');
						jQuery('#frmprocess').append('<input name="people['+x+'][twitter]" type="hidden" value="" />');
						x++;
					}
				});
				
				if(jQuery('#frmprocess').html()==''){
					alert('Please select column for research');
					return false;
				}else{
					jQuery('#frmprocess').submit();
				}
			});
			
			$(document).on("keydown", function(e) {
				if (e.altKey) { // shift key pressed
					var text = "";
					if (window.getSelection) {
						text = window.getSelection().toString();
					} else if (document.selection && document.selection.type != "Control") {
						text = document.selection.createRange().text;
					}
					if(text=='') return;
					writeTable([[text]]);
					jQuery('.cd-popup').addClass('is-visible');
				}
			});
		}else{
			jQuery('.cd-popup').removeClass('is-visible');
			$('#result tr').remove();			
		}
		
		$('#selector').show();
		$('.selectedelementhide').removeClass('selectedelementhide').addClass('selectedelement');
		
		var elements = {
			top: $("body").find('#selector-top'),
			left: $("body").find('#selector-left'),
			right: $("body").find('#selector-right'),
			bottom: $("body").find('#selector-bottom')
		};

		$("body").find('a').each(function(){
			$(this).replaceWith($(this).attr('href','javascript:;').removeAttr('target').clone());
		});
		
		
		$("body").mousemove(function(event) {
			if(event.target.id.indexOf('selector') !== -1 || event.target.tagName === 'BODY' || event.target.tagName === 'HTML') return;
			var $target = $(event.target);
			
			targetElement = $target;
				targetOffset = $target[0].getBoundingClientRect(),
				targetHeight = targetOffset.height,
				targetWidth  = targetOffset.width;
			
			
			if($(targetElement).parents('#tbl-container').length>0) return;
			
			var elementType = $($target).get(0).tagName;
			
			elements.top.css({
				left:  (targetOffset.left - 4),
				top:   (targetOffset.top - 4),
				width: (targetWidth + 5)
			});
			elements.bottom.css({
				top:   (targetOffset.top + targetHeight + 1),
				left:  (targetOffset.left  - 3),
				width: (targetWidth + 4)
			});
			elements.left.css({
				left:   (targetOffset.left  - 5),
				top:    (targetOffset.top  - 4),
				height: (targetHeight + 8)
			});
			elements.right.css({
				left:   (targetOffset.left + targetWidth + 1),
				top:    (targetOffset.top  - 4),
				height: (targetHeight + 8)
			});			
		});
		
		$("body").contextmenu(function(){
			$("body").off('click');
			$("body").off('mousemove');
			$('#selector').hide();
			$('.selectedelement').removeClass('selectedelement').addClass('selectedelementhide');
		});
	
		$("body").on("click",function() {
		
			clickEelement = targetElement;
			if($(clickEelement).parents('#tbl-container').length>0) return;
			process2();

			jQuery('.cd-popup').addClass('is-visible');
			$("body").off('click');
			$("body").off('mousemove');
			$('#selector').hide();
			$('.selectedelement').removeClass('selectedelement').addClass('selectedelementhide');
			
			return true;
		});

		function process2()
		{
			showLoaderVNOC('Parsing contents');
			var elTarget = clickEelement;
			$('.btn-tbl').hide();
			gIndex = '';
			try{
				//$("body").find('*').removeClass('selectedelement');
				$('.selectedelement').removeClass('selectedelement');
			}catch(e){}
			var eType = $(elTarget).get(0).tagName;
			//console.log(eType);
			var eCls = $(elTarget).attr('class');
				
			if(eCls==undefined) eCls = '';
			
			eCls = eCls.trim();
			eCls = eCls.replace(/ +(?= )/g,'');
			eCls = eCls.split(' ');
			eCls = eCls.join('.');
			
			if(eCls!='') eCls = '.'+eCls;
			
			///console.log('element: '+eType+eCls);
			gTarget = eType+eCls;
			//===============================================================
			
			var siblings=$(elTarget).parent().children();
			var eIndex = siblings.index(elTarget);
			var parentEls = $(elTarget).parents();
			var parents = $(elTarget).parent();
			
			var strParents = [];
			$(parents).each(function(){
				var pType = $(this).get(0).tagName;
				var pCls = $(this).attr('class');
				
				if(pCls==undefined) pCls = '';
				
				pCls = pCls.trim();
				pCls = pCls.replace(/ +(?= )/g,'');
				pCls = pCls.split(' ');
				pCls = pCls.join('.');
				
				if(pCls!='') pCls = '.'+pCls;
				
				strParents.push(pType+pCls);
			});
			strParents.reverse();
			strParents = strParents.join(' ');
			var elements = strParents;
			
			$parent_ = $("body").find(elements); //find parent first;
			
			if($('#select_parent').val()==1){
				for(var x=0;x<$parent_.length;x++){
					if($parent_[x]==parents[0]){
						$parent_ = parents;
						gIndex = x;
						break;
					}
				}
			}
			
			var finalEl = $parent_.children(eType+eCls);
			if( $(elTarget).parents('td').length>0){ // if parents is TD
				if($('#select_parent').val()==1){
					for(var x=0;x<$parent_.length;x++){
						if($parent_[x]==parents[0]){
							$parent_ = parents;
							gIndex = x;
							break;
						}
					}
				}
				finalEl = $parent_.children(eType+eCls);
			}else if(eType=='td' || eType=='TD'){
				if($('#select_parent').val()==1){
					$parent_ = elTarget.parents('table').find('td'+':nth-child('+(eIndex+1)+')');
				}else{
					$parent_ = $("body").find('table').find('tr td'+':nth-child('+(eIndex+1)+')');
				}
				finalEl = $parent_;
			}else if(eType=='TABLE'){
				if($('#select_parent').val()==1){
					finalEl = elTarget.find('tr');
				}else{
					finalEl = $("body").find('table tr');
				}
			}else if(elTarget.children().length==1){ //check if child is 1 and table
				if($(elTarget.children()[0]).get(0).tagName=='TABLE'){
					if($('#select_parent').val()==1){
						finalEl = $(elTarget.children()[0]).find('tr');
					}else{
						finalEl = $("body").find('table tr');
					}
				}
			}else if(eType=='li' || eType=='LI'){
				if($('#select_parent').val()==1){
					$parent_ = elTarget.parents('ul').find('li'+':nth-child('+(eIndex+1)+')');
				}else{
					$parent_ = $("body").find('ul').find('li');
				}
				finalEl = $parent_;
			}
			
			finalEl.addClass('selectedelement');
			
			///console.log('parent: '+elements);
			gParent = elements;
			rowVal = [];
			
			finalEl = $('.selectedelement');
			
			finalEl.each(function(){
				colVal = [];
				var element = $(this);
				getValues(element);
				var hasValue = false;
				for(var x=0;x<colVal.length;x++){
					if(colVal[x]!=undefined && colVal[x].trim()!=''){
						hasValue = true;
					}
				}
				
				///if(colVal[0]!=undefined){
				if(hasValue){ //do not include rows without value
					rowVal.push(colVal);
				}
			});
			//console.log(rowVal);
			writeTable(rowVal);
			hideLoaderVNOC();
		}

		function process(target,parent)
		{
			$("body").find('*').removeClass('selectedelement');
			
			//console.log('element: '+target);
			//console.log('parent: '+parent);
			
			$parent_ = $("body").find(parent); //find parent first;
			
			if($('#select_parent').val()==1){
				for(var x=0;x<$parent_.length;x++){
					if(x==gIndex){
						$parent_ = $($parent_[x]);
						break;
					}
				}
			}
			
			var finalEl = $parent_.children(target);
			
			finalEl.addClass('selectedelement');
			rowVal = [];
			finalEl.each(function(){
				colVal = [];
				var element = $(this);		
				getValues(element);
				
				rowVal.push(colVal);
			});
			writeTable(rowVal);
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
			
			$('.selectfields').change(function(){
				var colIndex = $(this).parents('tr').children().index($(this).parent());
				//console.log(colIndex);
				$('#result tr td:nth-child('+(colIndex+1)+')').attr('data-field',$(this).val());
			});
			
			$('.chckall').click(function(){
				$('.chck_row').prop('checked',$(this).is(':checked'));
				if($(this).is(':checked')){
					$('.btn-remove').show();
				}else{
					$('.btn-remove').hide();
				}
			});
			
			$('.chck_row').click(function(){
				$('.chckall').prop('checked',$('.chck_row').length==$('.chck_row:checked').length);
				if($(this).is(':checked')){
					$('.btn-remove').show();
				}else{
					if($('.chck_row:checked').length==0) $('.btn-remove').hide();
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
		
        return document.body.innerHTML;
    }
	
	function endModifyDOM(){
		$("body").off('click');
		$("body").off('mousemove');
		$('#selector').hide();
		$('.selectedelement').removeClass('selectedelement').addClass('selectedelementhide');
	}

	if (elem.innerHTML=="End"){
		//We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
		chrome.tabs.executeScript({
			code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
		}, (results) => {
			//Here we have just the innerHTML and not DOM structure
			//console.log(results[0]);
		});
	}else{
		//We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
		chrome.tabs.executeScript({
			code: '(' + endModifyDOM + ')();' //argument here is a string but function.toString() returns function's code
		}, (results) => {
			//Here we have just the innerHTML and not DOM structure
			//console.log(results[0]);
		});
	}
});