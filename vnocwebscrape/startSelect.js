//jQuery('.trkr-popup').removeClass('is-visible');

$('#trkr-selector').show();
$('.selectedelementhide').removeClass('selectedelementhide').addClass('trkr-selectedelement');

var elements = {
	top: $("body").find('#trkr-selector-top'),
	left: $("body").find('#trkr-selector-left'),
	right: $("body").find('#trkr-selector-right'),
	bottom: $("body").find('#trkr-selector-bottom')
};

$("body").find('a').each(function(){
	var href = $(this).attr('href');
	$(this).replaceWith($(this).attr('href','javascript:;').removeAttr('target').attr('data-href',href).clone());
});

$("body").mousemove(function(event) {
	if(event.target.id.indexOf('trkr-selector') !== -1 || event.target.tagName === 'BODY' || event.target.tagName === 'HTML') return;
	var $target = $(event.target);
	
	targetElement = $target;
	targetOffset = $target[0].getBoundingClientRect(),
	targetHeight = targetOffset.height,
	targetWidth  = targetOffset.width;
		
	if($(targetElement).parents('#trkr-tbl-container').length>0) return;
	
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
	$('#trkr-selector').hide();
	$('.trkr-selectedelement').removeClass('trkr-selectedelement').addClass('selectedelementhide');
	chrome.runtime.sendMessage({
		from:    'startSelect',
		subject: 'Cancel'
	});
});

$("body").on("click",function() {
	$('#trkr-result tr').remove();
	clickEelement = targetElement;
	if($(clickEelement).parents('#trkr-tbl-container').length>0) return;
	
	if(window.location.hostname=="github.com" && window.location.href.indexOf('commit')){
		var rowVal = [];
		var cls = "."+clickEelement.attr('class').split(' ').join('.');
		var finalEl = $(cls);
		
		finalEl.each(function(){
			var this_ = $(this);
			rowVal.push([window.location.origin+'/'+this_.attr('data-href')]);
		});
		
		//console.log(rowVal);
		writeTable(rowVal);
		hideLoaderVNOC();
		endSelect();
		chrome.runtime.sendMessage({
			from:    'startSelect',
			subject: 'Done',
			rows:rowVal.length
		});
	}else if(window.location.hostname=="medium.com" && window.location.href.indexOf('followers')==-1 && window.location.href.indexOf('following')==-1){
		var rowVal = [];
		var finalEl = $(".js-recommendList").find(".u-flex1");//a.link--overlay[data-action='show-user-card']");
		
		finalEl.each(function(){
			var this_ = $(this).find("a.link--overlay[data-action='show-user-card']:first");
			
			if($(this_).children().length>0){
				var r = [];
				$(this_).children().each(function(){
					r.push($(this).html());
				});
				
				var text = $(this_).contents().filter(function() {
				  return this.nodeType == 3;
				}).text();
				text = text.trim();
				r.unshift(text);
				rowVal.push(r);
			}else{
				rowVal.push([$(this_).html()]);
			}
		});
		
		//console.log(rowVal);
		writeTable(rowVal);
		hideLoaderVNOC();
		endSelect();
		chrome.runtime.sendMessage({
			from:    'startSelect',
			subject: 'Done',
			rows:rowVal.length
		});
	}else{
		process2();	
	}

	///jQuery('.trkr-popup').addClass('is-visible');
	$("body").off('click');
	$("body").off('mousemove');
	$('#trkr-selector').hide();
	$('.trkr-selectedelement').removeClass('trkr-selectedelement').addClass('selectedelementhide');	
	return true;
});

function process2()
{
	showLoaderVNOC('Parsing contents');
	var elTarget = clickEelement;
	$('.trkr-btn-tbl').hide();
	gIndex = '';
	try{
		//$("body").find('*').removeClass('trkr-selectedelement');
		$('.trkr-selectedelement').removeClass('trkr-selectedelement');
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
	
	finalEl.addClass('trkr-selectedelement');
	
	///console.log('parent: '+elements);
	gParent = elements;
	rowVal = [];
	
	finalEl = $('.trkr-selectedelement');
	
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
	endSelect();
	chrome.runtime.sendMessage({
		from:    'startSelect',
		subject: 'Done',
		rows:rowVal.length
	});
}
