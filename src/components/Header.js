import React from 'react';
import { socket } from '../app';
import { connect } from 'react-redux';
import { resetPlayers} from '../actions/players';
import { resetRoom, setQuestion, setMessage, resetGame } from '../actions/game';
import { resetType } from '../actions/clientType';


export class Header extends React.Component {
    
    state = {
        play: false,
        audio : new Audio("https://edolve.s3.ap-south-1.amazonaws.com/1620131058home.wav")
      }
      // audio = new Audio("https://edolve.s3.ap-south-1.amazonaws.com/1620131058home.wav")
    
      componentDidMount() {
        this.state.audio.addEventListener('ended', () => this.setState({ play: true }));
        this.state.audio.play();
        this.state.audio.loop = true;  
        this.state.audio.volume = 0.1;
      }
    
      componentWillUnmount() {
        this.state.audio.removeEventListener('ended', () => this.setState({ play: false }));
        this.state.audio.pause();
    }
    
      togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
          this.state.play ? this.state.audio.play() : this.state.audio.pause();
          this.state.audio.loop = true;
        this.state.audio.volume = 0.1;
        });
      }


    handleClick = () => {
        socket.disconnect();
        socket.connect();
        this.props.resetPlayers();
        this.props.resetType();
        this.props.resetGame();
        this.props.history.push("/");
    }
    
    render() {
        return (
            <header className={"header"} style={{background: "rgba(0, 0, 0, 0.05)"}}>
                <div className={"content-container"}>
                    <div className={"header__content"}>
                        <button className={"header__title button--link button"} onClick={this.handleClick}><h1>OpenTrivia</h1></button>
                        <button className="button--link button ">About</button>
                        <button onClick={this.togglePlay} style={{display:"none"}}>{this.state.play ? 'Pause' : 'Play'}</button>
                    </div>
                </div>
            </header>
        )
    }
};


const mapDispatchToProps = (dispatch) => ({
    resetPlayers: () => dispatch(resetPlayers()),
    resetType: () => dispatch(resetType()),
    resetGame: () => dispatch(resetGame())
});

export default connect(undefined, mapDispatchToProps)(Header);