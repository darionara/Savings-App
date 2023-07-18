// eslint-disable-next-line no-unused-vars
import React from 'react';
import { getBrowserLocales } from 'utils';

export const LocalizedDate = ({ date: rawDate }) => {
  const browserLocale = getBrowserLocales();
  return <span>{new Date(rawDate).toLocaleString(browserLocale[0])}</span>;
};
