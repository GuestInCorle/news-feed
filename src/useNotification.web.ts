/// <reference lib="DOM"/>
/* eslint-env browser */

import {useCallback, useEffect, useState} from 'react';
import useLinkTo from './useLinkTo';
import prepareUrl from './prepareUrl';

export default () => {
  const [isReady, setReady] = useState(false);
  const [lastUrl, setLastUrl] = useState('');
  const goTo = useLinkTo();
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      console.log('message', event.data);
      if (isEventData(event.data)) {
        setLastUrl(prepareUrl(event.data.data.url));
      }
    };
    navigator.serviceWorker.addEventListener('message', listener, false);
    return () =>
      navigator.serviceWorker.removeEventListener('message', listener, false);
  }, [goTo]);
  useEffect(() => {
    if (isReady && lastUrl) {
      // noinspection JSIgnoredPromiseFromCall
      goTo(lastUrl);
    }
  }, [goTo, isReady, lastUrl]);
  return useCallback(() => setReady(true), []);
};

interface EventData {
  data: {
    url: string;
  };
}

function isEventData(data: any): data is EventData {
  return (
    typeof data === 'object' &&
    data.hasOwnProperty('data') &&
    typeof data.data === 'object' &&
    data.data.hasOwnProperty('url') &&
    typeof data.data.url === 'string'
  );
}
