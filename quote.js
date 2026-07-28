function nextQuoteStep(step){


document.querySelectorAll(".form-card").forEach(card=>{

card.classList.add("hidden");

});



document.getElementById("quoteStep" + step)
.classList.remove("hidden");



document.getElementById("quoteProgressText").innerText =
"Step " + step + " of 4";



let percent = step * 25;


document.getElementById("quoteProgressFill")
.style.width = percent + "%";


}





function generateQuote(){


const packageType =
document.getElementById("quotePackageType").value;

const priority =
document.getElementById("quotePriority").value;

const distance =
document.getElementById("quoteBudget").value;

const stops =
document.getElementById("quoteStops").value;

const baseByPackage = {
"Medical Supplies": 75,
"Lab Specimen": 95,
"Pharmaceuticals": 110,
"Medical Records": 60,
"Diagnostics Equipment": 140
};

const distanceFee = {
"0 - 10 miles": 20,
"11 - 25 miles": 45,
"26 - 50 miles": 80,
"51+ miles": 130
};

const stopFee = {
"1 Stop": 0,
"2 - 3 Stops": 25,
"4+ Stops": 55
};

const priorityMultiplier = {
"Routine": 1,
"Urgent": 1.25,
"STAT": 1.6
};

const subtotal =
(baseByPackage[packageType] || 75) +
(distanceFee[distance] || 20) +
(stopFee[stops] || 0);

const quote = Math.round((subtotal * (priorityMultiplier[priority] || 1)) / 5) * 5;

let timeline = "Same day delivery";

if(priority === "Urgent"){
timeline = "1-2 hour pickup window";
}

if(priority === "STAT"){
timeline = "30-60 minute pickup window";
}

const routeType =
priority === "STAT"
? "Dedicated direct run"
: "Standard routed delivery";

showQuoteAnalysis(quote, timeline, routeType, priority);


}

function showQuoteAnalysis(quote, timeline, routeType, priority){

nextQuoteStep(4);


document.getElementById("generatedQuote").innerText =
"Analyzing...";


setTimeout(()=>{

document.getElementById("generatedQuote").innerText =
"$" + quote.toLocaleString();

document.getElementById("quoteResultService").innerText =
routeType;

document.getElementById("quoteTimeline").innerText =
timeline;

document.getElementById("quoteResultPriority").innerText =
priority;

},2000);


}



function submitQuote(){


let quoteRequest = {


type:
"Quote Request",

company:
document.getElementById("quoteFacility").value,


contact:
document.getElementById("quoteContact").value,


email:
document.getElementById("quoteEmail").value,


phone:
document.getElementById("quotePhone").value,


pickup:
document.getElementById("quotePickup").value,


delivery:
document.getElementById("quoteDelivery").value,


packageType:
document.getElementById("quotePackageType").value,


budget:
document.getElementById("quoteBudget").value,


description:
document.getElementById("quoteDescription").value,


priority:
document.getElementById("quotePriority").value,


date:
document.getElementById("quoteDate").value,


time:
document.getElementById("quoteTime").value,


stops:
document.getElementById("quoteStops").value,


notes:
document.getElementById("quoteNotes").value,


estimatedQuote:
document.getElementById("generatedQuote").innerText,


status:
"Pending",


createdBy:
"Avery AI"


};



let requests =
JSON.parse(localStorage.getItem("requests")) || [];



requests.push(quoteRequest);



localStorage.setItem(
"requests",
JSON.stringify(requests)
);



alert("Your quote request has been submitted!");



window.location.href="index.html";


}