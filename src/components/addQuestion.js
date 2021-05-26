import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../app';
import { setRoom } from '../actions/game';
import { Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import QuestionNum from './QuestionNum';
import axios from 'axios';
export class addQuestion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            room: this.props.roomno,
            questionCount: this.props.amount,
            error: "",
            background: "",
            amount:this.props.amount,
			changeNum1:1
        }
		this.handleSubmit = this.handleSubmit.bind(this);
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



	handleSubmit(event) {
		console.log("hmelo")
		// // Prevent default behavior
		event.preventDefault();
	
		const data = new FormData(event.target);
		for (let index = 1; index <= this.state.questionCount; index++) {


			const x = {};
			x.type = data.get('type-'+index);

			x.question = data.get('question-'+index);
					if(x.type == 'multiple' )
					{
						
						x.correct_answer = data.get('correct-'+index);
						const inc = [data.get('incorrect#1-'+index) , data.get('incorrect#2-'+index) , data.get('incorrect#3-'+index) ];
			
						if(x.question != "" && inc[0]!= "" && inc[1]!= "" && inc[2]!= "" && x.correct_answer!= "")
						{
						x.incorrect_answers = inc;
						// alert('Question added!');					
						}
						else
						{
							alert('Please fill all fields in question #'+index);
							return;
						}
					}
					else if(x.type == 'bool')
					{


						x.correct_answer =  data.get('bool-'+index);
						// console.log(x);
						if(x.question != undefined && x.correct_answer != undefined)
						{
							
						x.incorrect_answers = [!data.get('bool-'+index)];
							// alert('Question added!');	
						}
						else
						{
							alert('Please fill all fields in question #'+index);
							return;
						}
					}
			x.difficulty= 'easy';
			x.category = 'other';
			x.room = this.state.room;
			console.log(x);
			
			axios({
				method: "post",
				url: "http://localhost:3005/api/v1/quiz/add",
				data: JSON.stringify(x),
				headers: { "Content-Type": "application/json" },
			  })
				.then(function (response) {
				  //handle success
				//   console.log(response);
				})
				.catch(function (response) {
				  //handle error
				//   console.log(response);
				});
		}


        // const config = {
        //     room: this.state.room,
        //     category: 'other',
        //     difficulty: 'easy',
        //     questionCount: this.state.questionCount
        // };
        // //console.log("submitting")
        // socket.emit("createRoom", config, (res) => {
        //     //console.log("res!", res);
        //     if (res.code === "success") {
        //         this.setState({ error: "" })
        //         this.props.setRoom(this.state.room);
        //         this.props.history.push("/lobby");
        //     } else {
        //         this.setState({ error: res.msg })
        //     }
        // });




		// // Access FormData fields with `data.get(fieldName)`
		// // For example, converting to upper case
		// // data.set('username', data.get('username').toUpperCase());
		// console.log(data);
		// // Do your Axios stuff here
	  }



    render() {
        return (
            <div className="content-container" style={{height:"90vh"}}>



{
                    this.props.type === "" && this.state.changeNum1 == 1 && <Redirect to="/" />
                }
<div id="wrapper">
   
                
   	  <h1>Enter { this.props.amount } Questions </h1>
      <form onSubmit={this.handleSubmit}>  
   	  <div id="slider-wrap">
 
      	  <ul id="slider">

			<div style={{left:"0px",width:"100%"}}>    
            <QuestionNum props = {this.props.amount} />
      </div>
        
         </ul>
          <div class="btns" id="next"><i class="fa fa-arrow-right"></i></div>
          <div class="btns" id="previous"><i class="fa fa-arrow-left"></i></div>
          <div id="counter"></div>
          
          <div id="pagination-wrap">
            <ul>
            </ul>
          </div>
                 
      </div>

	  <div >
				<button type="submit" onclick="return false"> submit </button>
			</div>
	  </form>
   </div>


            </div>
        )
    }
}

export default addQuestion;

// export default connect(mapStateToProps, mapDispatchToProps)(CreateGamePage);