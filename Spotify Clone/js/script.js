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
	console.log(getSongList)
}
main()
