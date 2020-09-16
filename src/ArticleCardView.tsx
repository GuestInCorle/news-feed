import React from 'react';
import {forwardRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewProps,
  ImageBackground,
  Platform,
  ImageSourcePropType,
} from 'react-native';

export interface ArticleCardViewProps extends ViewProps {
  image: ImageSourcePropType;
  title: string;
}

export default forwardRef<View, ArticleCardViewProps>(
  ({image, title, style, ...rest}, ref) => (
    <View ref={ref} {...rest} style={[styles.wrapper, style]}>
      <View style={[styles.root, Platform.OS === 'web' && styles.rootWeb]}>
        <ImageBackground
          style={[StyleSheet.absoluteFill, styles.image]}
          source={image}
          resizeMode="cover">
          <Text style={styles.text}>{title}</Text>
        </ImageBackground>
      </View>
    </View>
  ),
);

const innerInset = 20;
const outerInset = 10;

const styles = StyleSheet.create({
  wrapper: {
    margin: outerInset,
  },
  root: {
    aspectRatio: 16 / 9,
    borderRadius: innerInset,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5},
  },
  rootWeb: {
    width: `calc(100vw - ${outerInset * 2})`,
    height: '56.25vw',
  },
  image: {
    padding: innerInset,
    justifyContent: 'flex-end',
  },
  text: {
    textAlign: 'right',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: {width: 3, height: 3},
  },
});
