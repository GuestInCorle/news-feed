import React, {FC} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import ArticleCardView from './ArticleCardView';
import database from './database';

const App: FC = () => (
  <>
    <StatusBar style="auto" translucent={false} />
    <FlatList
      data={database.articles}
      renderItem={({item: {image, title}}) => (
        <ArticleCardView image={image} title={title} />
      )}
      keyExtractor={(item) => String(item.id)}
      style={styles.root}
      contentContainerStyle={styles.container}
    />
  </>
);

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
  },
});
