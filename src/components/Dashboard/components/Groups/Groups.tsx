import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { DEFAULT_PAGE_SIZE } from 'components/Dashboard/components/Groups/constants';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { PaperPanel } from 'components/_common/PaperPanel';
import { useGroupsPage } from 'components/Dashboard/components/Groups/feature/queries/use-groups-page';
import { useSynchronizeGroups } from 'components/Dashboard/components/Groups/feature/mutations/use-synchronize-groups';
import InfoIcon from '@mui/icons-material/Info';
import React, { FC, useEffect, useState } from 'react';
import SyncIcon from '@mui/icons-material/Sync';

const columns: GridColumns = [
  { field: 'name', headerName: 'Код групи', width: 150 },
  { field: 'faculty', headerName: 'Факультет', width: 150 },
];

export const Groups: FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { data, isLoading: isGroupsLoading } = useGroupsPage({
    page,
    size: pageSize,
  });
  const { mutate: synchronize, isLoading: isSynchronizing } =
    useSynchronizeGroups();

  const [totalRows, setTotalRows] = useState(data?.totalElements ?? 0);

  useEffect(() => {
    setTotalRows((prevState) => data?.totalElements ?? prevState);
  }, [data?.totalElements]);

  return (
    <PaperPanel sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" mb={1}>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          endIcon={<SyncIcon />}
          disabled={isSynchronizing}
          onClick={() => synchronize()}
        >
          Синхронізувати
        </Button>
        <Tooltip title="До списку будуть додані нові групи, якщо такі існують на schedule.kpi.ua">
          <IconButton size="small" disableRipple>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <DataGrid
        density="compact"
        paginationMode="server"
        columns={columns}
        rows={data?.data ?? []}
        rowCount={totalRows}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        loading={isGroupsLoading}
        pagination
      />
    </PaperPanel>
  );
};
