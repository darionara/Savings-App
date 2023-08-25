import React from 'react';

import { Loader } from '../ui/atoms/Loader';
import { Grid, Typography } from '@mui/material';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Zadanie 1/Loader',
  component: Loader,
  description: 'Przykład użycia komponentu loader',
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = () => <Loader />;

export const Playground = Template.bind({});
