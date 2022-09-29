/*jquery code to alter the behaviour of sideNavigation bar for videoPlayer page*/
$(document).ready(function () {
    function closeFullSideNav() {
        $(".fullSidenav").css("margin-left", "-240px");
    }
    function playMode() {
        //disable side nav and open full width side bar and overlay
        $("#Sidenav").css("display", "none");
        $("#RightContainer").addClass("rightContainerForSm");
        closeFullSideNav();
    }
    $(window).resize(function () {
        reSizingHandler();
        toogleShowLessBtn();
        toogleShowLessBtn2();
    });
    function reSizingHandler() {
        playMode(); return;
    }
    reSizingHandler();
    //disable side nav and open full width side bar and overlay
    playMode();
    $("#fullSidenav").css("display", "none");

    function toogleShowLessBtn(){
      const vidDescTxtContainer = document.querySelector(".vid-desc-txt");
      const divHeight = parseInt(vidDescTxtContainer.offsetHeight);
      const emStyle = window.getComputedStyle(vidDescTxtContainer);
      const lineHeight = parseInt(emStyle.getPropertyValue("line-height").replace("px",""));
      const totalNoOfLines= Math.round(divHeight/lineHeight);
      if(totalNoOfLines >= 3){
     //  need to show less txt btns
      showMoreShowLessBtn.style.display='inline-block';
      vidDescTxtContainer.style.marginBottom='';
      }
      else{
       showMoreShowLessBtn.style.display='none';
       vidDescTxtContainer.style.marginBottom='1.5rem';
      }
     }
     toogleShowLessBtn();

     function toogleShowLessBtn2(){
      
    
      const commTxtContainer=  document.getElementsByClassName("comm-txt");
      for(i=0;i<commTxtContainer.length;i++){
        let element=commTxtContainer[i];
        const divHeight = parseInt(element.offsetHeight);
        const emStyle = window.getComputedStyle(element);
        const lineHeight = parseInt(emStyle.getPropertyValue("line-height").replace("px",""));
        const totalNoOfLines= Math.round(divHeight/lineHeight);

        if(totalNoOfLines >= 4){
          //  need to show less txt btns
          element.nextElementSibling.style.display='flex';
          element.style.marginBottom='';
           }
           else{
            element.nextElementSibling.style.display='none';
            element.style.marginBottom='0.5rem';
          }

      };
      
   
  
      
     
    


     }
     toogleShowLessBtn2();

     

});



/*video player vanilla js code*/

const playPauseBtn = document.querySelector(".play-pause-btn");
const playPauseWraper = document.querySelector(".play-pause-wraper");   
const centerContainer = document.querySelector(".center-container")
const centerPlayBtnContainer = document.querySelector(".center-play-btn-container");                                 
const muteBtn = document.querySelector(".mute-btn"); 
const volumeSlider= document.querySelector(".volume-slider");
const currentTimeElem = document.querySelector(".current-time");
const totalTimeElem = document.querySelector(".total-time");
const miniPlayerBtn = document.querySelector(".mini-player-btn")
const theaterBtn = document.querySelector(".theater-btn");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const videoContainer = document.querySelector(".video-container");
const video_player_and_suggestion_grid = document.querySelector(".video_player_and_suggestion_grid");
const leftBackwardAnimationContainer= document.querySelector(".left-backward-animation-container");
const rightFrdAnimationContainer = document.querySelector(".right-frd-animation-container");
const leftPrevBtnContainer = document.querySelector(".left-prev-btn-container");
const rightNextBtnContainer= document.querySelector(".right-next-btn-container");
const previewImg = document.querySelector(".preview-img");
const thumbnailImg = document.querySelector(".thumbnail-img");
const timelineContainer = document.querySelector(".timeline-container")
const video = document.querySelector("video");

const additionalControlsContainer=document.querySelector(".additional-controls-container");

document.addEventListener("keydown",e =>{
    const tagName = document.activeElement.tagName.toLowerCase()
    if (tagName === "div") return
    switch(e.key.toLowerCase()){
            case " ":
               if (tagName === "button") return
            case "k":
            togglePlay()
            break;
            case "f":
                toggleFullScreenMode()
                break
            case "t":
                toggleTheaterMode()
                break
            case "i":
                toggleMiniPlayerMode()
                break
            case "m":
                toggleMute()
                break
            case "arrowleft":
            case "j":
              skip(-5);
              break;
            case "arrowright":
            case "l":
              skip(5);
              break;
    }
})

// timeLine
timelineContainer.addEventListener("mousemove",handleTimelineUpdate);

  //scrubing event 
  timelineContainer.addEventListener("mousedown", toggleScrubbing)
  document.addEventListener("mouseup", e => {
    if (isScrubbing) toggleScrubbing(e)
  })
  document.addEventListener("mousemove", e => {
    if (isScrubbing) handleTimelineUpdate(e)
  })
  

let isScrubbing = false
let wasPaused
function toggleScrubbing(e) {
  const rect = timelineContainer.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  isScrubbing = (e.buttons & 1) === 1
  videoContainer.classList.toggle("scrubbing", isScrubbing);
  if (isScrubbing) {
    wasPaused = video.paused;
    video.pause();
  } else {
    video.currentTime = percent * video.duration;
    if (!wasPaused) video.play();
  }

  handleTimelineUpdate(e);
}


function handleTimelineUpdate(e){
const rect = timelineContainer.getBoundingClientRect()
// alert(rect.x+" and e.x :"+" "+e.x+" "+video.duration);


const percent = Math.min( Math.max( 0 ,  e.x - rect.x) , rect.width ) / rect.width; 

/*
             how_muh_coverd  
 percent =  _________________    * 100      

               total_width

               Note:-here multiplication is done in css , js will only return percent value between 0 and 1 
*/
const previewImgNumber = Math.max(
  1,
  Math.floor((percent * video.duration) / 10)
)
const previewImgSrc = `assets/previewImgs/preview${previewImgNumber}.jpg`
previewImg.src = previewImgSrc
timelineContainer.style.setProperty("--preview-position", percent)

if (isScrubbing) {
  e.preventDefault()
  thumbnailImg.src = previewImgSrc;
  timelineContainer.style.setProperty("--progress-position", percent)
}
}

//play pause events
playPauseBtn.addEventListener('click',togglePlay);
function togglePlay(){
   video.paused? video.play() : video.pause();
}

video.addEventListener('pause',()=>{
     videoContainer.classList.add("paused");
     centerPlayBtnContainer.classList.add("paused");
});
video.addEventListener('play',()=>{
    videoContainer.classList.remove("paused")
    centerPlayBtnContainer.classList.remove("paused");

});
video.addEventListener('click',videoClickEventFun);
function videoClickEventFun(){
  togglePlay();
  toggleCenterAdditionalBtns();
}

function toggleCenterAdditionalBtns(){
const fullScreenMode= document.querySelector(".full-screen");
if(fullScreenMode==null){
  centerContainer.style.opacity=1;
  additionalControlsContainer.style.background="rgba(0, 0, 0, 0.493)";
}
else{
  const centerContainer = document.querySelector(".center-container");
  const opacityValue = window.getComputedStyle(centerContainer).getPropertyValue("opacity");
  if(opacityValue==1){
    centerContainer.style.opacity=0;
    additionalControlsContainer.style.background="transparent";
    video.play();
  }
else{
  centerContainer.style.opacity=1;
  additionalControlsContainer.style.background="rgba(0, 0, 0, 0.493)";
  video.pause();
}

}

}

//additional control container
// playPauseWraper.addEventListener('click',togglePlay)

//theater mode 
theaterBtn .addEventListener('click',toggleTheaterMode);
function toggleTheaterMode(){
    videoContainer.classList.toggle('theater');
    video_player_and_suggestion_grid.classList.toggle('disableTheaterMode');
    openCloseTheater();
 }

 function openCloseTheater(){
    const disabledTheaterMode = document.querySelector('.disableTheaterMode');
    if(disabledTheaterMode==null){
     //opening theater mode
    document.querySelector('#removeGrid').classList.remove('video_player_and_suggestion_grid');

    document.querySelector('.videoSuggestionSide').classList.add('two-grid-colmns-on-theater-mode-enable');

    //selecting and cloning comment box
    const commentBoxToRemove = document.querySelector("#commentBox");
    commentBoxClone = commentBoxToRemove.cloneNode(true);

    //deleting comment box
    commentBoxToRemove.parentNode.removeChild(commentBoxToRemove);

    //appending the cloned Comment box as child of commentWraper box
    const commentWraper = document.querySelector(".comment_wraper");
    commentWraper.appendChild(commentBoxClone);

    }
    else{
      //closing theater mode
      document.querySelector('#removeGrid').classList.add('video_player_and_suggestion_grid');
      document.querySelector('.videoSuggestionSide').classList.remove('two-grid-colmns-on-theater-mode-enable');

          //selecting and cloning comment box
        const elementToRemove = document.querySelector("#commentBox");
        const elementClone = elementToRemove.cloneNode(true);

        //deleting comment box
        elementToRemove.parentNode.removeChild(elementToRemove);

       //appending the cloned Comment box as child of commentWraper box
       const videoPlayerSide = document.querySelector(".videoPlayerSide");
       videoPlayerSide.appendChild(elementClone);
    }

 
  }

 //fullScreen mode 

 fullScreenBtn.addEventListener('click',toggleFullScreenMode)
 function toggleFullScreenMode(){
    if (document.fullscreenElement == null) {
        videoContainer.requestFullscreen();

        const centerContainer = document.querySelector(".center-container");
        centerContainer.style.opacity=0;
        additionalControlsContainer.style.background="transparent";
        video.play();
    
       
      } else {
        document.exitFullscreen();
        const centerContainer = document.querySelector(".center-container");
        centerContainer.style.opacity=1;
        additionalControlsContainer.style.background="rgba(0, 0, 0, 0.493)";
        video.pause();
      }

 } 
 document.addEventListener("fullscreenchange", () => {
    videoContainer.classList.toggle("full-screen", document.fullscreenElement)
  })

  //miniplayer mode
  miniPlayerBtn.addEventListener("click", toggleMiniPlayerMode);
  function toggleMiniPlayerMode() {
    if (videoContainer.classList.contains("mini-player")) {
      document.exitPictureInPicture()
    } else {
      video.requestPictureInPicture()
    }
  }

  video.addEventListener("enterpictureinpicture", () => {
    videoContainer.classList.add("mini-player")
  })
  
  video.addEventListener("leavepictureinpicture", () => {
    videoContainer.classList.remove("mini-player")
  })
  
  
  //volume

  const iconBtn=document.querySelector(".volume-muted-icon");
  iconBtn.addEventListener('click', e =>{
// alert(video.volume +"s");
// alert(volumeSlider.value +"s");
    if(video.volume == 0 && volumeSlider.value == 0){
        video.volume=1;//it will fire video volume change event
    
        video.muted=false;
        // alert(video.muted);
        volumeSlider.value=1
        // alert(volumeSlider.value);
        e.stopImmediatePropagation();
    }
 
  });

 //event listener for mute btn
 muteBtn.addEventListener("click", toggleMute);

 //event listner for volume silder input
 volumeSlider.addEventListener('input', e => {

video.volume=e.target.value;

 })

function toggleMute(){
    video.muted=!video.muted;
   
}
video.addEventListener('volumechange',()=>{

     volumeSlider.value=video.volume;
    let volumeLevel;
    if(video.muted || video.volume === 0)
    {
        volumeSlider.value=0;
        volumeLevel="muted"
    }
    else if(video.volume >=.5){
        volumeLevel="high"
    }
    else{
        volumeLevel="low"
    }

   videoContainer.dataset.volumeLevel=volumeLevel;
  
})

//duration

//totoal duration
video.addEventListener("loadeddata",()=>{
totalTimeElem.textContent=formatDuration(video.duration);
});

//current duration
video.addEventListener("timeupdate",()=>{
  currentTimeElem.textContent=formatDuration(video.currentTime);
  const percent=video.currentTime / video.duration;
  timelineContainer.style.setProperty("--progress-position", percent);
if(video.currentTime==video.duration){
  /*video finsished*/
  /*so here you can append next video btn or some other kind of stuff*/
}

})

const leadingZeroFormatter = new Intl.NumberFormat(undefined,{
  minimumIntegerDigits:2
})

function formatDuration(time){
  const seconds =  Math.floor(time % 60);
  const minutes=Math.floor(time /60) % 60;
  const hours=Math.floor(time/3600);

  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`
  } else {
    return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
  }

}

//backward video by 10sec by double clicking left side of video

//if on the left side 2 times clicked means , user need to backward the video 10 seconds in reverse dircetion
leftBackwardAnimationContainer.addEventListener("dblclick",move10SecToBackwardDirection);
leftPrevBtnContainer.addEventListener("dblclick",move10SecToBackwardDirection)
rightFrdAnimationContainer.addEventListener("dblclick",move10SecToForwardDirection)
rightNextBtnContainer.addEventListener("dblclick",move10SecToForwardDirection);
function move10SecToBackwardDirection(e){
  e.preventDefault();
  if(Math.floor(video.currentTime)==0)
  return;
  leftBackwardAnimationContainer.classList.toggle('left-btn-double-clicked');
  setTimeout(()=>{leftBackwardAnimationContainer.classList.toggle('left-btn-double-clicked')},1200);
  skip(-10);
}
function move10SecToForwardDirection(){
  rightFrdAnimationContainer.classList.toggle('right-btn-double-clicked');
  setTimeout(()=>{rightFrdAnimationContainer.classList.toggle('right-btn-double-clicked')},1200);
  skip(10);
}
//if on the left side single time clicked means , user need to play the video
leftBackwardAnimationContainer.addEventListener("click",()=>{
 togglePlay();
 toggleCenterAdditionalBtns();
})
leftPrevBtnContainer.addEventListener("click",()=>{
  togglePlay();
  toggleCenterAdditionalBtns();
});
//if on the right side single time clicked means , user need to play the video
rightFrdAnimationContainer.addEventListener("click",()=>{
  togglePlay();
  toggleCenterAdditionalBtns();
 })
 rightNextBtnContainer.addEventListener("click",()=>{
  togglePlay();
  toggleCenterAdditionalBtns();
 })
centerPlayBtnContainer.addEventListener("click",()=>{
    togglePlay();
  toggleCenterAdditionalBtns();
 })
function  skip(skipDuration){
  video.currentTime += skipDuration;
}

//video description
const vidDescription= document.querySelector(".vid-description");

const showMoreShowLessBtn= document.querySelector(".show-more-show-less-btn");

showMoreShowLessBtn.addEventListener("click",()=>{
  vidDescription.classList.toggle("toggle-show-more-show-less-txt");
});


//comment system 

//showing-show less comment

// const showMoreLessCommBtn= document.getElementsByClassName("show-more-less-comm-btn");

// //regestring eventHandler for all the element
// for(i=0;i<=showMoreLessCommBtn.length;i++){

//   showMoreLessCommBtn[i].addEventListener("click",handleToogling);

// }
function handleToogling(e){
    e.target.parentElement.classList.toggle("toggle-show-more-less-comm-btn");
}


//sorting comment
// const commentSortBtn = document.querySelector("#comment-sort-btn");
// commentSortBtn.addEventListener('click',toggleCommentSortPopUp);

function toggleCommentSortPop(e){
  const sortingPopupMenu = document.querySelector(".popupMenu-For-C-Sorting");
  sortingPopupMenu.classList.toggle("Popup_container-active");
  e.stopImmediatePropagation();
}
document.addEventListener('click',()=>{

  //on clicking to document closing sort button
  const sortingPopupMenu = document.querySelector(".popupMenu-For-C-Sorting");
  sortingPopupMenu.classList.remove("Popup_container-active");

  //on clicking to document removing higlighter inputLine
inupuLineAnimation();
   
});
function inupuLineAnimation(){
  const animLine= document.querySelector(".active-input-anim-line");
  if(animLine != null){
  animLine.style.width="0px";
  animLine.classList.remove("active-input-anim-line");

  }
}

function open_level0_replayContainer(e){
inupuLineAnimation();
const replay_interface= e.target.parentElement.nextElementSibling;

//opening replayinterface
replay_interface.classList.add("open-replay-container");

//focusing caret on contentEditable div
replay_interface.lastElementChild.firstElementChild.firstElementChild.focus();

const animationLine= e.target.parentElement.nextElementSibling.lastElementChild.firstElementChild.lastElementChild;

setTimeout(()=>{animationLine.style.width='0px'; },10)

setTimeout(()=>{animationLine.style.width='100%';},300)

animationLine.classList.add("active-input-anim-line");

e.stopImmediatePropagation();
}
function close_level0_replayContainer(t){
  t.parentElement.parentElement.parentElement.classList.remove("open-replay-container");
  t.parentElement.previousElementSibling.firstElementChild.innerText='';
}

function focusWithin(t,e){
  inupuLineAnimation();
  t.lastElementChild.style.width='100%';
  t.lastElementChild.classList.add("active-input-anim-line");
  e.stopImmediatePropagation();
}
function countLength(t){
  const replayBtn=t.parentElement.nextElementSibling.lastElementChild; 
  const len=t.innerText.trim().length;
  if((len > 0) ){ 
      replayBtn.style.backgroundColor="#3ea6ff";
      replayBtn.style.color="black";
      replayBtn.style.cursor="pointer";
    }
  else{
    replayBtn.style.backgroundColor="";
    replayBtn.style.color="#aaa";
    replayBtn.style.cursor="";
    
   }
}

function submitReplay(t,ev){
const replyInputContainer= t.parentElement.previousElementSibling.firstElementChild;
const inpuText =replyInputContainer.innerText.trim();
const len = inpuText.length;
  
if(len > 0 ){ 
   const replayBtn = t.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild;
   replayBtn.disabled=true;
   close_level0_replayContainer(t.previousElementSibling)
   const loader= t.parentElement.parentElement.parentElement.nextElementSibling;
   
    var loaderId= setInterval(
      loader.classList.add("showLoader")
      ,1);
 
  /*no need to use this code when using ajax*/
setTimeout(setTodefault,1000)
function setTodefault(){
  clearInterval(loaderId);
  loader.classList.remove("showLoader")
  replayBtn.disabled=false;
  showUserReplay(t,inpuText);
}
replyInputContainer.innerText='';
  /******************************** */

    //disable replay buttton till this 1 comment succesfully submitted
    //hide replay container till comment is not submitted
    //show loader 
    /*ajax call mar de
     if(success){
    //enable replay buttoon
    //unhide replay container
    //removeloader
    //showUserReplay(t)
    //clearInterval(loaderId)
    }
    else{
    
       //to prevent from infinte loading in case of error
      // clearInterval(loaderId)
      */
  }
  else{
    alert("not readay to submt the comment");
  }

}
function showUserReplay(t,inpuText){
  
 let loginUser= document.createElement("div");
 loginUser.classList.add("login-user");
 let img=document.createElement("img");
 img.src="img/defaultUser.jpg";
 loginUser.appendChild(img);

 let rightCcontainer= document.createElement("div");
 rightCcontainer.classList.add("right-container");

   let userDetails =document.createElement("div");
   userDetails.classList.add("user-details");

      let userName =document.createElement("div");
      userName.classList.add("user-name");
      let userNameTxt=document.createTextNode("bishwajeet pandey");//will be pased as a arugment from htmlInlne even for this event handler function
      userName.appendChild(userNameTxt);
      userDetails.appendChild(userName);//user-details-first-child

      let commentDate =document.createElement("div");
      commentDate.classList.add("comment-date");//will be pased as a arugment from htmlInlne even for this event handler function
      let cdate=document.createTextNode("2 Hours ago");
      commentDate.appendChild(cdate);
      userDetails.appendChild(commentDate);//user-details second child

      let reportBtnWraper=document.createElement("div");
      reportBtnWraper.classList.add("reportBtnWraper");
      let materialIcons=document.createElement("span");
      materialIcons.classList.add("material-icons");
      let vertIcon=document.createTextNode("more_vert");
      
      materialIcons.appendChild(vertIcon);
      reportBtnWraper.appendChild(materialIcons);
      userDetails.appendChild(reportBtnWraper);//user-details sthird child

   let replTxt=document.createElement("div");
   replTxt.classList.add("repl-txt");
       
      let replayInput=document.createTextNode(inpuText);
      replTxt.appendChild(replayInput);
      
 rightCcontainer.appendChild(userDetails);
 rightCcontainer.appendChild(replTxt);

let rContainer=document.createElement("div");
rContainer.classList.add("r-container");
 rContainer.appendChild(loginUser);
 rContainer.appendChild(rightCcontainer);
  t.parentElement.parentElement.parentElement.parentElement.appendChild(rContainer);
}



