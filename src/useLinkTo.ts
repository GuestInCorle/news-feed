import * as React from 'react';
import {getActionFromState, getStateFromPath} from '@react-navigation/core';
import navigationRef from './navigationRef';
import {default as options} from './linking';

export default function useLinkTo() {
  const navigation = navigationRef.current;

  return React.useCallback(
    (path: string) => {
      if (!path.startsWith('/')) {
        throw new Error(`The path must start with '/' (${path}).`);
      }

      if (navigation === undefined || navigation === null) {
        console.warn('Too fast!');
        return;
      }

      const state = options?.getStateFromPath
        ? options.getStateFromPath(path, options.config)
        : getStateFromPath(path, options?.config);

      if (state) {
        let root = navigation;
        let current: typeof root;

        // Traverse up to get the root navigation
        while ((current = root.dangerouslyGetParent())) {
          root = current;
        }

        const action = getActionFromState(state);

        if (action !== undefined) {
          root.dispatch(action);
        } else {
          root.reset(state);
        }
      } else {
        throw new Error('Failed to parse the path to a navigation state.');
      }
    },
    [navigation],
  );
}
