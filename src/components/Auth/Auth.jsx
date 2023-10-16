import { useState } from 'react';
import './Auth.css'

import SignUp from './SignUp';
import SignIn from './SignIn';
import Footer from '../utils/Footer';

function Auth() {
    const [signUp, setSignUp] = useState(false);

    return (
        <>
        <div className="auth-body">
            <div style={{height: '4rem', position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#131A22'}}>
                <a href="./" style={{position: 'fixed', top: 0, left: 0, textDecoration: 'none', margin: '1rem 2rem' }} className="nav-brand" >Catering Poll</a>
            </div>
            <div className='user-sign'>
                <p style={{textAlign: 'center', margin: '.5rem', fontWeight: 'bold', fontSize: 'xx-large'}}>Catering Poll</p>
                <div className='sign-alt'>
                    <button
                        style={signUp? {} : {backgroundColor: '#131A22'}}
                        onClick={()=>{
                            setSignUp(false);
                        }}
                    >SignIn</button>
                    <button
                        style={signUp? {backgroundColor: '#131A22'} : {}}
                        onClick={()=>{
                            setSignUp(true);
                        }}
                    >SignUp</button>
                </div>
                {
                    signUp ? <SignUp /> : <SignIn />
                }
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Auth;