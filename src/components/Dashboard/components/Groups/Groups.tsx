import { Box, Button } from '@mui/material';
import { DEFAULT_PAGE_SIZE } from 'constants/data-grid';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { Faculty } from 'api/faculties/types/faculty.interface';
import { GroupPreview } from 'api/groups/types/group-preview.interface';
import { Link } from 'components/_common/Link';
import { PaperPanel } from 'components/_common/PaperPanel';
import { Path } from 'enums/path.enum';
import { TipIcon } from 'components/_common/TipIcon';
import { useGroupsPage } from 'components/Dashboard/components/Groups/feature/queries/use-groups-page';
import { useSynchronizeGroups } from 'components/Dashboard/components/Groups/feature/mutations/use-synchronize-groups';
import { useTotalRows } from 'hooks/data-grid/use-total-rows';
import React, { FC, useState } from 'react';
import SyncIcon from '@mui/icons-material/Sync';

const columns: GridColumns = [
  {
    field: 'name',
    headerName: 'Код групи',
    width: 150,
    renderCell: ({ row }: GridRenderCellParams<number, GroupPreview>) => (
      <Link color="secondary" to={`${Path.GROUP}/${row.id}`}>
        {row.name}
      </Link>
    ),
  },
  {
    field: 'faculty',
    headerName: 'Факультет',
    width: 150,
    valueGetter: (params: GridValueGetterParams<Faculty>) => params.value?.name,
  },
  {
    field: 'studentsCount',
    headerName: 'К-ть студентів',
    width: 150,
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
        <TipIcon text="До списку будуть додані лише нові групи, якщо такі існують на schedule.kpi.ua" />
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
