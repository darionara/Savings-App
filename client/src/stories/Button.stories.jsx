import React from 'react';

import { Button } from '../ui';
import { Grid, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Zadanie 1/Button',
  component: Button,
  description: 'ahaha',
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['contained', 'outlined'],
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['large', 'medium', 'small'],
    },
    color: {
      control: {
        type: 'radio',
      },
      options: ['primary', 'error', 'success', 'warning'],
    },
    disabled: {
      control: {
        default: false,
        type: 'boolean',
      },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = ({ label, ...args }) => <Button {...args}>{label}</Button>;
const All = () => (
  <>
    <Grid container>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'h2'}>Primary</Typography>
        <Typography variant={'subheading'}>Contained</Typography>
      </Grid>
      <Button variant={'contained'} color={'primary'}>
        Button
      </Button>
      <Button variant={'contained'} color={'primary'} startIcon={<AddIcon />}>
        Button
      </Button>
      <Button variant={'contained'} color={'primary'} endIcon={<ChevronRightIcon />}>
        Button
      </Button>
      <Button variant={'contained'} color={'primary'}>
        <ChevronRightIcon />
      </Button>
    </Grid>
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'subheading'}>Outlined</Typography>
      </Grid>
      <Button variant={'outlined'} color={'primary'}>
        Button
      </Button>
      <Button variant={'outlined'} color={'primary'} startIcon={<AddIcon />}>
        Button
      </Button>
      <Button variant={'outlined'} color={'primary'} endIcon={<ChevronRightIcon />}>
        Button
      </Button>
      <Button variant={'outlined'} color={'primary'}>
        <ChevronRightIcon />
      </Button>
    </Grid>
    <Grid container sx={{ mt: 5 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
      <Typography variant={'h2'}>Error</Typography>
        <Typography variant={'subheading'}>Contained</Typography>
      </Grid>
      <Button variant={'contained'} color={'error'}>
        Button
      </Button>
      <Button variant={'contained'} color={'error'} startIcon={<AddIcon />}>
        Button
      </Button>
      <Button variant={'contained'} color={'error'} endIcon={<ChevronRightIcon />}>
        Button
      </Button>
      <Button variant={'contained'} color={'error'}>
        <ChevronRightIcon />
      </Button>
    </Grid>
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'subheading'}>Outlined</Typography>
      </Grid>
      <Button variant={'outlined'} color={'error'}>
        Button
      </Button>
      <Button variant={'outlined'} color={'error'} startIcon={<AddIcon />}>
        Button
      </Button>
      <Button variant={'outlined'} color={'error'} endIcon={<ChevronRightIcon />}>
        Button
      </Button>
      <Button variant={'outlined'} color={'error'}>
        <ChevronRightIcon />
      </Button>
    </Grid>
    <Grid container sx={{ mt: 5 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
      <Typography variant={'h2'}>Success</Typography>
        <Typography variant={'subheading'}>Contained</Typography>
      </Grid>
      <Button variant={'contained'} color={'success'}>
        Button
      </Button>
      <Button variant={'contained'} color={'success'} startIcon={<AddIcon />}>
        Button
      </Button>
      <Button variant={'contained'} color={'success'} endIcon={<ChevronRightIcon />}>
        Button
      </Button>
      <Button variant={'contained'} color={'success'}>
        <ChevronRightIcon />
      </Button>
    </Grid>
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'subheading'}>Outlined</Typography>
      </Grid>
      <Button variant={'outlined'} color={'success'}>
        Button
      </Button>
      <Button variant={'outlined'} color={'success'} startIcon={<AddIcon />}>
        Button
      </Button>
      <Button variant={'outlined'} color={'success'} endIcon={<ChevronRightIcon />}>
        Button
      </Button>
      <Button variant={'outlined'} color={'success'}>
        <ChevronRightIcon />
      </Button>
    </Grid>
    <Grid container sx={{ mt: 5 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'h2'}>Warning</Typography>
        <Typography variant={'subheading'}>Contained</Typography>
      </Grid>
      <Button variant={'contained'} color={'warning'}>
        Button
      </Button>
      <Button variant={'contained'} color={'warning'} startIcon={<AddIcon />}>
        Button
      </Button>
      <Button variant={'contained'} color={'warning'} endIcon={<ChevronRightIcon />}>
        Button
      </Button>
      <Button variant={'contained'} color={'warning'}>
        <ChevronRightIcon />
      </Button>
    </Grid>
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'subheading'}>Outlined</Typography>
      </Grid>
      <Button variant={'outlined'} color={'warning'}>
        Button
      </Button>
      <Button variant={'outlined'} color={'warning'} startIcon={<AddIcon />}>
        Button
      </Button>
      <Button variant={'outlined'} color={'warning'} endIcon={<ChevronRightIcon />}>
        Button
      </Button>
      <Button variant={'outlined'} color={'warning'}>
        <ChevronRightIcon />
      </Button>
    </Grid>
    <Grid container sx={{ mt: 5 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'h2'}>Disabled</Typography>
        <Typography variant={'subheading'}>Contained</Typography>
      </Grid>
      <Button variant={'contained'} disabled>
        Button
      </Button>
      <Button variant={'contained'} disabled startIcon={<AddIcon />}>
        Button
      </Button>
      <Button variant={'contained'} disabled endIcon={<ChevronRightIcon />}>
        Button
      </Button>
      <Button variant={'contained'} disabled>
        <ChevronRightIcon />
      </Button>
    </Grid>
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'subheading'}>Outlined</Typography>
      </Grid>
      <Button variant={'outlined'} disabled>
        Button
      </Button>
      <Button variant={'outlined'} disabled startIcon={<AddIcon />}>
        Button
      </Button>
      <Button variant={'outlined'} disabled endIcon={<ChevronRightIcon />}>
        Button
      </Button>
      <Button variant={'outlined'} disabled>
        <ChevronRightIcon />
      </Button>
    </Grid>
  </>
);

export const Playground = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  label: 'Button',
};

export const AllStories = All.bind({});
