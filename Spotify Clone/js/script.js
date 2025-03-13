let leftBottomLibrary            = document.querySelector('.leftBottom-libraryContent');
let rightBottomSongCardContainer = document.querySelector('.playlistDesign-songCardContainer');

// global variables
let card;
let playbarBtn;
// global variables

let songs;
let currentAudio = null;

async function getSongs() {
	let importedSongs = await fetch('songs/songInfo.JSON');
	songs = await importedSongs.json();
	return songs;
}
async function displayToLibraries() {
	songs.forEach((song,index) => {
		leftBottomLibrary.innerHTML += `
	    <div class="song alighnCenter">
		    <div class="librarySongs-coverImage">
			    <img src="${song.song_cover}">
		    </div>
		    <div class="songDetails flexDirectionColumn">
                <div id="songName"><span class="flex">${song.Song_name}</span></div>
			    <div id="artistName"><span class="flex">${song.Artist}</span></div>
		    </div>
		    <div class="playNowDiv completeCenter">
			    <p class="playNowButtons">Play Now</p>
		    </div>
	    </div>`;
	    rightBottomSongCardContainer.innerHTML += `
	    <div class="card flexDirectionColumn">
			<img class="coverImage" src="${song.song_cover}">
			<button class="appearingPlayBtn completeCenter"><img src="assets/cardPlayButton.svg"></button>
			<h2>${song.Song_name}</h2>
			<p>${song.Artist}</p>
		</div>`;
	});
	addAnimationToBigText();
}
// added animation to big words(no relation with async functions)
function addAnimationToBigText(){
	document.querySelectorAll('#songName span').forEach(el =>{
		let parent = el.parentElement;
		if(el.scrollWidth>parent.clientWidth){
			el.classList.add('marqueeAnimation')
		};
	});
}
// added animation to big words(no relation with async functions)
async function playSong() {
	let leftLibraryPlayButtons = document.querySelectorAll('.playNowButtons');
	let rightLibraryPlayButtons = document.querySelectorAll('.appearingPlayBtn');

	leftLibraryPlayButtons.forEach((button, songIndex) => {
		button.addEventListener('click', () => {
			playTrack(songs[songIndex].url,songIndex);
		});
	});
	rightLibraryPlayButtons.forEach((i, songIndex) => {
		i.addEventListener('click', () => {
			playTrack(songs[songIndex].url,songIndex);
		});
	});
}

async function playTrack(track,songIndex) {
    playbarBtn = document.getElementById('playSongId');
	try {
		// main function , preventing two songs to play at a time
		if (currentAudio) {
			currentAudio.pause();
		}
		currentAudio = new Audio(track);
		currentAudio.play();
		playbarBtn.src = "assets/playBarSongPauseButton.svg";

		playbarBtn.onclick =()=> {
			if (currentAudio.paused) {
				currentAudio.play();
				playbarBtn.src = "assets/playBarSongPauseButton.svg";
			} else {
				currentAudio.pause();
				playbarBtn.src = "assets/playBarSongPlayButton.svg";
			}
		};
		// main function , preventing two songs to play at a time
		loadCurrentSongToPlayBar(songIndex);
	}catch(error) {
		console.log(error);
	};
};
// added animation to big words(no relation with async functions)
function addAnimationsToCurrentTrack(){
	let currentTrackSongName = document.getElementById("currentTrackSongName");
	let parentCurrentTrackSongName = document.getElementById("currentTrackSongName").parentElement;
	if (currentTrackSongName.scrollWidth>parentCurrentTrackSongName.clientWidth) {
		currentTrackSongName.classList.add('marqueeAnimation')
	}
}
// added animation to big words(no relation with async functions)
function loadCurrentSongToPlayBar(songIndex){
	let playBarLeftPortion = document.querySelector('.playBar-Left')
	playBarLeftPortion.innerHTML = `
	<div class="playBar-LeftContent flex flexDirectionColumn">
	    <p id="currentTrackHead">Currently Playing</p>
        <div class="currentTrackInfo alighnCenter">
            <div class="currentTrackCover"><img src="${songs[songIndex].song_cover}"></div>
            <div class="currentTrackSongInfo flexDirectionColumn">
	            <p id="currentTrackSongName" class="">${songs[songIndex].Song_name}</p>
	            <p id="currentTrackArtistName">${songs[songIndex].Artist}</p>
            </div>
        </div>
    </div>`;
    addAnimationsToCurrentTrack();
}
async function main() {
	await getSongs();
	await displayToLibraries();
	await playSong();
}
main();