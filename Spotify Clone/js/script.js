let leftBottomLibrary = document.querySelector('.leftBottom-libraryContent')
let rightBottomSongCardContainer = document.querySelector('.playlistDesign-songCardContainer');
console.log(rightBottomSongCardContainer)

async function getSongs(){
	let songs = await fetch('songs/songInfo.JSON')
	return await songs.json()
}
async function displayToLibrary(){
	let pushedSongs = await getSongs()
	pushedSongs.forEach((song)=>{
		leftBottomLibrary.innerHTML += `
	    <div class="song alighnCenter">
		    <div class="librarySongs-coverImage">
			    <img src="${song.song_cover}">
		    </div>
		    <div class="songDetails flexDirectionColumn">
                <div id="songName"><p>${song.Song_name}</p></div>
			    <div id="artistName"><p>${song.Artist}</p></div>
		    </div>
		    <div class="togglePlayPauseDiv completeCenter">
			    <i class='bx bx-play-circle' style='color:#ffffff;cursor: pointer;'></i>
		    </div>
	    </div>`
	    rightBottomSongCardContainer.innerHTML += `
	    <div class="card flexDirectionColumn">
			<img class="coverImage" src="${song.song_cover}">
			<button class="appearingPlayBtn completeCenter"><img src="assets/cardPlayButton.svg"></button>
			<h2>${song.Song_name}</h2>
			<p>${song.Artist}</p>
		</div>
	    `
	});
}
async function main(){
	await displayToLibrary()
}
main()