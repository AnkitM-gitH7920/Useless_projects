let textField;
let check          = document.getElementById('check');
let backward_check = document.getElementById("dateBackward");
let forward_check  = document.getElementById("dateForward");
let currentDay     = document.getElementById("day");
let date           = document.getElementById("date");

//updating date
let dayOnScreen;
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let currentDate = new Date();

function updateDateDisplay() {
    let formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
    date.innerHTML = formattedDate;
}
//updating date

// date forward and backward function
forward_check.addEventListener('click',()=>{
	currentDate.setDate(currentDate.getDate() + 1); 
    updateDateDisplay();

    let newDayIndex = currentDate.getDay();
    dayOnScreen = days[newDayIndex];
    currentDay.innerHTML = dayOnScreen;
})

backward_check.addEventListener('click',()=>{
    currentDate.setDate(currentDate.getDate() - 1); 
    updateDateDisplay();
    
    let newDayIndex = currentDate.getDay();
    dayOnScreen = days[newDayIndex];
    currentDay.innerHTML = dayOnScreen;
})
updateDateDisplay();
// date forward and backward function


/*Date reset function here*/
function DateResetFunc(){
	currentDate = new Date();
	let MonthList = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"];
	let Rday = currentDate.getDay();
	let Rmonth = currentDate.getMonth();
	let Rdate = currentDate.getDate();
	let Ryear = currentDate.getFullYear();
	let indexedListedMonth = MonthList[Rmonth];

	let dateString = `${indexedListedMonth} ${Rdate} ,${Ryear}`;
    date.textContent = dateString;

	let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	currentDay.textContent = days[Rday];
	console.log("Preset date is on the display");

}
/*Date reset function here*/


// delete function
function removeFunc(){
    let taskBody = document.getElementById("taskBody");
    taskBody.remove();
}
// delete function

// Main content loading functions
check.addEventListener('click',()=>{
    let taskBookedDate = date.textContent;
	textField = document.getElementById('textField')
    bottomBox = document.getElementById('bottomBox');
    if (textField.value == "") {
    	alert("Please enter a task first!!!")
    	return
    }
	bottomBox.innerHTML += `
	<div id="taskBody" class="taskBody">
		<input type="checkbox" name="" id="checkUncheck">
		<div class="InnerText" id="InnerText">
			<p id="task" >${textField.value}</p>
		</div>
		<i id="deleteIcon" onclick="removeFunc()" class='bx bxs-x-square'></i>
		<i id="infoIcon" class='bx bx-info-circle' style='color:#ffffff' ></i>
		<div id="dateInfo" class="hoverElement-TimeDisplay">
            ${taskBookedDate}
	    </div>
	</div>`;
	textField.value = "";
})
// Main content loading functions

// defining animations
let resetIcon = document.getElementById("DateResetIcon");
let resetPopUp = document.getElementById("resetPopUp");
let resetTimer;

resetIcon.addEventListener('mouseenter',()=>{
	resetTimer = setTimeout(()=>{
		resetPopUp.style.display = "block";
	},1500)
	
})
resetIcon.addEventListener('mouseleave',()=>{
	clearTimeout(resetTimer);
	resetPopUp.style.display = "none";
});
// defining animation