$(document).ready(function() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://api.myjson.com/bins/tls49",
        success: function(response){
            if(response){
                constructDOM(formObject(response));
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
                        '<div class="poster">'+
                            '<img src="'+moviesList[j].posterUrl+'" alt="">'+
                        '</div>'+
                        '<div class="details">'+
                            '<p class="yearOfRelease">'+moviesList[j].releaseYear+'</p>'+
                            '<h4 class="name">'+moviesList[j].name+'</h4>'+
                            '<div class="stars">'+
                            '<div class="star star-full"></div>'+
                            '<div class="star star-full"></div>'+
                            '<div class="star star-full"></div>'+
                            '<div class="star star-full"></div>'+
                            '<div class="star star-half"></div>';
                            '</div>'+
                            '</div>'+
                        '</div>';
                    categoryContent.push($(movieDOM));
                }
                categoryDOM.html(categoryContent);
                content.push(categoryDOM);
            }
        }
        $('section.content').html(content);
    }
});
