/// <reference lib="DOM"/>
/* eslint-env browser */

export default (_url: string): string => {
  const url = new URL(_url);
  return url.pathname + url.search + url.hash;
};
