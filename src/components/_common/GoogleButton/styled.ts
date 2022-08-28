import { styled } from '@mui/material';
import ReactGoogleLogin from 'react-google-login';

export const GoogleLogin = styled(ReactGoogleLogin)({
  borderRadius: '4px !important',

  '&, & div': {
    height: 36,
  },
});
