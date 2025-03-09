// getting all the songs
async function getSongs(){
	let a = await fetch('songs/songInfo.JSON');
	let response = await a.json();
	let songs = []
	for(let i = 0; i<response.length ; i++){
		let ifEndsWithUrl = response[i];
		songs.push(response[i])
	}
	return songs;
}
async function main(){
	let getSongList = await getSongs();
	const songListLibrary = document.querySelector('.leftBottom-libraryContent')
	let currentSong = [];
	for(let listedSongIndex = 0;listedSongIndex<getSongList.length;listedSongIndex++){
		songListLibrary.innerHTML += `
		<div class="song alighnCenter">
			<img src="assets/music.svg">
			<div class="songDetails flexDirectionColumn">
				<div id="songName"><p>${getSongList[listedSongIndex].Song_name}</p></div>
				<div id="artistName"><p>${getSongList[listedSongIndex].Artist}</p></div></div>
				<i class='bx bx-play-circle' style='color:#ffffff;cursor: pointer;'  ></i>
			</div>`
	}
	for(song of getSongList){
		
	}
}
main()

// getting all the songs