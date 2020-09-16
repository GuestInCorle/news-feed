import React, {forwardRef, PropsWithChildren, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArticleScreenNavigationProp} from './ArticleScreen';

export default forwardRef<View, PropsWithChildren<ViewProps>>(
  ({style, children, ...rest}, ref) => {
    const navigation = useNavigation<ArticleScreenNavigationProp>();
    const onPress = useCallback(
      () => navigation.canGoBack() && navigation.goBack(),
      [navigation],
    );
    return (
      <View ref={ref} {...rest} style={[styles.root, style]}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}>
          <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modal}>{children}</View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    );
  },
);

export const modalPadding = '5vw';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scroll: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  overlay: {
    flexGrow: 1,
    paddingHorizontal: modalPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    overflow: 'hidden',
    borderRadius: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
});
