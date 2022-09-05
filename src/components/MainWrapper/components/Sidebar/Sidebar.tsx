import * as styles from 'components/MainWrapper/components/Sidebar/styles';
import { Link, useLocation } from 'react-router-dom';
import { Paper, Tab, Tabs } from '@mui/material';
import { tabs } from 'components/MainWrapper/components/Sidebar/constants';
import React, { FC } from 'react';

export const Sidebar: FC = () => {
  const { pathname } = useLocation();

  return (
    <Paper sx={{ p: 2, height: 1 }}>
      <Tabs
        orientation="vertical"
        value={pathname}
        TabIndicatorProps={{
          sx: styles.indicator,
        }}
      >
        {tabs.map(({ to, label, icon }) => (
          <Tab
            key={to}
            sx={styles.tab}
            value={to}
            to={to}
            label={label}
            component={Link}
            icon={icon}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Paper>
  );
};
