var slider = document.getElementById("container2");
var myWindow = document.getElementById("container1");
var mouseIsDown = false;
var previousY;
var rateOfChange = 0.1;
var lastDifference;
var continueScrollingTimer;
console.log($(slider).position().top);
console.log($(slider).height());
console.log($(myWindow).position().top);
console.log($(myWindow).height());

function animate(animateValue){
	if(animateValue > 0){
		if((($(slider).position().top + animateValue) < 0)){
			slider.style.top = ($(slider).position().top + animateValue) + "px";
		} else {
			slider.style.top = (0 + "px");
		}
	} else {
		if((($(slider).position().top + animateValue) > ($(myWindow).height() - $(slider).height()))){
			slider.style.top = ($(slider).position().top + animateValue) + "px";
		} else {
			slider.style.top = ($(myWindow).height() - $(slider).height()) + "px";
		}
	}
}

function continueScroling(){
        
    var absoluteValue;
    if(lastDifference == 0 || lastDifference == undefined || lastDifference == null){
        return;
    } else if(lastDifference < 0){
        absoluteValue = lastDifference * -1;
    } else {
        absoluteValue = lastDifference;
    }

    if(absoluteValue > rateOfChange){
        animate(lastDifference);
        if(lastDifference < 0){
            lastDifference = lastDifference + rateOfChange;
        } else {
            lastDifference = lastDifference - rateOfChange;
        }
        continueScrollingTimer = setTimeout(function(){
            continueScroling();
        }, 1);
    } else {
        lastDifference = 0;
    }
}

$(".slidewindow").mousemove(function(e){
	if(mouseIsDown){
		//console.log("mouse move");
		animate((e.clientY - previousY));
		lastDifference = (e.clientY - previousY);
		previousY = e.clientY;
	}
});

$(".slidewindow").mousedown(function(e){
	mouseIsDown = true;
	lastDifference = 0;
	clearTimeout(continueScrollingTimer);
	startY = $(slider).position().top;
	previousY = e.clientY;
});

$(".slidewindow").mouseup(function(){
	mouseIsDown = false;
	continueScroling();
});

$(".slidewindow").mouseout(function(){
	mouseIsDown = false;
	continueScroling();
});