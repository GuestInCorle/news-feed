import React, {FC, useLayoutEffect} from 'react';
import {ImageBackground, Platform, StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './App';
import {RouteProp} from '@react-navigation/native';
import database, {Article} from './database';
import ArticleContainerView from './ArticleContainerView';
import ArticleContainerViewWeb, {modalPadding} from './ArticleContainerViewWeb';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

export type ArticleScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Article'
>;

const ArticleScreen: FC<{
  route: ArticleScreenRouteProp;
  navigation: ArticleScreenNavigationProp;
}> = ({route, navigation}) => {
  const id = route.params.id;
  const article: Article | undefined = database.articles[id];
  const modalVariant = Platform.OS === 'web' && navigation.canGoBack();
  useLayoutEffect(() => {
    if (article) {
      navigation.setOptions({
        title: article.title,
        headerShown: !modalVariant,
      });
    }
  }, [article, modalVariant, navigation]);
  const ArticleContainer = modalVariant
    ? ArticleContainerViewWeb
    : ArticleContainerView;
  return article ? (
    <ArticleContainer>
      <ImageBackground
        style={[
          styles.image,
          Platform.OS === 'web' &&
            (modalVariant ? styles.imageWebInsets : styles.imageWeb),
        ]}
        resizeMode="cover"
        source={article.image}
      />
      {modalVariant && <Text style={styles.title}>{article.title}</Text>}
      <Text style={styles.description}>{article.description}</Text>
    </ArticleContainer>
  ) : (
    <ArticleContainer>
      <View style={styles.center}>
        <Text style={styles.notFound}>Статья не найдена</Text>
      </View>
    </ArticleContainer>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  imageWebInsets: {
    width: `calc(100vw - ${modalPadding} * 2)`,
    height: `calc((100vw - ${modalPadding} * 2) / 4 * 3)`,
  },
  imageWeb: {
    width: 'calc(100vw)',
    height: 'calc(100vw / 4 * 3)',
  },
  title: {
    marginHorizontal: 4,
    marginVertical: 4,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    marginHorizontal: 4,
    fontSize: 16,
    color: 'black',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    fontSize: 16,
    color: 'black',
  },
});
