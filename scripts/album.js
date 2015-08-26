 // Example Album
 var albumPicasso = {
     name: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: '/assets/images/album_covers/01.png',
     songs: [
         { name: 'Blue', length: '4:26' },
         { name: 'Green', length: '3:14' },
         { name: 'Red', length: '5:01' },
         { name: 'Pink', length: '3:21'},
         { name: 'Magenta', length: '2:15'}
     ]
 };

// Another Example Album
 var albumMarconi = {
     name: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { name: 'Hello, Operator?', length: '1:01' },
         { name: 'Ring, ring, ring', length: '5:01' },
         { name: 'Fits in your pocket', length: '3:21'},
         { name: 'Can you hear me now?', length: '3:14' },
         { name: 'Wrong phone number', length: '2:15'}
     ]
 };

// Assignment 25 Album
 var albumBloc = {
     name: 'Straight Code Homie',
     artist: 'Frontend Mentors',
     label: 'Bloc',
     year: '2015',
     albumArtUrl: 'assets/images/album_covers/19.png',
     songs: [
         { name: 'H is for Hypertext', length: '2:01' },
         { name: 'Git, Git, Git on up!', length: '3:01' },
         { name: 'Developer toolbar in your pocket', length: '3:21'},
         { name: 'Finally found the error', length: '6:12' },
         { name: 'Ahh push it Origin', length: '2:15'}
     ]
 };

 var createSongRow = function(songNumber, songName, songLength) {

     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     var $row = $(template);

var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };

    // #1
    $row.find('.song-item-number').click(clickHandler);
    // #2
    $row.hover(onHover, offHover);

    // #3
    return $row;

 };

var setCurrentAlbum = function(album) {

     // #1
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

     // #2
     $albumTitle.text(album.name);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);

     // #3
     $albumSongList.empty();

     // #4
     for (i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
         $albumSongList.append($newRow);
     }

 };

var getSongItem = function(element) {

    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }

};

var clickHandler = function() {

        var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }

        if (currentlyPlayingSong !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        }

        else if (currentlyPlayingSong === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }

    };

 // Elements we'll be adding listeners to
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');


 // Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
 var currentlyPlayingSong = null;



 $(document).ready(function() {
  var albumCounter = 0;

  setCurrentAlbum(albumPicasso);
//
//
//  // DEFINE INPUTS
//  // Create a function that will switch to a new album when the cover image is clicked
//// Put albums in an array
//  var albumArray = [albumPicasso, albumMarconi, albumBloc];
//
//// DEFINE PROCESS
//// When the cover image is clicked, return next item in the array
//  function switchAlbum(){
//// When this function runs, switch to next album
//    albumCounter++;
//// If counter is greater than length, reset count to 0
//    if (albumCounter >= albumArray.length) {
//      albumCounter = 0;
//    };
//
//// DISPLAY OUTPUT
//// Set album by index position
//    setCurrentAlbum(albumArray[albumCounter]);
//  }
//
//  var albumImage = document.getElementsByClassName('album-cover-art')[0];
////  console.log(albumImage)
// //albumImage.addEventListener('click', function (event) {
// //   switchAlbum();
////  });
//albumImage.addEventListener('click',switchAlbum); {
////<!--  in the css for the album cover add: cursor: pointer;-->
//};
//for (i = 0; i < songRows.length; i++) {
//
//
//     songRows[i].addEventListener('click', function(event) {
//            clickHandler(event.target);
//         });
//     }
});
