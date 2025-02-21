const passwordField = document.getElementById('passwordField');
const copyPassIcon  = document.getElementById('copyPassIcon');
const radios        = document.querySelectorAll('.radios');
const generateBtn   = document.getElementById('generateBtn');
const resetPassFieldIcon = document.getElementById('resetPassFieldIcon')

//all types of characters
let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let Numbers = "1234567890";
let lowercaseChars = uppercaseChars.toLowerCase();
let speacialCharacters = "~!@#$%^&*(){}_-[]{}<>,./|?";
//all types of characters

// defining strings
let concatedWeakPassString = lowercaseChars + uppercaseChars;
let concatedModeratePassString = Numbers + concatedWeakPassString;
let concatedStrongPassString = speacialCharacters + concatedModeratePassString;
// defining strings

class password{
	weakPassClass(){
	    let weakPass = "";
	    for(let i = 0; i<=14; i++){
	    	const weakRandomIndex = Math.floor(Math.random()*concatedWeakPassString.length);
	    	weakPass += concatedWeakPassString[weakRandomIndex];
	    }
	    passwordField.value = weakPass;
	}
	moderatePassClass(){
		let moderatePass = "";
		for(let i = 0; i<=20; i++){
			const moderateRandomIndex = Math.floor(Math.random()*concatedModeratePassString.length);
			moderatePass += concatedModeratePassString[moderateRandomIndex];
		}
		passwordField.value = moderatePass;
	}
	strongPassClass(){
		let strongPass = "";
		for(let i=0;i<=28;i++){
			const strongRandomIndex = Math.floor(Math.random()*concatedStrongPassString.length);
			strongPass += concatedStrongPassString[strongRandomIndex];
		}
		passwordField.value = strongPass;
	}
	funnyPassClass(){
		let funnyArray = [
			"password",
			'ineedapassword',
			'changeme',
			'secret',
			'iamforgetful',
			'newpassword',
			'IamACompleteIdiot',
			'nothing',
			'nothingagain',
			'iforgot',
			'whydoialwaysforget',
			'qwerty',
			'asdf',
			'aslpls (old-school mIRC users will remember this)',
			'user','YouWontGuessThisOne',
			'PasswordShmashword',
			'youmoron',
			'doubleclick',
			'copyme-you-bastard',
			'iamnottellingyoumypw',
			'masterpassword',
			'yetanotherpassword',
			'nomorepasswords',
			'password123',
			'myonlypassword',
			'cantremember',
			'dontaskdonttell',
			'memorysucks',
			'earlyalzheimers',
			'passwordforoldpeople',
			'fatboy',
			'benson',
			'321654',
			'141627',
			'sweetpea',
			'ronnie',
			'indigo',
			'spartan',
			'spartan',
			'hesoyam',
			'freeman',
			'freedom1',
			'fredfred',
			'pizza',
			'manchester',
			'lestat',
			'kathleen',
			'hamilton',
			'erotic',
			'blabla',
			'skater',
			'pencil',
			'passwor',
			'larisa',
			'hornet',
			'hamlet',
			'gambit',
			'fuckyou2',
			'alfred',
			'sweetie',
			'lollol',
			'special',
			'renegade',
			'farmer',
			'harry',
			'thuglife',
			'virgin']; //funny passwords here
		let randomFunnyIndex = Math.floor(Math.random()*funnyArray.length);
		let funnyPassword = funnyArray[randomFunnyIndex] ;
		passwordField.value = funnyPassword;
	}
	copyPassToClipboard(){
		navigator.clipboard.writeText(passwordField.value).then(()=>{
			console.log("Password copied to clipboard.");
		}).catch((err)=>{
			console.log("Failed to copy password");
		});
	}
}

function generatePassFunc(){
	let generatePass = new password();
	if (document.getElementById('radioWeak').checked) {
		generatePass.weakPassClass();
	}else if (document.getElementById('radioModerate').checked) {
		generatePass.moderatePassClass();
	}else if (document.getElementById('radioStrong').checked) {
		generatePass.strongPassClass();
	}else if (document.getElementById('radioFunny').checked) {
		generatePass.funnyPassClass();
	}else{
		alert("Please select a password type.")
	}
};

let copy = new password();
copyPassIcon.addEventListener('click',()=>{
	    copy.copyPassToClipboard();
        let successfullCopyPopUp = document.getElementById('copyPopUp');
    	let successfullCopyTimer;

        if (successfullCopyPopUp) {
        	successfullCopyPopUp.style.display = "block";
            setTimeout(()=>{
            	successfullCopyPopUp.style.display = "none";
            },3000)
        }
});

resetPassFieldIcon.addEventListener('click',()=>{
	passwordField.value = '';
	console.log("Password field cleared.");
	//uncheck any checked radio
	radios.forEach(radio=>{
		radio.checked = false;
	})
});