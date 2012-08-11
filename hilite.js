$(document).ready(function() {
	var storage = chrome.storage.sync;
	$('body').on("click",'h3.r a', function(){
		var searchDescription = $(this).parent().siblings('.s').children('.st').text();
		var descriptionChunks = extract_description_chunks(searchDescription);
		var websiteKey = $(this).parent().siblings('.s').children('.f').children('.pplsrsl').attr('data-url');		
		var boundResults = {};
		boundResults[websiteKey] = descriptionChunks;
		storage.set(boundResults);
	});
	storage.get(window.location.href, function(result){
		var terms = result;
		if (terms[window.location.href]) {
			
			$(".highlight").css({ backgroundColor: "#ffff88"});
			$.each(terms[window.location.href], function(index, chunk){
				alert(chunk);
			});
			//storage.remove(window.location.href);
		}
	});

});

	

var extract_description_chunks = function (searchDescription){
	var descriptionChunks = $.trim(searchDescription).split('...');
	return clean_chunks(descriptionChunks);
};

var clean_chunks = function (descriptionChunks) {
	return $.map(descriptionChunks, function(chunk) {
		if (chunk === ""){
			return null
		} else {
			return $.trim(chunk);
		}	
	});
};

