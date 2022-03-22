/* eslint-disable no-empty */
let storage = window.localStorage;

const KEY_PREFIX = `shetland_dictionary`;

const fullKey = (key: string) => `${KEY_PREFIX}.${key}`;
export const getLiked = (key: string) => storage.getItem(fullKey(key));
export const setLiked = (key: string, wordUuid: string) => storage.setItem(fullKey(key), wordUuid);
export const remove = (key: string) => storage.removeItem(fullKey(key));


