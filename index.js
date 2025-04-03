
// Some global variables
const error = document.getElementById("errorText");
const nameInput = document.getElementById("fullName")
const dateInput = document.getElementById("dob");
const idInput = document.getElementById('memberId');
const form = document.getElementById("main-form");
var nameError = false;
var confettiRan = false;
var dateError = false;
var idError = false;
var tabNumber = 1; //either 1 or 2
var count = 0;
var doneLoading = false;
var goneBack = false;
var secondScreen = false; //whether or not on the second screen

/* FORM SUBMISSION */
// Checks for errors and runs updateErrorText to demonstrate if there is an error, if none it runs processInfo()
form.addEventListener("submit", function(event) 
{
	event.preventDefault();
	if (nameInput.value.trim().split(" ").length == 2 && nameInput.value.trim().length >= 4)
	{
		nameError = false;
	}
	else
	{
		nameError = true;
	}

	if (dateInput.value.replace(/\D/g, "").length !== 8 || parseInt(dateInput.value.slice(6)) < 1900 || parseInt(dateInput.value.slice(6)) > 2100)
	{
		dateError = true;
	}
	else
	{
		dateError = false;
	}

	if (idInput.value.length == 0)
	{
		idError = true;
	}
	else
	{
		idError = false;
	}

	updateErrorText();
	if (nameError==false && dateError==false && idError==false)
	{
		processInfo();
	}
});

/* MAKE NAME INPUT WORK PERFECTLY */
nameInput.addEventListener("input", function(event) 
{
	doneLoading = false; //if changes then loading restarts
	goneBack = false;
	confettiRan = false;
	event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
	if (event.target.value.length > 0) //if something proper is entered ie a letter then remove error
	{
		nameError = false;
		updateErrorText();
	}
});
/* MAKE DATE INPUT WORK PERFECTLY */
dateInput.addEventListener("input", function(event) 
{
	doneLoading = false; //if changes then loading restarts
	goneBack = false;
	confettiRan = false;
	let value = event.target.value.replace(/\D/g, ""); 

	if (value.length > 8) 
	{
        value = value.slice(0, 8); // Limit to 8 characters
    }
    if (value.length >= 3) 
    {
        value = value.slice(0, 2) + "/" + value.slice(2); // Add slash after the first 2 digits
    }
    if (value.length >= 6) 
    {
        value = value.slice(0, 5) + "/" + value.slice(5); // Add slash after the second 2 digits
    }
    event.target.value = value; 
    if (value.length > 0) //if something proper is entered ie a letter then remove error
    {
    	dateError = false;
    	updateErrorText();
    }
});
/* MAKE ID INPUT WORK PERFECTLY */
idInput.addEventListener("input", function(event) 
{
	doneLoading = false; //if changes then loading restarts
	goneBack = false;
	idError = false;
	confettiRan = false;
	updateErrorText(); //if something proper is entered then remove error
});

function updateErrorText() //for both adding red border and changing error text
{
	if (nameError && dateError && idError)
	{
		nameInput.classList.add("error");
		dateInput.classList.add("error");
		idInput.classList.add("error");
		error.innerHTML = "<i class='fas fa-exclamation-circle'></i> Please enter a correct <b>name</b>, <b> date of birth</b>, and <b> ID </b>";
	}
	else if (nameError && idError)
	{
		nameInput.classList.add("error");
		dateInput.classList.remove("error");
		idInput.classList.add("error");
		error.innerHTML = "<i class='fas fa-exclamation-circle'></i> Please enter a correct <b> name </b> and <b> ID </b>";
	}
	else if (dateError && idError) 
	{
		nameInput.classList.remove("error");
		dateInput.classList.add("error");
		idInput.classList.add("error");
		error.innerHTML = "<i class='fas fa-exclamation-circle'></i> Please enter a correct <b> date of birth </b> and <b> ID </b>";
	}
	else if (nameError && dateError)
	{
		nameInput.classList.add("error");
		dateInput.classList.add("error");
		idInput.classList.remove("error");
		error.innerHTML = "<i class='fas fa-exclamation-circle'></i> Please enter a correct <b> name </b> and <b> date of birth </b>";
	}
	else if (nameError)
	{
		nameInput.classList.add("error");
		dateInput.classList.remove("error");
		idInput.classList.remove("error");
		error.innerHTML = "<i class='fas fa-exclamation-circle'></i> Please enter a correct <b> name </b>";
	}
	else if (dateError)
	{
		nameInput.classList.remove("error");
		dateInput.classList.add("error");
		idInput.classList.remove("error");
		error.innerHTML = "<i class='fas fa-exclamation-circle'></i> Please enter a correct <b> date of birth </b>";
	}
	else if (idError)
	{
		nameInput.classList.remove("error");
		dateInput.classList.remove("error");
		idInput.classList.add("error");
		error.innerHTML = "<i class='fas fa-exclamation-circle'></i> Please enter a correct <b> ID </b>";
	}
	else
	{
		nameInput.classList.remove("error");
		dateInput.classList.remove("error");
		idInput.classList.remove("error");
		error.innerHTML = "";
	}
}



/* MAKE ENTER GO TO NEXT FORM */
const inputs = document.querySelectorAll("input"); // Select all input elements
inputs.forEach((input, index) => {
	input.addEventListener("keydown", function(event) {
		if (event.key === "Enter" && index < inputs.length - 1) {
      // Move focus to the next input field
      inputs[index + 1].focus();
      event.preventDefault(); // Prevent form submission when Enter is pressed
  }
});
});




/* PROCESS INFO */

//processInfo(); //for testing the second page without having to fill out form!


function processInfo() //here we either transform into the second screen or the first screen
{
	if (secondScreen == false) //if on first screen -- transform to second
	{
		document.getElementById("title").style.marginTop = "80px"; 
		document.getElementById("form-sans-submit").classList.toggle("hidden");
		document.getElementById("svgs").classList.toggle("hidden");
		document.getElementById("scan").style.opacity = "0";
		document.getElementById("submit").classList.add("left-arrow"); 
		document.getElementById("submit").querySelector("span").textContent = "Back"; 
		secondScreen = true;

		document.getElementById("tabs").style.opacity = "1"; 
		makeTabActive();
		if (goneBack && !doneLoading) //if you went back and it wasn't done loading, just let the showLoading() function keep running
		{
		}
		else
		{
			showSecondPageContent();
			showLoading();
		}
		
	}
	else //if on second second -- transform to first
	{
		document.getElementById("title").style.marginTop = "260px"; 
		document.getElementById("form-sans-submit").classList.toggle("hidden");
		document.getElementById("svgs").classList.toggle("hidden");
		document.getElementById("scan").style.opacity = "0.75";
		document.getElementById("submit").classList.remove("left-arrow"); 
		document.getElementById("submit").querySelector("span").textContent = "Continue"; 
		secondScreen = false;
		goneBack = true;  

		document.getElementById("tabs").style.opacity = "0"; 
		document.getElementById("second-page-loading").style.opacity = "0";
		document.getElementById("second-page-content").style.opacity = "0";
	}
}

/* MAKE TAB APPEAR AS ACTIVE */
function makeTabActive()
{
	let tab1 = document.getElementsByClassName("tab")[0];
	let tab2 = document.getElementsByClassName("tab")[1];
	let tabs = document.getElementById("tabs");
	if (tabNumber == 1)
	{
		tab1.style.color = "#1977F2";
		tab1.style.fontWeight = "bold";
		tab2.style.color = "#00000099"
		tab2.style.fontWeight = "400";
		tabs.style.setProperty("--tab1-color", "#1977F2");
		tabs.style.setProperty("--tab2-color", "#00000099");
	}
	if (tabNumber == 2)
	{
		tab1.style.color = "#00000099"
		tab1.style.fontWeight = "400";
		tab2.style.color = "#1977F2";
		tab2.style.fontWeight = "bold";
		tabs.style.setProperty("--tab2-color", "#1977F2");
		tabs.style.setProperty("--tab1-color", "#00000099");
	}
}
document.getElementById("tab1").addEventListener("click", function() 
{
	tabNumber = 1;
	makeTabActive();
	if (doneLoading)
	{
		showSecondPageContent();
	}
});
document.getElementById("tab2").addEventListener("click", function() 
{
	tabNumber = 2;
	makeTabActive();
	if (doneLoading)
	{
		showSecondPageContent();
	}
});



/* SHOW INFORMATION ON SECOND TAB */
async function showLoading() //currently, loading is 3.5 seconds (7 dots of .5 seconds each), and if you exit out or change any inputs it restarts
{
	return new Promise(async (resolve) => 
	{
        if (!doneLoading) //so it doesn't load if already loaded
        {
        	setTimeout(() => 
        	{
        		let dotCount = 1;
        		let count = 0;
        		const interval = setInterval(() => 
        		{
        			if (secondScreen)
        			{
        				document.getElementById("second-page-loading").style.opacity = "1";
        				let loading = document.getElementById("loading");
        			}
        			loading.textContent = "Loading" + ".".repeat(dotCount);
        			dotCount = dotCount % 3 + 1;
        			count++;
        			if (!secondScreen) //stop loading if you go back
        			{
        				count=0;
        			}
        			if (count === 7) 
        			{
        				clearInterval(interval);
        				document.getElementById("second-page-loading").style.opacity = "0";
        				setTimeout(() => 
        				{
        					resolve(); //show second page content
                    }, 100); // Delay to ensure the opacity change completes
        			}
        		}, 500); //ms to change dots
        	}, 250); //ms to load in
        }
        else
        {
        	resolve(); //show second page content
        }
    });
}
function pause(duration) {
	return new Promise(resolve => setTimeout(resolve, duration));
}


//MAKE INPUT BE STYLED EXACTLY LIKE THIS ARRAY!
const variables = [
["First Name", "John"], 
["Last Name", "Smith"],
["Insurance Name", "Delta Dental"],
["Is Active", "Active"],
["Renewal Date", "01/01/2026"],
["Termination Date", "01/01/2025"],
["Maximum", '$1500'],
["Maximum Used", "$500"], 
["Deductible", "$50"],
["Deductible Used", "$50"],
["Prev %", "100%"],
["Basic %", "80%"],
["Major %", "50%"]
]; 

let maximumRemaining = parseInt(variables[6][1].replace("$",""))-parseInt(variables[7][1].replace("$","")) ; //see how much $ is left
maximumRemaining = `$${maximumRemaining}`;
let percentOfMaxUsed = (maximumRemaining.replace("$","")/parseInt(variables[6][1].replace("$","")))*100 + "%";
let active = false; //see if insurance is active 
if (variables[3][1] == "Active")
{
	active = true;
}
let found = true; //see if insurance exists
if (variables[2][1] == "Not Found")
{
	found = false;
}

async function showSecondPageContent() //this will run in its entirety upon completion of showLoading()
{
	await showLoading(); //wait until showLoading is gone
	doneLoading = true;
	let secondPage = document.getElementById("second-page-content");
	if (secondScreen) //so you don't show the loading if you are not on the second screen
	{
		secondPage.style.opacity = 1;
		runLoadingAnimation();
	}



	if (tabNumber==1) //if on first tab
	{
		if (!found) //if insurance is not found
		{
			secondPage.innerHTML = `
			<div id=loading-1>
			<div class='text' id='first'> Your insurance was <br> <b>not found.</b></div>
			</div>
			<div id=loading-2>
			<p id='inactive-sad'> :( </p>
			</div>
			<div id=loading-3>
			<div class="line-with-text">
			<span class="line-text" id='inactive-line-text'>Why is this happening?</span>
			<div class="line" id="inactive-line"></div>
			<div class='text'> There are couple reasons. First, please make sure you put <b> all </b> information in correctly. It could also be due to a termination from your job or a change in your employer's insurance policy.</div>
			<div class='text' id='inactive-last'> Please reach out to your HR department for confirmation.</div>
			</div>
			`; 
		}
		else if (!active) //if insurance is inactive
		{
			secondPage.innerHTML = `
			<div id=loading-1>
			<div class='text' id='first'> Your ${variables[2][1]} insurance <br> is <b>inactive</b> as of ${formatDateString(variables[5][1])}. </div>
			</div>
			<div id=loading-2>
			<p id='inactive-sad'> :( </p>
			</div>
			<div id=loading-3>
			<div class="line-with-text">
			<span class="line-text" id='inactive-line-text'>Why is this happening?</span>
			<div class="line" id="inactive-line"></div>
			<div class='text'> There are couple reasons. It could be due to a termination from your job or a change in your employer's insurance policy.</div>
			<div class='text' id='inactive-last'> Please reach out to your HR department for confirmation.</div>
			</div>
			`; 
		}
		else //if found+active and on first tab!!!
		{
			secondPage.innerHTML = ` 
			<div id=loading-1>
			<div class='text' id='first'> Your ${variables[2][1]} insurance<br> <b>is <span id='dance'>active.</span></b> </div> 
			</div>

			<div id=loading-2>
			<div class="line-with-text">
			<span class="line-text">Remaining Benefits<span class='icon2'>i</span></span>
			<div class="line"></div>
			</div>
			<div class='text' id='second'>You have <b>${maximumRemaining}</b> out of <b>${variables[6][1]}</b> left to use this benefit period.<br><span id='smaller'>( ${formatDateString(decrementYear(variables[4][1]))} - ${(formatDateString(variables[4][1]))} )</span></div>	
			<div class="progress-container">
			<div class="progress-labels">
			<span class="spent-label">Remaining: ${maximumRemaining}</span>
			<span class="remaining-label">Used: ${variables[7][1]}</span>
			</div>
			<div class="progress-bar">
			<div class="progress-fill" style="width: 0%;"></div>
			</div>
			</div>
			</div>

			<div id='loading-3'>
			<div class="line-with-text">
			<span class="line-text">What Insurance Covers<span class='icon2'>i</span></span>
			<div class="line"></div>
			</div>
			<div class='text' id='third'> Insurance will pay a percentage of the work completed up until your remaing benefits are gone.</div>
			<div class='text' id='third'> Work is divided up into <b>3 categories:</b> </div>
			<div id='percentages'>
			<p class='per-item'> Preventative: \n 100% covered \n <br> Cleanings \n Exams \n Xrays </p>
			<p class='per-item'> Basic: \n 80% covered \n <br> Fillings \n Root Canals</p>
			<p class='per-item'> Major: \n 50% covered \n <br> Crowns \n Implants </p>
			</div>
			</div>
			`;
		}
	}



	else // if on second tab
	{
		if (!found) //if insurance is not found
		{
			secondPage.innerHTML = `
			<div id=loading-1>
			<div class='text' id='first'> Your insurance was <br> <b>not found,</b><br>so we cannot use<br>the Price Calculator.</div>
			</div>
			<div id=loading-2>
			<p id='inactive-sad'> :( </p>
			</div>
			`; 
		}
		else if (!active) //if insurance is inactive
		{
			secondPage.innerHTML = `
			<div id=loading-1>
			<div class='text' id='first'> Your insurance is <br> <b>inactive,</b><br>so we cannot use<br>the Price Calculator.</div>
			</div>
			<div id=loading-2>
			<p id='inactive-sad'> :( </p>
			</div>
			`; 
		}
		else //if found+active and on second tab!!!
		{
			secondPage.textContent = "Here is the Price Calculator: \n Fillings: $100 \n Cleaning: $0 \n";
		}
	}
}





function decrementYear(dateString) 
{
	let [month, day, year] = dateString.split("/");
	year = parseInt(year) - 1;
	const newDateString = `${month}/${day}/${year}`;
	return newDateString;
}
function formatDateString(dateString) 
{
	const [month, day, year] = dateString.split("/");
	if (isNaN(month) || isNaN(day) || isNaN(year)) 
	{
		return "Invalid Date";
	}
	const monthNum = parseInt(month) - 1; 
	const dayNum = parseInt(day);
	const yearNum = parseInt(year);
	if (monthNum < 0 || monthNum > 11 || dayNum < 1 || dayNum > 31) 
	{
		return "Invalid Date";
	}
	const date = new Date(yearNum, monthNum, dayNum);
	if (isNaN(date.getTime())) 
	{
		return "Invalid Date";
	}
	const options = { year: "numeric", month: "long", day: "numeric" };
	return date.toLocaleDateString("en-US", options);
}



/* THIS FUNCTION IS ABLE TO IDENTIFY WHEN AN ELEMENT LOADS INTO THE DOM (IMPORTANT FOR .innerHTML) THEN LOADS IT IN */
function waitForElement(selector, callback) 
{
	const observer = new MutationObserver((mutations, obs) => 
	{
		const element = document.querySelector(selector);
		if (element) 
		{
			callback(element);
            obs.disconnect(); // Stop observing once the element is found
        }
    });
    // Start observing the document for changes
    observer.observe(document, 
    {
    	childList: true,
    	subtree: true
    });
}
function runLoadingAnimation() //THIS MAKES THE SECOND PAGE CONTENT LOAD IN!
{
	waitForElement(".progress-fill", (element) => {
		setTimeout(() => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					element.style.width = `${percentOfMaxUsed}`;
				});
			});
		}, 200);
	});
	waitForElement("#loading-1", (element) => {
		element.classList.add("loading-hidden");
		setTimeout(() => {
			element.classList.replace("loading-hidden", "loading-visible");
        }, 50); // Short delay for rendering
	});

	waitForElement("#loading-2", (element) => {
		element.classList.add("loading-hidden");
		setTimeout(() => {
			element.classList.replace("loading-hidden", "loading-visible");
        }, 200); // Slightly longer delay for sequencing
	});

	waitForElement("#loading-3", (element) => {
		element.classList.add("loading-hidden");
		setTimeout(() => {
			element.classList.replace("loading-hidden", "loading-visible");
        }, 350); // Longest delay for final element
	});
	waitForElement("#dance", (element) => {
		if (active && found && !confettiRan)
		{
			setTimeout(() => 
			{
				element.classList.add("shine");
		}, 2500);
			//putConfetti();
			confettiRan = true;
		}
	});
}

function putConfetti() 
{
	const colors = ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"];
	const confettiContainer = document.createElement("div");
	confettiContainer.classList.add("confetti");
	document.body.appendChild(confettiContainer);
	for (let i = 0; i < 100; i++) {
		const confettiPiece = document.createElement("div");
		confettiPiece.classList.add("confetti-piece");
		confettiPiece.style.left = Math.random() * 100 + "vw";
		confettiPiece.style.animationDuration = 2 + Math.random() * 1.4 + "s"; //length including starting time (1.25s)
		confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
		confettiContainer.appendChild(confettiPiece);
	}

	setTimeout(() => {
		confettiContainer.remove();
    }, 4000); // Duration of the celebration
}

