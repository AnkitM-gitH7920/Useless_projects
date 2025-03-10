// getting all the songs
async function getSongs(){
	let a = await fetch('songs/songInfo.JSON');
	return a.json()
}
// getting all the songs
let getSongList = [];
async function displaySongsOnLibrary(){
	const songListLibrary = document.querySelector('.leftBottom-libraryContent');
	getSongList = await getSongs();
	getSongList.forEach((song,index)=>{
		songListLibrary.innerHTML += `
		<div class="song alighnCenter" onclick="playSong()">
			<div class="librarySongs-coverImage">
			    <img src="${song.song_cover}">
			</div>
			<div class="songDetails flexDirectionColumn">
                <div id="songName"><p>${song.Song_name}</p></div>
			    <div id="artistName"><p>${song.Artist}</p></div>
			</div>
			<div class="togglePlayPauseDiv">
			    <i class='bx bx-play-circle' style='color:#ffffff;cursor: pointer;' song_index="${index}"></i>
			    <img src="">
			</div>
		</div>`;
	});
}
displaySongsOnLibrary();
function playSong(){
	let index = event.target.getAttribute('song_index');
    function playSelectedSong(track){
        currentAudio = null;
        document.querySelector(".nextSongClass").addEventListener('click',()=>{
            currentAudio.pause();
        })
        document.querySelector(".prevSongClass").addEventListener('click',()=>{
            currentAudio.play();
        })
	    currentAudio = new Audio(track)
	    currentAudio.play()
       };
       playSelectedSong(getSongList[index].url)
}
