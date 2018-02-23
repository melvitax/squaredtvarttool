var searchTerm;
		
var delay = (function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

$(document).ready(function() {
                
    $('#tvshow').keyup( function(){
        serchTerm = $("#tvshow").val();
        delay(function(){
            triggerSearch()
        },1000);
    });
    
    $("#searchbox").submit(function( event ) {
        triggerSearch();
        event.preventDefault();
    });

    $("#authenticate").submit(function( event ) {
        event.preventDefault();
        authenticate();        
    });

    function authenticate() {
        tvdbSearch.authenticate($("#apikey").val(), $("#userkey").val(), $("#username").val())
        event.preventDefault();
    }
    
    function triggerSearch() {
        if ($("#tvshow").val() == serchTerm && $("#tvshow").val() != '' ) {
            iTunesSearch.findCover($("#tvshow").val(), "#tvCovers");
            tvdbSearch.findShow($("#tvshow").val(), "#tvShows", "#tvEpisodes");
        }
    }

});