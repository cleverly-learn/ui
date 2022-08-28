import { GoogleLogin } from 'components/_common/google-button.styled';
import React, { FC } from 'react';

interface Props {
  text?: string;
}

export const GoogleButton: FC<Props> = ({ text }) => {
  return (
    <GoogleLogin
      clientId=""
      buttonText={text}
      cookiePolicy="single_host_origin"
    />
  );
};
