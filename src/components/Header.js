import React from 'react';
import { socket } from '../app';
import { connect } from 'react-redux';
import { resetPlayers} from '../actions/players';
import { resetRoom, setQuestion, setMessage, resetGame } from '../actions/game';
import { resetType } from '../actions/clientType';


export class Header extends React.Component {
    
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
            <header className={"header"} style={{height:"8vh",background: "rgba(0, 0, 0, 0.05)"}}>
                <div className={"content-container"}>
                    <div className={"header__content"}>
                        <button className={"header__title button--link button"} onClick={this.handleClick}><h1>OpenTrivia</h1></button>
                        <button className="button--link button ">About</button>
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