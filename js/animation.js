//Define variables
    let inner = document.getElementById(`inner`);           // Inner for responsive dock
    let dock = document.getElementById(`dock`);             // Dock for splash animation
    let items = document.getElementsByClassName(`item`);    // Item array for jump animation
    let spans = document.getElementsByClassName(`span`);    // Span array for rotate animation
    let toggleCount = 0;                                    // Toogle count for splash animation
    let timePerBeat = 120 / 160;                            // Custom BPM for Osu! animation

//Define slideshow animation
    function slideshow() {
        dock.style.transition = `unset`;
        dock.style.height = `0px`;
        setTimeout(function() {
            dock.style.transition = `height 0.5s ease-out`;
            dock.style.height = dock.scrollHeight + `px`;
        }, 10);
    }

//Define splash animation
    function splash() {
        if (toggleCount < 8) {
            dock.style.visibility = dock.style.visibility === `hidden` ? `visible` : `hidden`;
            toggleCount++;
            setTimeout(splash, 130);
        } 
        else {
            slideshow();

            for (let i = 0; i < items.length; i++) {
                setTimeout(() => {
                    items[i].style.visibility = `unset`;
                }, i * 100);
            }
        }
    }

//Define Osu! animation
    function osuAnimation(index, timePerBeat) {
        items[index].style.animation = `jump ${timePerBeat}s linear infinite`;
        spans[index].style.animation = `rotate ${timePerBeat}s linear infinite`;
    }

//Trigger Osu! animation up on mouse hover    
    function handleMouseOver(index) {
        return function() {
            osuAnimation(index, timePerBeat)
        };
    }

//Trigger Osu! animation to disappear
    function handleMouseOut(index) {
        return function() {
            items[index].style.animation = ``;
            spans[index].style.animation = ``;
        };
    }

//Trigger splash animation
    splash();

//Trigger event to monitor mouse hover
    for (let i = 0; i < spans.length; i++) {
        spans[i].addEventListener(`mouseover`, handleMouseOver(i));
        spans[i].addEventListener(`mouseout`, handleMouseOut(i));
    }

//Trigger slideshow animation up on webpage resize
    window.addEventListener(`resize`, slideshow);

//Trigger responsive dock width 
    const dockWidth = new ResizeObserver(entries => {
        for (let entry of entries) {
        const newWidth = entry.contentRect.width;

        // Perform an action based on width
        if (newWidth < 782) {
            dock.style.width = "450px";
        } else {
            dock.style.width = "752px";
        }
        }
    });

    dockWidth.observe(inner);
