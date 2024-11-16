let logos = document.getElementById(`logos`);
let items = document.getElementsByClassName(`item`);
let spans = document.getElementsByClassName(`span`);
let toggleCount = 0;

function splash() {
    if (toggleCount < 8) {
        logos.style.visibility = logos.style.visibility === `hidden` ? `visible` : `hidden`;
        toggleCount++;
        setTimeout(splash, 130);
    } else {
        slideshow();

        for (let i = 0; i < items.length; i++) {
            setTimeout(() => {
                items[i].style.visibility = `unset`;
            }, i * 100);
        }
    }
}

function slideshow() {
    logos.style.transition = `unset`;
    logos.style.height = `0px`;
    setTimeout(function() {
        logos.style.transition = `height 0.5s ease-out`;
        logos.style.height = logos.scrollHeight + `px`;
    }, 10);
}

function handleMouseOver(index) {
    return function() {
        const timePerBeat = 120 / 160; // Custom BPM 
        items[index].style.animation = `jump ${timePerBeat}s linear infinite`;
        spans[index].style.animation = `rotate ${timePerBeat}s linear infinite`;
    };
}

function handleMouseOut(index) {
    return function() {
        items[index].style.animation = ``;
        spans[index].style.animation = ``;
    };
}

splash();

for (let i = 0; i < spans.length; i++) {
    spans[i].addEventListener(`mouseover`, handleMouseOver(i));
    spans[i].addEventListener(`mouseout`, handleMouseOut(i));
}

window.addEventListener(`resize`, slideshow);
