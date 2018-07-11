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
            console.log('setting variable');
            self.props.setUser(user);
        });
    }

    signOut(e) {
        this.props.firebase.auth().signOut();
    }
    
    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        })
    }
    render() {
        return (
            <div>
                <span>{this.props.user ? this.props.user.displayName : 'guest'}</span>
                <form onSubmit={this.signIn.bind(this)}>
                    <input 
                        type="submit" 
                        value="Login"
                    >
                    </input>
                </form>

                <form onSubmit={this.signOut.bind(this)}>

                    <input
                        type="submit"
                        value="logout"
                    >
                    </input>
                </form>
            </div>
        );
    }
}

export default User;