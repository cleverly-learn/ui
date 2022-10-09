import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import React, { FC } from 'react';

export const Link: FC<MuiLinkProps & RouterLinkProps> = ({
  children,
  ...props
}) => (
  <MuiLink component={RouterLink} {...props}>
    {children}
  </MuiLink>
);
