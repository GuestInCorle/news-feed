import React, {FC} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import database from './database';
import ArticleCardView from './ArticleCardView';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './App';

export type ArticleListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ArticleList'
>;

const ArticleListScreen: FC<{
  navigation: ArticleListScreenNavigationProp;
}> = () => (
  <FlatList
    data={database.articles}
    renderItem={({item}) => <ArticleCardView article={item} />}
    keyExtractor={(item) => String(item.id)}
    style={styles.root}
    contentContainerStyle={styles.container}
  />
);

export default ArticleListScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
  },
});
