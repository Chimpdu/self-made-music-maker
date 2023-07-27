let tracks = addTracks();
let sources = createSources(tracks);
setPlayButton(tracks);
addNewSource(tracks, sources);
   
//add track visual & track buttons
function addTracks() {
    let tracks = [[], [], [], [], []]; // to add or delete a track, just modify here and other related stuff would be updated automatically
    const trackSection = document.querySelector("#track-visual");
    const trackRadioButtonSection = document.querySelector("#track-selection");
    tracks.forEach((_element ,index) => {
        const para0 = document.createElement("p");
        const radio_in = document.createElement("input");
        radio_in.setAttribute("type", "radio");
        radio_in.setAttribute("name", "track");
        radio_in.setAttribute("class", "track-buttons");
        radio_in.setAttribute("id", "track-"+index);
        radio_in.setAttribute("value", index);
        const label = document.createElement("label");
        label.setAttribute("for", "track-"+index);
        label.innerText = "Track "+ (index+1);
    
        if (index == 0) {         
            radio_in.checked = true; 
        }
    
        para0.appendChild(radio_in);
        para0.appendChild(label);
        trackRadioButtonSection.appendChild(para0); 
    
        const para1 = document.createElement("p");
        const h2 = document.createElement("h2");
        para1.setAttribute("id", "track-visual-"+(index))
        para1.setAttribute("class", "track-visuals");
        h2.innerText = "Track "+ (index+1);
        para1.append(h2);
        trackSection.append(para1);
    })
    return tracks;
}

//add instrument buttons
function createSources(tracks) {  // to change sources, just modify here and other related stuff would be updated automatically. Or add new source at the webpage
    let sources = [
        {src : "sounds/drum.mp3", name: "Drum"},
        {src: "sounds/piano.mp3", name: "Piano"},
        {src: "sounds/violin.mp3", name: "Violin"},
    ] 
    createInstrumentButtons(sources, tracks)
    return sources; 
}
function createInstrumentButtons(sources, tracks) {
    const buttonsSection = document.querySelector("#instrument-buttons");
    sources.forEach((element) => {

        if (!document.getElementById("instrument-button-"+element.name.toLowerCase())) {   
            const button = document.createElement("button");
                button.innerText = element.name;
                button.setAttribute("id", "instrument-button-"+element.name.toLowerCase());
                button.setAttribute("class", "instrument-buttons");
                button.addEventListener("click", () => {addToTrack(element, tracks)}); 
                buttonsSection.append(button);
        } 
          
    })
}
//add instruments to tracks
function addToTrack(element, tracks) {
    let currentTrack =  parseInt(document.querySelector("input[name= 'track']:checked").value);
    tracks[currentTrack].push(element);
    const track_visual = document.querySelector("#track-visual-"+currentTrack);
    para = document.createElement("p");
    para.innerText = element.name;
    track_visual.append(para);;
}

//play button
function setPlayButton(tracks) {
    const playButton = document.querySelector("#play-button");
    playButton.addEventListener("click", ()=>{
        tracks.forEach((element, index) => {
            element.length>0 ? playTrack(element, index+1) : console.log("Track " + (index+1) + " is empty");
        })
    })// each track is played concurrently.
}

//play a track
function playTrack(track, trackNum) {
    let i = 0;
    let audio = new Audio;
    audio.src = track[i].src;
    audio.loop = false;
    audio.volume = 1;
    audio.play();
    console.log("Now, playing track "+trackNum+": "+ track[i].name);
    audio.addEventListener("ended", ()=>{
        i =  ++ i < track.length ? i : 0; 
        audio.src = track[i].src;
        audio.play();
        console.log("Now, playing track "+trackNum+": "+ track[i].name);
    })
    // the second instrument is played after the first one is finished in a track.
}

function addNewSource(tracks, sources) {
    const addNewSourceButton = document.querySelector("#new-source-button");
    const head = document.getElementById("head");

    addNewSourceButton.addEventListener("click", () => {
        const file = document.getElementById("new-source").files[0];
        if(!file) return;
        const url = URL.createObjectURL(file);
        // allow user to enter the name of his/her instrument
        const nameButton = document.createElement("input");
        nameButton.setAttribute("type", "text");
        nameButton.setAttribute("id", "name-button");
        const label = document.createElement("label");
        label.setAttribute("for", "name-button");
        label.innerText = "Name your source: "
        const para = document.createElement("p");
        para.append(label);
        para.append(nameButton);
        head.append(para);
        const submitButton = document.createElement("button");
        submitButton.innerText = "Submit name";
        head.append(submitButton); 

        submitButton.addEventListener("click", ()=>{
            let name =  nameButton.value;
            sources.push({src:url, name: name});
            createInstrumentButtons(sources, tracks);
            head.removeChild(para);
            head.removeChild(submitButton);
        })
   
    })
}
