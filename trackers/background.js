function changeTab() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.storage.sync.get(['count'], function(item) {
			var _count = item.count['tab'+tabs[0].id];
			if(_count==undefined) _count = '';
			chrome.browserAction.setBadgeText({text:_count+'' });
		});
	});
}

//listen for new tab to be activated
chrome.tabs.onActivated.addListener(function(activeInfo) {
	changeTab();
});

//listen for current tab to be changed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    changeTab();
});

chrome.runtime.onMessage.addListener(function (msg, sender) {
	// First, validate the message's structure
	if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
		chrome.storage.sync.get(['count'], function(item) {
			var obj = item.count;
			if(item.count==undefined){
				obj = {};				
			}
			obj['tab'+sender.tab.id] = undefined;
			chrome.storage.sync.set({count: obj});
		});
		
		chrome.browserAction.setBadgeText({text: ''});
		
		// Enable the page-action for the requesting tab
		chrome.pageAction.show(sender.tab.id);
	}else if((msg.from === 'content') && (msg.subject === 'Copied')) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.storage.sync.get(['count'], function(item) {
				var current_count = item.count['tab'+tabs[0].id];
				var obj = item.count;
				if(current_count==undefined){
					current_count = 0;					
				}
				current_count++;				
				
				obj['tab'+tabs[0].id] = current_count;
				chrome.storage.sync.set({count: obj});
				if(current_count==0)
					chrome.browserAction.setBadgeText({text: ''});
				else
					chrome.browserAction.setBadgeText({text: current_count+''});
			});
		});

		chrome.browserAction.getBadgeText({}, function(result) {
			if(!isNaN(result)){
				chrome.browserAction.setBadgeText({text: '1'});
			}else{
				var c = parseInt(result)+1;
				chrome.browserAction.setBadgeText({text: c});
			}
		});
		
		chrome.notifications.create({
			type:     'basic',
			iconUrl:  'icon.png',
			title:    'Trackers',
			message:  'Copied - "'+msg.text+'"',
			/*buttons: [
				{title: 'button.'}
			],*/
		priority: 0});
		
	}else if((msg.from === 'loading') && (msg.subject === 'loading')) {	
		chrome.notifications.create({
			type:     'basic',
			iconUrl:  'icon.png',
			title:    'Trackers',
			message:  'Retrieving data from github.com',
		priority: 0});	
	}else if((msg.from === 'startSelect') && (msg.subject === 'Done')) {
		var _rows = msg.rows;
		
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.storage.sync.get(['count'], function(item) {
				var obj = item.count;

				obj['tab'+tabs[0].id] = _rows;
				chrome.storage.sync.set({count: obj});
				chrome.browserAction.setBadgeText({text: _rows+''});
			});
		});
		
		chrome.browserAction.setBadgeText({text: msg.rows+''});
		chrome.notifications.create({
			type:     'basic',
			iconUrl:  'icon.png',
			title:    'Trackers',
			message:  _rows+' rows selected',
			/*buttons: [
				{title: 'button.'}
			],*/
		priority: 0});
	}else if((msg.from === 'startSelect') && (msg.subject === 'Cancel')) {
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