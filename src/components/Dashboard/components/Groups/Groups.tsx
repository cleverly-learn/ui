import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { DEFAULT_PAGE_SIZE } from 'constants/data-grid';
import { DataGrid, GridColumns, GridValueGetterParams } from '@mui/x-data-grid';
import { Faculty } from 'api/faculties/types/faculty.interface';
import { PaperPanel } from 'components/_common/PaperPanel';
import { useGroupsPage } from 'components/Dashboard/components/Groups/feature/queries/use-groups-page';
import { useSynchronizeGroups } from 'components/Dashboard/components/Groups/feature/mutations/use-synchronize-groups';
import { useTotalRows } from 'hooks/data-grid/use-total-rows';
import InfoIcon from '@mui/icons-material/Info';
import React, { FC, useState } from 'react';
import SyncIcon from '@mui/icons-material/Sync';

const columns: GridColumns = [
  { field: 'name', headerName: 'Код групи', width: 150 },
  {
    field: 'faculty',
    headerName: 'Факультет',
    width: 150,
    valueGetter: (params: GridValueGetterParams<Faculty>) => params.value?.name,
  },
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

  const totalRows = useTotalRows(data?.totalElements);

  return (
    <PaperPanel sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" mb={1} justifyContent="end">
        <Button
          variant="contained"
          size="small"
          color="secondary"
          endIcon={<SyncIcon />}
          disabled={isSynchronizing}
          onClick={() => synchronize()}
        >
          Синхронізувати зі schedule.kpi.ua
        </Button>
        <Tooltip title="До списку будуть додані лише нові групи, якщо такі існують на schedule.kpi.ua">
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
