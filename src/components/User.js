import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
         super(props);
         this.state = {
             username: '',
             user: '',
             emails: ''
         }
        
    }
    this = this.signIn.bind(this);
    this = this.signOut.bind(this);

    signIn(e) {
        e.preventDefault();
        const self = this
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        console.log('sign in initiated');
        this.props.firebase.auth().signInWithPopup( provider ).then(function(result){
            console.log('signing in');
            const user = result.user;
            self.props.setUser(user);
        });
    }

    signOut(e) {
        e.preventDefault();
        this.props.firebase.auth().signOut();
    }
    
    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        })
    }
    render() {

        //console.log(this.props.user)

        return (
            <div className="userPanel">
                <span className="userName">{this.props.user ? this.props.user.displayName : 'guest'}</span>
                <form onSubmit={this.signIn.bind(this)} className="loginForm">
                    <input 
                        type="submit" 
                        value="Login"
                        className="submit"
                    >
                    </input>
                </form>

                <form onSubmit={this.signOut.bind(this)} className="logOut">

                    <input
                        type="submit"
                        value="logout"
                        className="submit"
                    >
                    </input>
                </form>
            </div>
        );
    }
}

export default User;