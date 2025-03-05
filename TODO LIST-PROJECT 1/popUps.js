// homeIcon popup
const homeIconBackground = document.querySelector('.homeIconBackground');
const homeIconBackgroundPopUp = document.querySelector('.homeIconBackgroundPopup');
let homeIconTimer;

window.addEventListener('DOMContentLoaded',()=>{
	homeIconBackgroundPopUp.style.visibility = "hidden"
	homeIconBackgroundPopUp.style.opacity = 0;
})
homeIconBackground.addEventListener('mouseenter',()=>{
	homeIconTimer = setTimeout(()=>{
		homeIconBackgroundPopUp.style.visibility = "visible";
		homeIconBackgroundPopUp.style.opacity = 1;
	},500);
})
homeIconBackground.addEventListener('mouseleave',()=>{
	clearTimeout(homeIconTimer);
	    homeIconBackgroundPopUp.style.visibility = "hidden";
		homeIconBackgroundPopUp.style.opacity = 0;
})
// homeIcon popup

// bellicon pop styles
const bellIcon = document.querySelector('.bx-bell');
const bellIconPopup = document.querySelector('.bellPopup');
let bellIconTimer;

window.addEventListener('DOMContentLoaded',()=>{
	bellIconPopup.style.visibility = "hidden"
	bellIconPopup.style.opacity = 0;
})
bellIcon.addEventListener('mouseenter',()=>{
	bellIconTimer = setTimeout(()=>{
		bellIconPopup.style.visibility = "visible";
		bellIconPopup.style.opacity = 1;
	},500);
})
bellIcon.addEventListener('mouseleave',()=>{
	clearTimeout(bellIconTimer);
	    bellIconPopup.style.visibility = "hidden";
		bellIconPopup.style.opacity = 0;
})
// bellicon pop styles