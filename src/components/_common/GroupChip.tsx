import { Chip, ChipProps } from '@mui/material';
import { Link } from 'components/_common/Link';
import { Path } from 'enums/path.enum';
import React, { FC } from 'react';

interface Props extends Omit<ChipProps, 'label' | 'color'> {
  group: {
    id: number;
    name: string;
  };
  newTab?: boolean;
}

export const GroupChip: FC<Props> = ({
  group: { id, name },
  newTab,
  ...chipProps
}) => {
  return (
    <Chip
      color="secondary"
      label={
        <Link
          color="secondary.contrastText"
          underline="hover"
          to={`${Path.GROUP}/${id}`}
          target={newTab ? '_blank' : undefined}
        >
          {name}
        </Link>
      }
      {...chipProps}
    />
  );
};
