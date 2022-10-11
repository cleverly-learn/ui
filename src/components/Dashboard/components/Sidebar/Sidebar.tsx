import * as styles from 'components/Dashboard/components/Sidebar/styles';
import { Link } from 'react-router-dom';
import { Paper, Tab, Tabs } from '@mui/material';
import { useTabs } from 'components/Dashboard/components/Sidebar/hooks/use-tabs';
import { useTabsValue } from 'components/Dashboard/components/Sidebar/hooks/use-tabs-value';
import React, { FC } from 'react';

export const Sidebar: FC = () => {
  const tabs = useTabs();
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
        {tabs.map(({ to, href, label, icon }) => (
          <Tab
            key={label}
            sx={styles.tab}
            value={to}
            to={to ?? ''}
            href={href}
            target={href ? '_blank' : undefined}
            label={label}
            component={to ? Link : 'a'}
            icon={icon}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Paper>
  );
};
