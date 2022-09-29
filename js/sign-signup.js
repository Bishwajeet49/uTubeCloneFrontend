window.addEventListener('load',setVerticallyCenter);
window.addEventListener('resize',setVerticallyCenter);
function setVerticallyCenter(){
    
    const wraper=document.querySelector(".wraper");
    const elementHeight=wraper.offsetHeight;
    const windowHeight=window.innerHeight;
    
    const HeightDiff=((windowHeight-elementHeight)/2)+"px";
   
    if( (windowHeight ) > elementHeight){
        wraper.style.marginTop=HeightDiff;
        wraper.style.marginBottom=HeightDiff;
    }
    else if ( ((windowHeight-elementHeight)/2 ) < 40 )  {
        wraper.style.marginTop='40px';
        wraper.style.marginBottom='40px';
    }

    //on loading page open input field Animation so that autocomplete bug hide
    opneEmailInputAnimation();
    emailInputField.focus();
}

let isErrorEncounterd=false;
const emailContainer=document.querySelector(".email-container");
const errMsgContainer=document.querySelector(".err-msg-container");
const errMsg=document.getElementById('error-msg');
const emailInputField = document.getElementById("emailInputField");
const anim = document.querySelector(".anim");

emailInputField.addEventListener('focus',opneEmailInputAnimation);
function opneEmailInputAnimation(){
        anim.classList.add("anim-on-click");
        anim.classList.remove("anim-color-grey"); 
        if(isErrorEncounterd){
            strong_border_red_upperTxt_red();
        }    
}
emailInputField.addEventListener('blur',()=>{
    const emailInputValueLen=emailInputField.value.length;
    if(emailInputValueLen==0){
    anim.classList.remove("anim-on-click");
      if(isErrorEncounterd){
          thin_border_red_midTxt_grey();
       }  
    }
    else{
    anim.classList.add("anim-color-grey");
      if(isErrorEncounterd){
         thin_border_red_upperTxt_red();
      }
    }
});

const submitEmailBtn = document.getElementById("submitEmail");
submitEmailBtn.addEventListener('click',emailVerification);
function emailVerification(){
    const emailId= emailInputField.value;
    const emailIdLen=emailId.length;
    if(emailIdLen==0){
        showErrorTxtWithAnimation("Enter an email");
    }
    else if(!ValidateEmail(emailId)){
        showErrorTxtWithAnimation("could't find your myTube Account");
    }
    
   
}
function showErrorTxtWithAnimation(errorMsgTxt){
    isErrorEncounterd=true;
    emailContainer.classList.add("invalid-email");
    opneEmailInputAnimation();
    emailInputField.focus();
    errMsgContainer.classList.add("error-occured");
    errMsg.innerText=errorMsgTxt;
    strong_border_red_upperTxt_red();
}

function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.match(mailformat))
return true;
else
return false;
}

function strong_border_red_upperTxt_red(){
    emailInputField.style.border="2px solid #EA4335";
    anim.style.color="#EA4335"; 
}
function thin_border_red_midTxt_grey(){
    emailInputField.style.border="1px solid #EA4335";//red
    anim.style.color="#5f6368"; //grey
}
function thin_border_red_upperTxt_red(){
    emailInputField.style.border="1px solid #EA4335";
    anim.style.color="#EA4335"; 
}


