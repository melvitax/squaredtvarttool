

var iTunesSearch = {

  basicMetadataURL: function(showName, country) {
    var url = "https://itunes.apple.com/search?term=";
    url = url + showName + "&media=tvShow&entity=tvSeason&attribute=tvSeasonTerm&sort=recent&country=" + country;
    console.log(url);
    return url;
  },
  
  imageURLofSize: function(originalUrl, size) {
  	// http://a1.phobos.apple.com/us/r1000/048/Video/ef/91/c4/mzl.abwgnxhv.60x60-50.jpg
    // valid sizes seem to be 100, 170, 110, 200
  	if(!size || size=="") {
	  	var newURL =  originalUrl.replace(/\d+x\d+-\d+./, '');
  	} else {
	    var sizeStr = size.toString() + 'x' + size.toString();
	    var newURL =  originalUrl.replace(/\d+x\d+/, sizeStr);
    }
    //console.log("originalUrl: " + originalUrl);
  	//console.log("newURL: " + newURL);
    return newURL;
  },  
  
  showHTMLFromResult: function(result) {
    var html = '<li id="' + result.collectionId + '">';     
    html = html + "<a class=\"preview\" href=\"" + iTunesSearch.imageURLofSize(result.artworkUrl100, 1200) + "\" title=\"" + result.collectionName + "\" target=\"_new\">";
    html = html + "<img src=\"" + result.artworkUrl100 + '\" />';                
    html = html + "</a>";
    html = html + "<br />" + result.collectionName;
    //html = html + "<br />";
   // html = html + "<a href=\"" + result.collectionViewUrl + "\" target=\"_new\">";
   // html = html + "iTunes";                
    //html = html + "</a>";
//    html = html + "<p>" + result.collectionName + '</p>';                
    
    html = html + "</li>";
            
    
    return html;
  },
  
  delay: 300.0,
  
  findCover: function(searchTermValue, divID) {
     var text = searchTermValue;
     
     if (text.length == 0) {
       $(divID).empty();
       return;
     }
     
     if (text.length >= 3) {
     
		 var queryURLs = [];
		 queryURLs.push(iTunesSearch.basicMetadataURL(text, "us"));
		 queryURLs.push(iTunesSearch.basicMetadataURL(text, "gb"));        

		 if (iTunesSearch.timer) {
			 clearTimeout(iTunesSearch.timer);
		 }
		
		 iTunesSearch.timer = setTimeout(function() {
          
	         $(divID).empty();
	          
	         for (var i=0; i < queryURLs.length; i++) {
				 //console.log("will fire ajax");
				 $.ajax({
				 	dataType: 'jsonp',
				 	url: queryURLs[i],
				 	success: function (data) {  
	                	var results = data.results;
	          
						//console.log("got " + results.length + " results");
	          
						var index;
						for (index = 0; index < results.length; index++) {
							var result = results[index];
							if ($('#' + result.collectionId.toString()).length == 0) {
								$(divID).append(iTunesSearch.showHTMLFromResult(result));  
								//imagePreview();              
							}
						}
					}
				});				  
	         }
        }, iTunesSearch.delay); 
	}
  },
}; // iTunesSearch

