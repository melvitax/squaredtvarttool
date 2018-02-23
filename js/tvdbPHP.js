var theTVDBSearch = {

	delay: 300.0,
	
	findShow: function(searchTermValue, tvShowDivID, tvEpisodesDivID) {
	     var text = searchTermValue;
	     if (text.length == 0) {
	       $(tvShowDivID).empty();
	       return;
	     }
	     
	     if (text.length >= 3) {
			 
			 if (theTVDBSearch.timer) {
			 	clearTimeout(theTVDBSearch.timer);
			 }
			 
			 $(tvShowDivID).empty();
			 $(tvEpisodesDivID).empty();
			 $(tvShowDivID).append("<li>Fetching...</li>")
			 
			 theTVDBSearch.timer = setTimeout(function() {
				 $(tvShowDivID).empty();
				 var items = [];
				 $.getJSON("http://allforces.com/tvShows/thetvdb/getShow/"+text, function( data ) {
				 	var items = [];
				 	$.each( data, function( idx, show ) {
					    items.push( "<li>" + show.name+ "</li>" );
					});
					$(tvShowDivID).append(items.join( "" ))
					$("li", tvShowDivID).click(function(){
						theTVDBSearch.findSeasons($(this).text(), tvEpisodesDivID)
					})
				 })
	        }, theTVDBSearch.delay); 
		}
	},
	
	findSeasons: function(showName, tvEpisodesDivID) {
		$(tvEpisodesDivID).empty();
		$(tvEpisodesDivID).append("<li>Fetching...</li>");
		var items = [];
		
		$.getJSON("http://allforces.com/tvShows/thetvdb/getSeasons/"+showName, function( series ) {
		
			$(tvEpisodesDivID).empty();
			var items = []
			
			var status = series.status == "Ended" ? '<span class="ended">' + series.status + '</span>' : series.status
			
			items.push('<li class="banner"><a href="http://thetvdb.com/?tab=series&id=' + series.id + '"><img src="http://thetvdb.com/banners/' + series.banner + '" alt="" /></a></li>')
			items.push('<li class="title">' + series.name + '</li>')
			items.push('<li class="status">' + status + '</li>')
			items.push('<li class="network">' + series.network + ' ' + series.airsDayOfWeek + ' ' + series.airsTime + '</li>')
			items.push('<li class="overview">' + series.overview + '</li>')
			
			$.each( series.seasons, function( idx, season ) {
				var imdb = (series.imdb) ? ", imdb series " + series.imdb : ""
				var zapit = (series.zapit) ? ", zapit series " + series.zapit : ""
		    	items.push('<li class="season">' + series.name + ', Season ' + season.name + ', thetvdb series ' + series.id + ', thetvdb season ' + season.id + imdb + zapit + '</li>')
			});
			
			$(tvEpisodesDivID).append(items.join( "" ));

		})

	},


}