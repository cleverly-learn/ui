import { Chip, ChipProps } from '@mui/material';
import { Link } from 'react-router-dom';
import { Path } from 'enums/path.enum';
import React, {
  FC,
  MouseEvent,
  MouseEventHandler,
  SyntheticEvent,
} from 'react';

interface Props extends Pick<ChipProps, 'sx' | 'onDelete'> {
  group: {
    id: number;
    name: string;
  };
  newTab?: boolean;
  onMouseDown?: MouseEventHandler<HTMLAnchorElement>;
}

export const GroupChip: FC<Props> = ({
  group: { id, name },
  newTab,
  onMouseDown,
  onDelete,
  ...chipProps
}) => {
  return (
    <Chip
      component={Link}
      color="secondary"
      to={`${Path.GROUP}/${id}`}
      target={newTab ? '_blank' : undefined}
      label={name}
      clickable
      onDelete={
        onDelete
          ? (e: SyntheticEvent) => {
              e.preventDefault();
              onDelete(e);
            }
          : undefined
      }
      onMouseDown={(e: MouseEvent<HTMLAnchorElement>) => onMouseDown?.(e)}
      {...chipProps}
    />
  );
};
