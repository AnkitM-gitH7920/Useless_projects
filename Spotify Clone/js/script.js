// global variables
let songs;
let seekbar;
let volumeSeeker;
let volumeIcon;
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
	let leftHTML = '';

	songs.forEach((song,index) => {
		leftHTML += `
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
	});

	leftBottomLibrary.innerHTML = leftHTML;
	volumeIcon = document.querySelector('.volumeIcon img');
	seekbar = document.getElementById('seekbar');
	volumeSeeker = document.getElementById('seekVolume');
	seekbar.value = 0;
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
	});
}
// added animation to big words(no relation with async functions)
async function songPlayingFunction() {
	document.querySelectorAll('.playNowButtons').forEach((button, songIndex)=>{
		button.addEventListener('click', () => {
			currentSongIndex = songIndex;
			playSelectedTrack(songs[currentSongIndex].url,currentSongIndex);
		});
	});
	// next and previous song 
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
		if (currentSongIndex >= 1) {
			currentSongIndex--;
		}
		else{
			currentSongIndex = songs.length - 1;
		}
		playSelectedTrack(songs[currentSongIndex].url)
	});
	// next and previous song

	// plus ten and minus ten seconds function
	document.getElementById('plusTenSeconds').addEventListener('click',()=>{
		try{
			if (currentAudio) {
			    currentAudio.currentTime += 10.00;
		    }
		}catch(err){
			console.log("please select a song first") //will add some UI here , suggesting the user to select a song to play first
		}
	});
    document.getElementById('minusTenSeconds').addEventListener('click',()=>{
    	try{
			if (currentAudio) {
			    currentAudio.currentTime -= 10.00;
		    }
		}catch(err){
			console.log("please select a song first") //will add some UI here , suggesting the user to select a song to play first
		}
    });
	// plus ten and minus ten seconds function

	// volume seeker function
	if (currentAudio) {
		currentAudio.volume = 1;
		volumeSeeker.value = currentAudio.volume*100;
	};
	volumeSeeker.addEventListener('input',(event)=>{
		if (currentAudio) {
			let volumePercentage = document.getElementById("volumePercentage");
			let newVolume = event.target.value / 100;
			currentAudio.volume = newVolume;
			volumePercentage.innerText = `${Math.floor(newVolume*100)}%`;
			if (newVolume === 0) {
				volumePercentage.innerText = `00%`
				volumeIcon.src = `http://localhost:3000/assets/icons/volumeOff.svg`;
			}else{
				volumeIcon.src = `http://localhost:3000/assets/icons/volumeOn.svg`;
			};
		};
	});
	volumeIcon.addEventListener('click',(event)=>{
		if (currentAudio) {
			if (currentAudio.volume > 0) {
				currentAudio.volume = 0;
				volumeSeeker.value = 0;
				volumeIcon.src = `http://localhost:3000/assets/icons/volumeOff.svg`;
				document.getElementById("volumePercentage").innerText = "00%";
			}
			else{
				currentAudio.volume = 1;
				volumeSeeker.value = 100;
				volumeIcon.src = `http://localhost:3000/assets/icons/volumeOn.svg`;
				document.getElementById("volumePercentage").innerText = "100%";
			}
		}
	})
	// volume seeker function
};
function playSelectedTrack(track) {
	let playbarBtn = document.getElementById('playSongId');
	try {
		// main function , preventing two songs to play at a time and memory leaks
		if (!currentAudio) {
            currentAudio = new Audio();
        } else {
            currentAudio.pause();
            currentAudio.src = '';
            currentAudio.removeEventListener('timeupdate', songTimeUpdateFunction);
        }
        currentAudio.src = track;
        currentAudio.play();
        playbarBtn.src = "assets/icons/playBarSongPauseButton.svg";
        // main function , preventing two songs to play at a time and memory leaks

		playbarBtn.onclick = function(){
			if (currentAudio.paused) {
				currentAudio.play();
				playbarBtn.src = "assets/icons/playBarSongPauseButton.svg";
			} else{
				currentAudio.pause();
				playbarBtn.src = "assets/icons/playBarSongPlayButton.svg";
			};
		};
		document.getElementById('seekbar').addEventListener('input',(event)=>{
			let seekTime = (event.target.value / 100) * currentAudio.duration;
    	    currentAudio.currentTime = seekTime
        });
        // when the song ends
        currentAudio.addEventListener('ended',()=>{
        	seekbar.value = 0;
        	playbarBtn.src = "assets/icons/playBarSongPlayButton.svg";
        	document.getElementById("songInitialTiming").innerText = "--:--";
		    document.getElementById("songDuration").innerText = "--:--";
        });
        // when the song ends

		currentAudio.addEventListener('timeupdate',songTimeUpdateFunction)
	}catch(error) {
		console.log(error);
	};
	loadCurrentSongToPlayBar();
};
// time update function 
function songTimeUpdateFunction(){
	if (isNaN(currentAudio.duration)) {return};
	document.getElementById("songInitialTiming").innerText = `${secondsToMinuteSeconds(currentAudio.currentTime)}`;
	document.getElementById("songDuration").innerText = `${secondsToMinuteSeconds(currentAudio.duration)}`;
	try{
		seekbar.value = (currentAudio.currentTime / currentAudio.duration)*100;
	}
	catch(err){
		console.log(err)
	}
};
// time update function 

// seconds to minute:seconds conversion function
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
// seconds to minute:seconds conversion function

function loadCurrentSongToPlayBar(){
	let playBarLeftPortion = document.querySelector('.playBar-Left');
	playBarLeftPortion.innerHTML = `
	<div class="playBar-LeftContent appear flex flexDirectionColumn">
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
}
// added animation to big words(no relation with async functions)
async function main() {
	await getSongs();
	await displayToLibraries();
	await songPlayingFunction();
}
main();