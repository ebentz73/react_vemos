import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import LogoImg from '@assets/logo.png';

export default function Logo() {
  return (
    <Link href={`https://${process.env.WEB_APP_URL}/`}>
      <Box
        px={1}
        component="img"
        display="block"
        src={LogoImg}
        alt="Vemos"
        height={64}
      />
    </Link>
  );
}
