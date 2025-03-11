let songListLibrary = document.querySelector('.leftBottom-libraryContent');
let getSongList = [];
let currentAudio = null; // Store currently playing audio

async function getSongs() {
    let a = await fetch('songs/songInfo.JSON');
    return a.json();
}

async function displaySongsOnLibrary() {
    getSongList = await getSongs();
    getSongList.forEach((song, index) => {
        let songElement = document.createElement("div");
        songElement.classList.add("song", "alighnCenter");
        songElement.setAttribute("song_index", index);
        songElement.innerHTML = `
            <div class="librarySongs-coverImage">
                <img src="${song.song_cover}">
            </div>
            <div class="songDetails flexDirectionColumn">
                <div id="songName"><p>${song.Song_name}</p></div>
                <div id="artistName"><p>${song.Artist}</p></div>
            </div>
            <div class="togglePlayPauseDiv">
                <i class='bx bx-play-circle' style='color:#ffffff;cursor: pointer;'></i>
            </div>`;

        // Attach event listener to each song
        songElement.addEventListener("click", playTrack);

        // Append to the library container
        songListLibrary.appendChild(songElement);

        // check for playPause
        songElement.addEventListener('click',()=>{
        	let createdI = document.createElement('i')
        	createElement.classList.add()
        })
    });
    return "Successfully Loaded content to DOM";
}

function playTrack(event) {
    let songDiv = event.currentTarget;
    let index = songDiv.getAttribute('song_index');
    let selectedSongUrl = getSongList[index].url;

    // Stop currently playing song (if any)
    if (currentAudio) {
        currentAudio.pause();
    }

    // Play the new song
    currentAudio = new Audio(selectedSongUrl);
    currentAudio.play();
}

async function Main() {
    let DOMloaded = await displaySongsOnLibrary();
    console.log(DOMloaded);
}
Main();