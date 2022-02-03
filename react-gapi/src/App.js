import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { loadGoogleScript } from './GoogleAuth/GoogleLoginApi';
import Dashboard from './dashboard';

const googleClientId =""

function App() {
  
  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken]=useState();
  
  
  const onSuccess = (googleUser) => {
    setIsLoggedIn(true);
    const tokenId=googleUser.getAuthResponse().id_token;
    setToken(tokenId)
    console.log(token)

    var sendToken = new XMLHttpRequest();
    sendToken.open('POST', 'https://yourbackend.example.com/tokensignin');
    sendToken.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    sendToken.onload = function() {
    console.log('Signed in as: ' + sendToken.responseText);
        };
    sendToken.send('idtoken=' + token);
    
  };
  
  const onFailure = () => {
    setIsLoggedIn(false);
  }
  
  const logOut = () => {
    (async() => {
      await googleAuth.signOut();
      setIsLoggedIn(false);
      renderSigninButton(gapi);
    })();
  };
  
  const renderSigninButton = (_gapi) => {
    _gapi.signin2.render('google-signin', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure 
    });
  }
  
  
  useEffect(() => {
    
    
    window.onGoogleScriptLoad = () => {
     
      const _gapi = window.gapi;
      setGapi(_gapi);
      
      _gapi.load('auth2', () => {
        (async () => { 
          const _googleAuth = await _gapi.auth2.init({
           client_id: googleClientId
          });
          setGoogleAuth(_googleAuth);
          renderSigninButton(_gapi);
        })();
      });
    }
    
    //ensure everything is set before loading the script
    loadGoogleScript();
    
  }, []);
  
  
  return(<div>
    {!isLoggedIn &&
    <div className="container">
      <div id="google-signin"></div>
      </div>
    }
    
    {isLoggedIn &&
      <div className='logoutBtn'>
      
        <button className='btn-primary'  onClick={logOut}>Log Out</button>
        <Dashboard/>
      </div>
     
    }
 </div>)
}

export default App;
