chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	var searchTerms = request.searchTerms;
	var siteKey = request.siteKey;
	console.log("THIS IS THE WEBSITE KEY STORED:");
	console.log(siteKey);
	localStorage.searchTerms = searchTerms;
	localStorage.siteKey = siteKey;

});


chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("WEBSITE URLS")
	console.log(request.currentUrl);
	console.log(localStorage.searchTerms);
	console.log(localStorage.siteKey);
	if (request.currentUrl === siteKey ) {
		console.log("STHIS IS WHERTHE SEarch terms should still be");
		
		chrome.tabs.sendMessage( tabId,{ "selectTerms": searchTerms} );
	}
});







		


