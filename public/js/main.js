$(document).ready(function() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "movies/all",
        success: function(response){
            if(response.data.length > 0 ){
                constructDOM(formObject(response.data));
            }
        }
     });
     
     function  formObject(response) {
         let flags = [], categoryObject = [], length = response.length, i;
         for( i=0; i<length; i++) {
             let index = flags.indexOf(response[i].language);
             if(index>=0) {
                 categoryObject[index].movies.push(response[i]);
                 continue;
             }

             flags.push(response[i].language);
             let objectSchema = {
                 category: response[i].language,
                 movies: []
             }
             objectSchema.movies.push(response[i]);
             categoryObject.push(objectSchema);
         }
         return categoryObject;
     }

     function constructDOM(data){
         let content = [];
         for(let i = 0; i < data.length; i++) {
             let categoryContent = []
             let categoryDOM = $('<div class="clearfix category"></div>');
             let categoryTitle = $('<h3 class="categoryName">'+data[i].category+'</h3>');
             categoryContent.push(categoryTitle);

             if(data){
                 let moviesList = data[i].movies;
                 for(let j = 0; j < moviesList.length; j++) {
                     let movieDOM =
                     '<div class="movie fleft">'+
                         '<a href="/movieDetail.html#'+moviesList[j].name+'">' +
                         '<div class="poster">'+
                             '<img src="'+moviesList[j].thumbnailUrl+'" alt="">'+
                         '</div></a>'+
                         '<div class="details">'+
                             '<p class="yearOfRelease">'+moviesList[j].releaseYear+'</p>'+
                             '<h4 class="name">'+moviesList[j].name+'</h4>'+
                             '<div class="stars">';
                     movieDOM+=setRating(moviesList[j]);
                     categoryContent.push($(movieDOM));
                 }
                 categoryDOM.html(categoryContent);
                 content.push(categoryDOM);
             }
         }
         $('section.content').html(content);
     }

     function setRating(movie){
         let isDecimal = false;
         let reatingWidget = '';

         if(movie.rating){
             let rating = parseFloat(movie.rating);
             isDecimal = ((rating%1) != 0) ? true : false;
             let roundedRating = Math.floor(rating);

             for(let i = 1; i <=5; i++) {
                 if(roundedRating<=0){
                     reatingWidget+= '<div class="star star-empty"></div>';
                 }else{
                     if(i<roundedRating) {
                         reatingWidget+= '<div class="star star-full"></div>';
                     } else if(i==roundedRating) {
                         if(isDecimal){
                             reatingWidget+= '<div class="star star-full"></div><div class="star star-half"></div>';
                         }else{
                             reatingWidget+= '<div class="star star-full"></div>';
                         }
                     } else if(i>roundedRating && !isDecimal){
                         reatingWidget+= '<div class="star star-empty"></div>';
                     }
                 }
             }
         }
         reatingWidget +
                 '</div>'+
             '</div>'+
         '</div>';

         return reatingWidget;
     }
});
