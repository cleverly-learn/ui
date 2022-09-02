import { styled } from '@mui/material';
import ReactGoogleLogin from 'react-google-login';

export const GoogleLogin = styled(ReactGoogleLogin)({
  borderRadius: '10px !important',

  '&, & div': {
    height: 36,
    borderRadius: '10px !important',
  },
});
