//Script da copiare ed incollare
var source = $("#template-albums").html(); //Trovo il mio template
var template = Handlebars.compile(source); //


$.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/array/music',
    method: 'GET',
    success: function(music){
        var albums = music.response; //Assegno il valore 'music' e con un a variabile trovo TUTTI gli album
        //console.log(music);
        for (var i = 0; i < albums.length; i++) { //Ciclo TUTTI gli album per trovare i SINGOLI [i] album
            var album = albums[i]
            //console.log(album);
            var albumTemplate = { //Creo un "array" con dentro i valori di ogni SINGOLO album [i]
                poster: album.poster,
                title:album.title,
                author:album.author,
                year:album.year,
                type:album.genre
            }
            var thisIsMyTemplate = template(albumTemplate); // Creo una variabile - template composta dal mio "array[i]" di elementi
            $('.container-list').append(thisIsMyTemplate); //Appendo in '.container-list' il mio template (thisIsMyTemplate)
        }
    },
    error: function(){
        alert('errore')
    }
});
