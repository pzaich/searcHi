$(document).ready(function() {
	$('body').on("click",'h3 a', function(){
		var searchDescription = $(this).parent().siblings('.s').children('.st').text();
		// console.log(searchDescription);
		var descriptionChunks = extract_description_chunks(searchDescription);
		// console.log(descriptionChunks);
		var websiteKey = $(this).parent().siblings('.s').children('.f').children('.pplsrsl').attr('data-url');
		// console.log(websiteKey);
		send_keys(websiteKey, descriptionChunks);
	});

	send_address(window.location.href);
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		console.log(request.selectTerms);
	});

});

$(window).load(function() {
	
});

var send_address = function (address){
	chrome.extension.sendMessage({
		"currentUrl" : address
	}, function () { console.log("dman this ran");});
}

var extract_description_chunks = function (searchDescription){
	var descriptionChunks = $.trim(searchDescription).split('...');
	return clean_chunks(descriptionChunks);
};

var clean_chunks = function (descriptionChunks) {
	return $.map(descriptionChunks, function(chunk) {
		if (chunk === ""){
			return null
		} else {
			console.log($.trim(chunk));
			return $.trim(chunk);
		}	
	});
};

var send_keys = function (websiteKey, descriptionChunks){
	chrome.extension.sendMessage({
		"siteKey" : websiteKey,
	  "searchTerms" : descriptionChunks
	});
}
