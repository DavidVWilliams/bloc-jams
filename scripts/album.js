var createSongRow = function(songNumber, songName, songLength){

  var template =
      '<tr class="album-view-song-item">' +
      '  <td class="song-item-number" data-song-number="' +songNumber + '">' + songNumber + '</td>' +
      '  <td class="song-item-title">' + songName + '</td>' +
      '  <td class="song-item-duration">' + songLength + '</td>' +
      '</tr>'
  ;
  var $row = $(template);

    var clickHandler = function() {
      var songNumber = parseInt($(this).attr('data-song-number'));
        //Stopped
        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        //Playing
        if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            currentSoundFile.play();
            updatePlayerBarSong();
        }
        //Paused
        else if (currentlyPlayingSongNumber === songNumber) {
//          $(this).html(playButtonTemplate);
//          $('.left-controls .play-pause').html(playerBarPlayButton);
//          currentlyPlayingSongNumber = null;
//          currentSongFromAlbum = null;
            //Unpause
            if(currentSoundFile.isPaused()){
                $(this).html(pauseButtonTemplate);
                $('.left-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
            //Pause
            }else{
                $(this).html(playButtonTemplate);
                $('.left-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();
            };


        }
      };



    var onHover = function(event){
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
          songNumberCell.html(playButtonTemplate);
        }
      };


    var offHover = function (event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
          songNumberCell.html(songNumber);
        }
      };

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

function setCurrentAlbum (album) {

  currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    $albumSongList.empty();

    for (var i=0; i< album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }
}


var trackIndex = function(album, song) {
 return album.songs.indexOf(song);
};


function getSongNumberCell(number) {

  return $('.song-item-number[data-song-number="' + number + '"]');
};

function setSong(number) {

    if (currentSoundFile) {
        currentSoundFile.stop();
    }

    currentlyPlayingSongNumber = parseInt(number);
    currentSongFromAlbum = currentAlbum.songs[number - 1];
    // #1
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        // #2
        formats: [ 'mp3' ],
        preload: true
    });

    setVolume(currentVolume);
};

//Volume Control
var setVolume = function(volume) {

    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

//Next Song
var nextSong = function() {

    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    setSong(currentSongIndex + 1);
    currentSoundFile.play()
    updatePlayerBarSong();

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);

};

var previousSong = function() {

    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updatePlayerBarSong();

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);

};

var updatePlayerBarSong = function() {

  $('.currently-playing .song-name').text(currentSongFromAlbum.name);
  $('.currently-playing .artist-name').text(currentAlbum.name);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
  $('.left-controls .play-pause').html(playerBarPauseButton);
};

//Album Information
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

//Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<i class="ion-play"></i>';
var playerBarPauseButton = '<i class="ion-pause"></i>';

// Player bar element selectors
var $previousButton = $('.left-controls .previous');
var $nextButton = $('.left-controls .next');

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
});



////Song Row Content
//var createSongRow = function (songNumber, songName, songLength) {
//
//  var template =
//    '<tr class="album-view-song-item">' + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + '  <td class="song-item-title">' + songName + '</td>' + '  <td class="song-item-duration">' + songLength + '</td>' + '</tr>';
//
//  var $row = $(template);
//
//  var clickHandler = function () {
//
//    var songNumber = parseInt($(this).attr('data-song-number'));
//
//    if (currentlyPlayingSongNumber !== null) {
//      // Revert to song number for currently playing song because user started playing new song.
//      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
//      currentlyPlayingCell.html(currentlyPlayingSongNumber);
//    }
//
//    if (currentlyPlayingSongNumber !== songNumber) {
//      // Switch from Play -> Pause button to indicate new song is playing.
//      setSong(songNumber);
//      currentSoundFile();
//      $(this).html(pauseButtonTemplate);
//      currentlyPlayingSongNumber = parseInt(songNumber);
//      currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
//      updatePlayerBarSong();
//    } else if (currentlyPlayingSongNumber === songNumber) {
//      if (currentSoundFile.isPaused()) {
//        $(this).html(pauseButtonTemplate);
//        $('.left-controls .play-pause').html(playerBarPauseButton);
//        currentSoundFile.play();
//      } else {
//        $(this).html(playButtonTemplate);
//        $('.left-controls .play-pause').html(playerBarPlayButton);
//        currentSoundFile.pause();
//      }
//    }
//
//  };
//
//  var onHover = function (event) {
//    var songNumberCell = $(this).find('.song-item-number');
//    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
//
//    if (songNumber !== currentlyPlayingSongNumber) {
//      songNumberCell.html(playButtonTemplate);
//    }
//    console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
//  };
//
//  var offHover = function (event) {
//    var songNumberCell = $(this).find('.song-item-number');
//    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
//
//    if (songNumber !== currentlyPlayingSongNumber) {
//      songNumberCell.html(songNumber);
//    }
//    console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
//  };
//
//  $row.find('.song-item-number').click(clickHandler);
//  $row.hover(onHover, offHover);
//  return $row;
//};
//
////Set Current Album
//var setCurrentAlbum = function (album) {
//
//  currentAlbum = album;
//
//  // Select all of the HTML elements required to display on the album page
//  var $albumTitle = $('.album-view-title');
//  var $albumArtist = $('.album-view-artist');
//  var $albumReleaseInfo = $('.album-view-release-info');
//  var $albumImage = $('.album-cover-art');
//  var $albumSongList = $('.album-view-song-list');
//
//  // Assign values to each part of the album (text, images)
//  $albumTitle.text(album.name);
//  $albumArtist.text(album.artist);
//  $albumReleaseInfo.text(album.year + ' ' + album.label);
//  $albumImage.attr('src', album.albumArtUrl);
//
//  // Cleans out the HTML
//  $albumSongList.empty();
//
//  // Goes through the song list
//  for (i = 0; i < album.songs.length; i++) {
//    var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
//    $albumSongList.append($newRow);
//  }
//
//};
//
//
//
//var trackIndex = function (album, song) {
//  return album.songs.indexOf(song);
//};
//
//var nextSong = function () {
//
//  var getLastSongNumber = function (index) {
//    return index == 0 ? currentAlbum.songs.length : index;
//  };
//
//  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
//
//  currentSongIndex++;
//
//  if (currentSongIndex >= currentAlbum.songs.length) {
//    currentSongIndex = 0;
//  }
//
//  currentlyPlayingSongNumber = (currentSongIndex + 1);
//  currentSongFromAlbum = currentAlbum.songs[(currentSongIndex + 1) - 1];
//  currentSoundFile.play();
//  updatePlayerBarSong();
//
//  var lastSongNumber = getLastSongNumber(currentSongIndex);
//
//  var changeCell = function (number) {
//    return $('.song-item-number[data-song-number="' + number + '"]');
//  }
//
//  var $nextSongNumberCell = changeCell(currentlyPlayingSongNumber);
//  var $lastSongNumberCell = changeCell(lastSongNumber);
//
//  $nextSongNumberCell.html(pauseButtonTemplate);
//  $lastSongNumberCell.html(lastSongNumber);
//};
//
//var previousSong = function () {
//
//  var getLastSongNumber = function (index) {
//    return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
//  };
//
//  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
//
//  currentSongIndex--;
//
//  if (currentSongIndex < 0) {
//    currentSongIndex = currentAlbum.songs.length - 1;
//  }
//
//  currentlyPlayingSongNumber = (currentSongIndex + 1);
//  currentSoundFile.play();
//  currentSongFromAlbum = currentAlbum.songs[(currentSongIndex + 1) - 1];
//  updatePlayerBarSong();
//
//  var lastSongNumber = getLastSongNumber(currentSongIndex);
//
//  var changeCell = function (number) {
//    return $('.song-item-number[data-song-number="' + number + '"]');
//  }
//
//  var $nextSongNumberCell = changeCell(currentlyPlayingSongNumber);
//  var $lastSongNumberCell = changeCell(lastSongNumber);
//
//  $nextSongNumberCell.html(pauseButtonTemplate);
//  $lastSongNumberCell.html(lastSongNumber);
//};
//
//
//var updatePlayerBarSong = function () {
//
//  $('.currently-playing .song-name').text(currentSongFromAlbum.name);
//  $('.currently-playing .artist-name').text(currentAlbum.name);
//  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
//  $('.left-controls .play-pause').html(playerBarPauseButton);
//};
//
//
//// Album button templates
//var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
//var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
//var playerBarPlayButton = '<span class="ion-play"></span>';
//var playerBarPauseButton = '<span class="ion-pause"></span>';
//
//// Create variables in the global scope to hold current song/album information
//var currentAlbum = null;
//var currentlyPlayingSongNumber = null;
//var currentSongFromAlbum = null;
//var currentSoundFile = null;
//var currentVolume = 80;
//
//// Player bar element selectors
//var $previousButton = $('.left-controls .previous');
//var $nextButton = $('.left-controls .next');
//
//var setSong = function (songNumber) {
//      if (currentSoundFile) {
//        currentSoundFile.stop();
//    }
//
//  currentlyPlayingSongNumber = parseInt(songNumber);
//  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
//  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
//    // #2
//    formats: ['mp3'],
//    preload: true
//  });
//
//
//    setVolume(currentVolume);
//
//};
//
//
// var setVolume = function(volume) {
//
//     if (currentSoundFile) {
//         currentSoundFile.setVolume(volume);
//     }
//
// };
//
//var getSongNumberCell = function (number) {
//  return $('.song-item-number[data-song-number="' + number + '"]');
//};
//
//// Set album when ready
//$(document).ready(function () {
//  setCurrentAlbum(albumPicasso);
//  $previousButton.click(previousSong);
//  $nextButton.click(nextSong);
//});
