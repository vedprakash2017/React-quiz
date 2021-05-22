import React ,{ useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { setHost, setPlayer } from '../actions/clientType';
import Fade from 'react-reveal/Fade';
export class DashboardPage extends React.Component {
        state = {
          left: 0,
          top: 0,
          play: false,
          audio : new Audio("https://edolve.s3.ap-south-1.amazonaws.com/1620296923Adventure Trailer.mp3")
      
        }
      
        componentDidMount() {
          // When the component is mounted, add your DOM listener.
        document.addEventListener("mousemove", this.handleCursor);
        this.state.audio.addEventListener('ended', () => this.setState({ play: true }));
        if(this.state.play == true)
        {
        this.state.audio.play();
        // this.state.play = false;
        this.state.audio.loop = true;  
        this.state.audio.volume = 0.3;
        // this.togglePlay();
        }
    }
        componentDidUpdate(){
            if(this.state.play == true)
        {this.state.audio.play();
        this.state.audio.loop = true;  
        this.state.audio.volume = 0.3;
        }
    }
        componentWillUnmount() {
          // Make sure to remove the DOM listener when the component is unmounted.
          document.removeEventListener("mousemove", this.handleCursor);

        this.state.audio.removeEventListener('ended', () => this.setState({ play: false }));
        this.state.audio.pause();
        this.state.play = false;

        }
            togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
          this.state.play ? this.state.audio.play() : this.state.audio.pause();
          this.state.audio.loop = true;
        this.state.audio.volume = 0.3;
        });
      }

        handleCursor = (e) => {
          const card = document.getElementsByClassName('card')[0];     
        //   cursor.setAttribute('style','top:'+e.pageY+'px; left:'+ e.pageX+'px;');
            if(this.state.play == false) { this.setState({ play: true });}

          var ax = -($(window).innerWidth()/2- e.pageX)/20;
          var ay = ($(window).innerHeight()/2- e.pageY)/10;
          card.setAttribute("style", "height:500px;width:475px;transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg)");

        }

    startAsHost = () => {
        this.props.setHost();
        // this.props.history.push("/create_quiz");
        this.props.history.push("/create");
    };

    startAsPlayer = () => {
        this.props.setPlayer();
        this.props.history.push("/join");
    };


    render() {
        return (


<div style={{background:"white"}}>
    {/* {  this.state.play ? <i class="fa fa-volume-up fa-3x" onClick={this.togglePlay} aria-hidden="true"></i> : <i onClick={this.togglePlay} class="fa fa-volume-mute fa-3x" aria-hidden="true"></i>} */}
    {/* <button onClick={this.togglePlay} > ON </button> */}
    <div class="main" >
        <div class="imgi"> </div> 
        <div class="card" style={{height:"500px",width:"475px"}}> 
            <div class="card-content">
            <h1>OpenTrivia</h1>
            <hr></hr>
            <p>
            A party trivia game in your web browser.
            No downloading apps just create a game on the big screen and join up with your mobile device to play
            </p>
            </div>
        </div>

        <div class="m">
            <div class="container">
                <div class="chevron"></div>
                <div class="chevron"></div>
                <div class="chevron"></div>
            </div>
        </div>
    </div>
    <div class="btn-main">
        <div class="btn">
            <button class="btn-hover color-9" onClick={this.startAsHost}>Create Game</button>
        </div>

        <div class="btn">
            <button class="btn-hover color-9" onClick={this.startAsPlayer}>Join Game </button>
        </div>
    </div>
</div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setHost: () => dispatch(setHost()),
        setPlayer: () => dispatch(setPlayer())
    }
}

export default connect(undefined, mapDispatchToProps)(DashboardPage);