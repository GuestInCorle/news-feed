import React, {useCallback} from 'react';
import {forwardRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewProps,
  ImageBackground,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArticleListScreenNavigationProp} from './ArticleListScreen';
import {Article} from './database';

export interface ArticleCardViewProps extends ViewProps {
  article: Article;
}

export default forwardRef<View, ArticleCardViewProps>(
  ({article, style, ...rest}, ref) => {
    const navigation = useNavigation<ArticleListScreenNavigationProp>();
    const onPress = useCallback(() => {
      navigation.push('Article', {id: article.id});
    }, [article.id, navigation]);
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View ref={ref} {...rest} style={[styles.wrapper, style]}>
          <View style={[styles.root, Platform.OS === 'web' && styles.rootWeb]}>
            <ImageBackground
              style={[StyleSheet.absoluteFill, styles.image]}
              source={article.image}
              resizeMode="cover">
              <Text style={styles.text}>{article.title}</Text>
            </ImageBackground>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

const innerInset = 20;
const outerInset = Platform.OS === 'web' ? '5vw' : 10;

const styles = StyleSheet.create({
  wrapper: {
    margin: outerInset,
  },
  root: {
    aspectRatio: 4 / 3,
    borderRadius: innerInset,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5},
  },
  rootWeb: {
    width: `calc(100vw - ${outerInset} * 2)`,
    height: `calc((100vw - ${outerInset} * 2) / 4 * 3)`,
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
