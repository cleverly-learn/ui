import { GoogleLogin } from 'components/_common/GoogleButton/styled';
import React, { FC } from 'react';

interface Props {
  text?: string;
  disabled?: boolean;
}

export const GoogleButton: FC<Props> = ({ text, disabled }) => {
  return (
    <GoogleLogin
      clientId=""
      cookiePolicy="single_host_origin"
      buttonText={text}
      disabled={disabled}
    />
  );
};
