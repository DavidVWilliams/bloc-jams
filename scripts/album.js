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
   +' <td class="song-item-number">' + songNumber + '</td>'
   +' <td class="song-item-title">' + songName + '</td>'
   +' <td class="song-item-duration">' + songLength + '</td>'
   '</tr>';

  return template;

};

var setCurrentAlbum = function(album) {

  // #1
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

  // @#2

  albumTitle.firstChild.nodeValue = album.name;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);

  // #3

  albumSongList.innerHTML = '';

  // #4
  for (var i = 0; i < album.songs.length; i++) {
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
  }

};

window.onload = function() {
  var albumCounter = 0;

  setCurrentAlbum(albumPicasso);
  // DEFINE INPUTS
  // Create a function that will switch to a new album when the cover image is clicked
// Put albums in an array
  var albumArray = [albumPicasso, albumMarconi, albumBloc];

// DEFINE PROCESS
// When the cover image is clicked, return next item in the array
  function switchAlbum(){
// When this function runs, switch to next album
    albumCounter++;
// If counter is greater than length, reset count to 0
    if (albumCounter >= albumArray.length) {
      albumCounter = 0;
    };

// DISPLAY OUTPUT
// Set album by index position
    setCurrentAlbum(albumArray[albumCounter]);
  }

  var albumImage = document.getElementsByClassName('album-cover-art')[0];
//  console.log(albumImage)
  albumImage.addEventListener('click', function (event) {
    switchAlbum();
  });
//<!--  in the css for the album cover add: cursor: pointer;-->


};
