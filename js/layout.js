
/*vanilla javascript code to scroll div on dextops by draging with mouse*/
/********************************************************************************/
const slider = document.querySelector('.chipsContainer');             
let mouseDown = false;
let startX, scrollLeft;

let startDragging = function (e) {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};
let stopDragging = function (event) {
  mouseDown = false;
};
if(slider!=null){
slider.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if(!mouseDown) { return; }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
});

// Add the event listeners
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);
}
// /********************************************************************************/
          /*
                  psudo code for side navigation bar

         if(current_window_width > 1330px){
             task1 ---> show full fledged side navigation bar
             task2 ---> if user click on nav bar button than collapse the full fledged side nav bar and show
                        show another nav bar that have only icons
         }
         else if( current_window_width <= 1330px && current_window_width > 808px ){
             task1 ---> show another nav bar that have only icons
             task2 ---> if user click on nav bar button than collapse the full fledged side nav bar and show
                        show another nav bar that have only icons
                        and prevent scroll and click by overlying
         }
         else if(current_width < 808px){
             //for small sized device
             task1 ---> dont show any open side navBar
             task2 ---> if user click on nav bar button than open the full fledged side nav bar 
                        and prevent scroll and click by overlying
         }

        */
        let clicked = false;
        let bar_clicked =false;
        let  popup_for_video_clicked=false;
        let lastScrollTop=0;
        $(document).ready(function(){


            /*on clicking slide-prev move slider in right*/
            $(".slide-prev").click(function(){        

                if(slider.scrollLeft==0){
                    let slider_end_at = $("#innerBtnWraper").width() - $(".chipsContainer").width();
                    // alert("we are at starting point");
                   //go back to end
                    slider.scrollLeft = slider_end_at;
                    return;
                }
                slider.scrollLeft = slider.scrollLeft - 100;
            });
              /*on clicking slide-next move slider in left*/
              $(".slide-next").click(function(){     
                let slider_end_at = $("#innerBtnWraper").width() - $(".chipsContainer").width();
                if(slider_end_at == slider.scrollLeft){
                   // alert("we are at end");
                   //go back to start
                    slider.scrollLeft=0;
                    return;
                }
              
                slider.scrollLeft = slider.scrollLeft + 100;
            });
            
            $("#RightContainer").scroll(function(e){
                var st = $(this).scrollTop();
                
                if(st > lastScrollTop){
                
                    $("#intrestBox").css("margin-top","-300px");
                    $("#intrestBox").css("position","fixed");
                   
                   
                }
                else{
                
                    $("#intrestBox").css("margin-top","0px");
                    $("#intrestBox").css("position","fixed");  
                    if(st==0)
                    {
                      
                        $("#intrestBox").css("position","");  
                    }
                 
              
                }
                lastScrollTop=st;

                /*code for closing video popup menu on scroll*/
                close_popup();
               
            });
        $(document).click(function(e){
          if(e.target.id === 'overlaySheet' ){
           closeFullSideNav();dec_width_of_SideNav();closeOverlay();
          }
        });
        
        $(window).resize(function(){
            reSizingHandler();openOverlay();
            // reSizingHandler2();
         
         });

        
         $("#barOnFullSideNav").click(function(){
           closeFullSideNav(); dec_width_of_SideNav();closeOverlay();
        
         });

         $("#barOnSmallSideNav").click(function(){
           bar_clicked=true;openFullSideNav();inc_width_of_SideNav();openOverlay();
        
         
        //    decSliderWidth();
         });

         /*function definations*/
         function closeFullSideNav(){
            $(".fullSidenav").css("margin-left","-240px");
         }
         function dec_width_of_SideNav(){
             $("#Sidenav").removeClass("sideNav");
             $("#Sidenav").addClass("sideNavToogle");
             $("#RightContainer").removeClass("rightContainer");
             $("#RightContainer").addClass("rightContainerToogle");
         }
         function openFullSideNav(){
            $(".fullSidenav").css("margin-left","0px");
         }
         function inc_width_of_SideNav(){
             $("#Sidenav").removeClass("sideNavToogle");
             $("#Sidenav").addClass("sideNav");
             $("#RightContainer").removeClass("rightContainerToogle");
             $("#RightContainer").addClass("rightContainer");
         }

         function reSizingHandler(){
              
            

            let current_Width = $(window).width();
            if(current_Width < 1330 && current_Width > 808){
                closeFullSideNav();
                dec_width_of_SideNav();
                $("#Sidenav").css("display","");
                $("#RightContainer").removeClass("rightContainerForSm");
              
            }
            else if(current_Width >= 1330){
                openFullSideNav();
                inc_width_of_SideNav();
                $("#Sidenav").css("display","");
                $("#RightContainer").removeClass("rightContainerForSm");
            }
            else if(current_Width < 808){
                //disable side nav and open full width side bar and overlay
                $("#Sidenav").css("display","none");
                $("#RightContainer").addClass("rightContainerForSm");
                closeFullSideNav();
            }
            
          
         }
         reSizingHandler();

        function openOverlay(){

            const video = document.querySelector(".video-controls-container");
           
            let width = $(window).width();
            if(width < 1330  && bar_clicked){
                $("#overlaySheet").addClass("overlay"); 
            }
            else{
                $("#overlaySheet").removeClass("overlay");
            }
            if(video!=null  && bar_clicked){
                $("#overlaySheet").addClass("overlay"); 
            }
            bar_clicked=false;
        }
        function closeOverlay(){
            $("#overlaySheet").removeClass("overlay");
            // incSliderWidth();
        }

        /*code for opening popup menu of video*/
        $(".dots_for_popup").click(function(e){
            openpopup(this,e);
        });
        function  openpopup(curr_dot,event){

            popup_for_video_clicked=true;
            $('.popupMenuForVideos').addClass("Popup_active");
   

            let current_video_identifier = $(curr_dot).data("video-identifier");

            let dot_offset = $(curr_dot).offset();
            let dot_offset_left = dot_offset.left;
            let dot_offset_top = dot_offset.top;

            let current_window_width = $(window).width();
            let current_window_height = $(window).height();

            let remaning_space_height = current_window_height - dot_offset_top;
            let remaning_space_width = current_window_width - dot_offset_left;

            let popup_menu_width = $(".popupMenuForVideos").innerWidth();
            let popup_menu_height = $(".popupMenuForVideos").innerHeight();

           
            /*checking whether avaible height to place menu is greater than or equal to height of menu*/

            if(remaning_space_height >= popup_menu_height){
                $('.popupMenuForVideos').css("transform-origin","top left");
                $('.popupMenuForVideos').css("top",dot_offset_top);
               
            }
            else{
                    let upper_remaining_height=dot_offset_top;
                if(upper_remaining_height < popup_menu_height){
                   
         
                    $('.popupMenuForVideos').css("transform-origin","top left");
                    $('.popupMenuForVideos').css("top",(dot_offset_top - popup_menu_height) + (remaning_space_height-10));
                }
                else{                  
                    $('.popupMenuForVideos').css("transform-origin","bottom left");
                    $('.popupMenuForVideos').css("top",dot_offset_top - popup_menu_height);
                }
     
              
            }


            /*checking whether avaible width to place menu is greater than or equal to width of menu*/
            if(remaning_space_width >= popup_menu_width){
                $('.popupMenuForVideos').css("left",dot_offset_left);
            }
            else{

                if(remaning_space_height >= popup_menu_height){
                    $('.popupMenuForVideos').css("transform-origin","top right");
                }
                else{
                   
                    if(dot_offset_top < popup_menu_height)
                    $('.popupMenuForVideos').css("transform-origin","top right");
                    else
                    $('.popupMenuForVideos').css("transform-origin","bottom right");
                    
                }
            
                $('.popupMenuForVideos').css("left",dot_offset_left - (popup_menu_width-20));
            }
           
        }

        /*code for closing popup menu of video*/
        $(window).click(function(){
           close_popup();
        });
        $(window).scroll(function(){
            
            close_popup(); 
        })
        function close_popup(){
            if(popup_for_video_clicked)
              popup_for_video_clicked=false;
          else
              $('.popupMenuForVideos').removeClass("Popup_active");
        }

/*code for opening search box on small devices and adjusting header*/
         $("#ser_btn").click(function(){
           clicked=true;
           adjustHeader();
         });

         $("#ser_back_btn").click(function(){
            move_sec2_bring_sec1();
         });


         function adjustHeader(){
            let current_width = $(window).width();
            if(current_width < 768 && clicked ){  
                move_sec1_bring_sec2()
                ;
            } 
            else{
                move_sec2_bring_sec1();
            }
         }
         function move_sec1_bring_sec2(){
            $("#sec1").css("margin-left","-100%");
            clicked=false;
         }
         function move_sec2_bring_sec1(){
            $("#sec1").css("margin-left","0%");
         }
    

        });