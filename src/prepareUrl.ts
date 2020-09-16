export default (url: string): string => {
  return '/' + url.replace(/^news-feed:\/\//, '');
};
