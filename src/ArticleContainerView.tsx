import React, {forwardRef, PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, View, ViewProps} from 'react-native';

export default forwardRef<View, PropsWithChildren<ViewProps>>(
  ({style, children, ...rest}, ref) => (
    <View ref={ref} {...rest} style={[styles.root, style]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}>
        {children}
      </ScrollView>
    </View>
  ),
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
});
