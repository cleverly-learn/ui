import { Chip, ChipProps, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import React, { FC } from 'react';

interface Props extends Pick<ChipProps, 'sx'> {
  href: string;
}

export const ClassroomChip: FC<Props> = ({ href, ...chipProps }) => {
  return (
    <Chip
      component={Link}
      color="secondary"
      icon={<GoogleIcon />}
      href={href}
      target="_blank"
      label="Classroom"
      clickable
      {...chipProps}
    />
  );
};
