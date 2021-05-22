import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../app';
import { setRoom } from '../actions/game';
import { Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import QuestionNum from './QuestionNum';

export class addQuestion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            room: "",
            questionCount: "5",
            error: "",
            background: "",
            amount:this.props.amount
        }
    }

    componentDidMount(){
        console.log(this.props);
        //current position
var pos = 0;
//number of slides
var totalSlides = $('#slider-wrap ul li').length;
//get the slide width
var sliderWidth = $('#slider-wrap').width();


$(document).ready(function(){
	
	
	/*****************
	 BUILD THE SLIDER
	*****************/
	//set width to be 'x' times the number of slides
	$('#slider-wrap ul#slider').width(sliderWidth*totalSlides);
	
    //next slide 	
	$('#next').click(function(){
		slideRight();
	});
	
	//previous slide
	$('#previous').click(function(){
		slideLeft();
	});
	
	
	
	/*************************
	 //*> OPTIONAL SETTINGS
	************************/
	//automatic slider
	// var autoSlider = setInterval(slideRight, 3000);
	
	//for each slide 
	$.each($('#slider-wrap ul li'), function() { 
	   //set its color
	   var c = $(this).attr("data-color");
	   $(this).css("background",c);
	   
	   //create a pagination
	   var li = document.createElement('li');
	   $('#pagination-wrap ul').append(li);	   
	});
	
	//counter
	countSlides();
	
	//pagination
	pagination();
	
	//hide/show controls/btns when hover
	//pause automatic slide when hover
	$('#slider-wrap').hover(
	//   function(){ $(this).addClass('active'); clearInterval(autoSlider); }, 
	//   function(){ $(this).removeClass('active'); autoSlider = setInterval(slideRight, 3000); }
	  function(){ $(this).addClass('active');}, 
	  function(){ $(this).removeClass('active'); }
	);
	
	

});//DOCUMENT READY
	


/***********
 SLIDE LEFT
************/
function slideLeft(){
	pos--;
	if(pos==-1){ pos = totalSlides-1; }
	$('#slider-wrap ul#slider').css('left', -(sliderWidth*pos)); 	
	
	//*> optional
	countSlides();
	pagination();
}


/************
 SLIDE RIGHT
*************/
function slideRight(){
	pos++;
	if(pos==totalSlides){ pos = 0; }
	$('#slider-wrap ul#slider').css('left', -(sliderWidth*pos)); 
	
	//*> optional 
	countSlides();
	pagination();
}



	
/************************
 //*> OPTIONAL SETTINGS
************************/
function countSlides(){
	$('#counter').html(pos+1 + ' / ' + totalSlides);
}

function pagination(){
	$('#pagination-wrap ul li').removeClass('active');
	$('#pagination-wrap ul li:eq('+pos+')').addClass('active');
}
    }
    render() {
        return (
            <div className="content-container" style={{height:"90vh"}}>



{
                    this.props.type === "" && <Redirect to="/" />
                }
<div id="wrapper">
   
                
   	  <h1>Enter { this.props.amount } Questions </h1>
        
   	  <div id="slider-wrap">
      	  <ul id="slider">

            <QuestionNum amount = {this.props.amount} />
                 
        
         </ul>
          
          <div class="btns" id="next"><i class="fa fa-arrow-right"></i></div>
          <div class="btns" id="previous"><i class="fa fa-arrow-left"></i></div>
          <div id="counter"></div>
          
          <div id="pagination-wrap">
            <ul>
            </ul>
          </div>
                 
      </div>
  
   </div>


            </div>
        )
    }
}

export default addQuestion;

// export default connect(mapStateToProps, mapDispatchToProps)(CreateGamePage);