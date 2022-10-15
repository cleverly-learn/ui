import { Grid, Grow, Skeleton } from '@mui/material';
import React, { FC } from 'react';

export const ListSkeleton: FC = () => (
  <Grid container spacing={2.5}>
    {Array.from(Array(6)).map((index: number) => (
      <Grow key={index} timeout={50 * index} in>
        <Grid item md={4}>
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: '10px', height: 112 }}
          />
        </Grid>
      </Grow>
    ))}
  </Grid>
);
