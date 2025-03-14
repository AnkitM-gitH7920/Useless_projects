// global variables
let songs;
// let playbarBtn;
let currentSongIndex = 0;
let currentAudio = null;
// global variables

async function getSongs() {
    try {
        let importedSongs = await fetch('songs/songInfo.JSON');
        if (!importedSongs.ok) {
            throw new Error("Failed to load song data");
        }
        songs = await importedSongs.json();
        return songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
        songs = [];
    }
};
async function displayToLibraries() {
	let leftBottomLibrary = document.querySelector('.leftBottom-libraryContent');
	let rightBottomSongCardContainer = document.querySelector('.playlistDesign-songCardContainer');

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
			<button class="appearingPlayBtn completeCenter"><img src="assets/icons/cardPlayButton.svg"></button>
			<div class="cardSongName"><h2>${song.Song_name}</h2></div>
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
	document.querySelectorAll('.card h2').forEach((el)=>{
		let parent = el.parentElement;
		if(el.scrollWidth>parent.clientWidth){
			el.classList.add('marqueeAnimation');
		};
	})
	return;
}
// added animation to big words(no relation with async functions)
async function songPlayingFunction() {
	let leftLibraryPlayButtons = document.querySelectorAll('.playNowButtons');
	let rightLibraryPlayButtons = document.querySelectorAll('.appearingPlayBtn');

	leftLibraryPlayButtons.forEach((button, songIndex) => {
		button.addEventListener('click', () => {
			currentSongIndex = songIndex;
			playSelectedTrack(songs[currentSongIndex].url,currentSongIndex);
		});
	});
	rightLibraryPlayButtons.forEach((i, songIndex) => {
		i.addEventListener('click', () => {
			currentSongIndex = songIndex;
			playSelectedTrack(songs[currentSongIndex].url,currentSongIndex);
		});
	});
	document.getElementById('nextSongId').addEventListener('click',()=>{
		if (currentSongIndex < songs.length-1) {
			currentSongIndex++;
		}
		else{
			currentSongIndex = 0;
		}
		playSelectedTrack(songs[currentSongIndex].url);
	});
	document.getElementById('prevSongId').addEventListener('click',()=>{
		if (currentSongIndex>=1) {
			currentSongIndex--;
		}
		else{
			currentSongIndex = songs.length - 1;
		}
		playSelectedTrack(songs[currentSongIndex].url)
	})
};
async function playSelectedTrack(track) {
	let playbarBtn = document.getElementById('playSongId');
	try {
		// main function , preventing two songs to play at a time and memory leaks
		if (!currentAudio) {
            currentAudio = new Audio();
        } else {
            currentAudio.pause();
            currentAudio.removeEventListener('timeupdate', songTimeUpdateFunction);
        }
        currentAudio.src = track;
        currentAudio.play();
        playbarBtn.src = "assets/icons/playBarSongPauseButton.svg";

		playbarBtn.onclick = function(){
			if (currentAudio.paused) {
				currentAudio.play();
				playbarBtn.src = "assets/icons/playBarSongPauseButton.svg";
			} else{
				currentAudio.pause();
				playbarBtn.src = "assets/icons/playBarSongPlayButton.svg";
			};
		};
		document.querySelector('.seekbar').addEventListener('click',(event)=>{
			let percent = (event.offsetX/event.target.getBoundingClientRect().width)*100;
			document.querySelector('.circle').style.left = percent + "%";
			currentAudio.currentTime = (currentAudio.duration*percent)/100;
		});
		document.getElementById('minusTenSeconds').addEventListener('click',()=>{
			currentAudio.currentTime -= 10.00;
		});
		document.getElementById('plusTenSeconds').addEventListener('click',()=>{
			currentAudio.currentTime += 10.00;
		});
		// main function , preventing two songs to play at a time and memory leaks
		currentAudio.addEventListener('timeupdate',songTimeUpdateFunction)
		loadCurrentSongToPlayBar();
	}catch(error) {
		console.log(error);
	};
};
// time update function 
function songTimeUpdateFunction(){
	if (isNaN(currentAudio.duration)) {return};
	document.getElementById("songInitialTiming").innerText = `${secondsToMinuteSeconds(currentAudio.currentTime)}`;
	document.getElementById("songDuration").innerText = `${secondsToMinuteSeconds(currentAudio.duration)}`;
	try{
		document.querySelector('.circle').style.left = (currentAudio.currentTime/currentAudio.duration)*100 + "%";
	}
	catch(err){
		console.log(err)
	}
	if (document.getElementById("songInitialTiming").innerText == `${secondsToMinuteSeconds(currentAudio.duration)}`) {
		document.getElementById("songInitialTiming").innerText = "--:--";
		document.getElementById("songDuration").innerText = "--:--";
		document.querySelector('.circle').style.left = 0 + "%";
	};
};
// time update function 

// seconds to minute conversion
function secondsToMinuteSeconds(seconds){
	if(isNaN(seconds) || seconds<0){
		return "00:00";
	}
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);

	const formattedMinutes = String(minutes).padStart(2,'0');
	const formattedSeconds = String(remainingSeconds).padStart(2,'0');

	return `${formattedMinutes}:${formattedSeconds}`;
}
// seconds to minute conversion
function loadCurrentSongToPlayBar(){
	let playBarLeftPortion = document.querySelector('.playBar-Left')
	playBarLeftPortion.classList.add('appear')
	playBarLeftPortion.innerHTML = `
	<div class="playBar-LeftContent flex flexDirectionColumn">
	    <p id="currentTrackHead">Currently Playing</p>
        <div class="currentTrackInfo alighnCenter">
            <div class="currentTrackCover"><img src="${songs[currentSongIndex].song_cover}"></div>
            <div class="currentTrackSongInfo flexDirectionColumn">
	            <p id="currentTrackSongName" class="">${songs[currentSongIndex].Song_name}</p>
	            <p id="currentTrackArtistName">${songs[currentSongIndex].Artist}</p>
            </div>
        </div>
    </div>`;
    addAnimationsToCurrentTrack();
}
// added animation to big words(no relation with async functions)
function addAnimationsToCurrentTrack(){
	let currentTrackSongName = document.getElementById("currentTrackSongName");
	let parentCurrentTrackSongName = document.getElementById("currentTrackSongName").parentElement;
	if (currentTrackSongName.scrollWidth>parentCurrentTrackSongName.clientWidth) {
		currentTrackSongName.classList.add('marqueeAnimation')
	}
	return;
}
// added animation to big words(no relation with async functions)
async function main() {
	await getSongs();
	await displayToLibraries();
	await songPlayingFunction();
}
main();