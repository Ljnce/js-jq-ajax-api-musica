//Script da copiare ed incollare
var source = $("#template-albums").html(); //Trovo il mio template
var template = Handlebars.compile(source); //

//Creo un 'select' con le liste all'interno
$('.list-type').change(function(){ //Creo una funzione per il mio 'select', che va a collegare i nomi del tipo di musica, alle mie liste
    var selectedMusicType = $(this).val();//Creo una variabile che mi indica il tipo di musica selezionato
    console.log(selectedMusicType);
    if (selectedMusicType == "") { //Se non seleziono nulla o seleziono il primo valore...
        $('.list').show();//...me li mostra TUTTI
    } else {
        $('.list').each(function (){ //Altrimenti... mi vai a ciclare dentro la lista (trovando il 'data-type')
        var thisDataType = $(this).attr('data-type')//Creo un variabile che mi va a trovare 'l'attr data' corrispondente
        if (selectedMusicType.toLowerCase() == thisDataType.toLowerCase()) { //Se il tipo di musica che ho selezionato è uguale a quello del mio data sul template...
            $(this).show() //... allora mostrarmi quelli
        } else {
            $(this).hide()// ... e nascondimi quelli che non rientrano in tutto ciò
        }
    })
    }
});

//Creazione ajax
$.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/array/music', //API con la lista degli album all'interno
    method: 'GET',
    success: function(music){ //Assegno il valore 'music'
        var albums = music.response; //Con un a variabile trovo TUTTI gli album dentro 'music' creata precedentemente
        //console.log(music); //log che mi mostra TUTTI gli albums
        for (var i = 0; i < albums.length; i++) { //Ciclo TUTTI gli album per trovare i SINGOLI [i] album
            var album = albums[i] //Creo una variabile che mi va a rappresentare i SINGOLI album [i]
            //console.log(album); //Log che mi mostro ogni SINGOLO album e quello che ho dentro
            var albumTemplate = { //Creo un "array" con dentro i valori di ogni SINGOLO album [i]
                poster: album.poster, //Trascrivo l'immagine in {{poster}}
                title:album.title, //Trascrivo il titolo in {{title}}
                author:album.author, //Trascrivo il nome dell'autore in {{author}}
                year:album.year, //Trascrivo l'anno in {{year}}
                type:album.genre //Trascrivo il tipo di musica in {{type}}
            }
            var thisIsMyTemplate = template(albumTemplate); // Creo una variabile - template composta dal mio "array[i]" di elementi
            $('.container-list').append(thisIsMyTemplate); //Appendo in '.container-list' il mio template (thisIsMyTemplate)
        }
    },
    error: function(){
        alert('errore')
    }
});


//EXTRA
$('.container-list').on('mouseenter', '.list', function(){
    var questoAlbum = $(this);

    questoAlbum.addClass('hover');
});


$('.container-list').on('mouseleave', '.list', function(){
    var questoAlbum = $(this);

    questoAlbum.removeClass('hover');
});
