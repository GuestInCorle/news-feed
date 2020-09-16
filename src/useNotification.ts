import {useCallback, useEffect, useState} from 'react';
import {addNotificationResponseReceivedListener} from 'expo-notifications';
import useLinkTo from './useLinkTo';
import prepareUrl from './prepareUrl';

export default () => {
  const [isReady, setReady] = useState(false);
  const [lastUrl, setLastUrl] = useState('');
  const goTo = useLinkTo();
  useEffect(() => {
    const subscription = addNotificationResponseReceivedListener((response) => {
      const url = response.notification.request.content.data.url;
      if (typeof url === 'string' && url.startsWith('news-feed://')) {
        setLastUrl(prepareUrl(url));
      }
    });
    return () => subscription.remove();
  }, []);
  useEffect(() => {
    if (isReady && lastUrl) {
      goTo(lastUrl);
    }
  }, [goTo, isReady, lastUrl]);
  return useCallback(() => setReady(true), []);
};
