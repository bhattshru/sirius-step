(function(){
  var movieName = window.location.href.split("#")[1];
  $.ajax({
    url: "/movies/"+movieName,
    success: function(result) {
      console.log('success  : ' , result)
      let movie=result.data;
      $('#movie-title').text(movie.name);
      $('.movie-img').css('background-image',`url(${movie.posterUrl})`);
      $('#movie-type').text(movie.releaseYear + " " +movie.language);
      $('.plot-block').text(movie.plot);
      let cast=movie.cast.split(",");
      $('.cast-list').empty();
      cast.forEach(function(name){
        $('.cast-list').append('<li>'+name+'</li>');
      });
    },
    error: function() {
      window.alert('Some error occurred');
    }
  });
})();
