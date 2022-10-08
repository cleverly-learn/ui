import * as styles from 'components/Dashboard/components/Sidebar/styles';
import { Link } from 'react-router-dom';
import { Paper, Tab, Tabs } from '@mui/material';
import { tabs } from 'components/Dashboard/components/Sidebar/constants';
import { useTabsValue } from 'components/Dashboard/components/Sidebar/hooks/use-tabs-value';
import React, { FC } from 'react';

export const Sidebar: FC = () => {
  const value = useTabsValue(tabs);

  return (
    <Paper sx={{ p: 2, height: 1 }}>
      <Tabs
        orientation="vertical"
        value={value}
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
        <Tab value="*" />
      </Tabs>
    </Paper>
  );
};
