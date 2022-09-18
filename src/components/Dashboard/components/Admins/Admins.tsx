import { DEFAULT_PAGE_SIZE } from 'components/Dashboard/components/Admins/constants';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PaperPanel } from 'components/_common/PaperPanel';
import { useAdminsPage } from 'components/Dashboard/components/Admins/feature/queries/use-admins';
import React, { FC, useEffect, useState } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'login', headerName: 'Логін', width: 150 },
  { field: 'password', headerName: 'Пароль', flex: 1, editable: true },
  {
    field: 'lastName',
    headerName: 'Прізвище',
    flex: 1,
    editable: true,
  },
  {
    field: 'firstName',
    headerName: 'Імʼя',
    flex: 1,
    editable: true,
  },
  {
    field: 'patronymic',
    headerName: 'По батькові',
    flex: 1,
    editable: true,
  },
];

export const Admins: FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { data, isLoading } = useAdminsPage({ size: pageSize, page });

  const [totalRows, setTotalRows] = useState(data?.totalElements);

  useEffect(() => {
    setTotalRows((prevState) => data?.totalElements ?? prevState);
  }, [data?.totalElements]);

  return (
    <PaperPanel>
      <DataGrid
        paginationMode="server"
        columns={columns}
        rows={data?.data ?? []}
        rowCount={totalRows}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        loading={isLoading}
        pagination
      />
    </PaperPanel>
  );
};
