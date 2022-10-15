import { Grid, Skeleton } from '@mui/material';
import React, { FC } from 'react';

export const ListSkeleton: FC = () => (
  <Grid container spacing={2.5}>
    {Array.from(Array(6)).map((value, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Grid item key={index} md={4}>
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: '10px', height: 112 }}
        />
      </Grid>
    ))}
  </Grid>
);
