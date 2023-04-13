import React, {useEffect, useState, useRef} from 'react';

// ** webview
import {WebView} from 'react-native-webview';

// ** FCM
import messaging from '@react-native-firebase/messaging';
import {NotificationListener} from './src/utils/pushnotification_helper';

function App() {
  const webviewRef = useRef(null);
  const [fcmtoken, setFcmtoken] = useState(null);

  useEffect(() => {
    NotificationListener();

    messaging()
      .getToken()
      .then(token => {
        setFcmtoken(token);
      });
  }, []);

  function senDataToWebView() {
    webviewRef.current.postMessage(`${fcmtoken}`);
  }

  return (
    <WebView
      // source={{uri: 'https://csm.tmpl.pk/'}}
      source={{uri: 'http://192.168.8.101:3000/'}}
      originWhitelist={['*']}
      ref={webviewRef}
      onMessage={event => {}}
    />
  );
}

export default App;
