import { Box, Button } from '@mui/material';
import { DEFAULT_PAGE_SIZE } from 'constants/data-grid';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
} from '@mui/x-data-grid';
import { Lecturer } from 'api/lecturers/types/lecturer.interface';
import { Link } from 'components/_common/Link';
import { PaperPanel } from 'components/_common/PaperPanel';
import { Path } from 'enums/path.enum';
import { TipIcon } from 'components/_common/TipIcon';
import { User } from 'api/users/types/user.interface';
import { dataGrid, dataGridClasses } from 'components/_common/DataGrid/styles';
import { useDeleteLecturer } from 'components/Dashboard/components/Lecturers/feature/mutations/use-delete-lecturer';
import { useEditUser } from 'components/Dashboard/components/Lecturers/feature/mutations/use-edit-user';
import { useExportLecturers } from 'components/Dashboard/components/Lecturers/feature/mutations/use-export-lecturers';
import { useLecturersPage } from 'components/Dashboard/components/Lecturers/feature/queries/use-lecturers-page';
import { useSynchronizeLecturers } from 'components/Dashboard/components/Lecturers/feature/mutations/use-synchronize-lecturers';
import { useTotalRows } from 'hooks/data-grid/use-total-rows';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import React, { FC, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import SyncIcon from '@mui/icons-material/Sync';

export const Lecturers: FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const { data, isLoading: isLecturersLoading } = useLecturersPage({
    page,
    size: pageSize,
  });
  const { mutate: edit, isLoading: isEditLoading } = useEditUser({
    page,
    size: pageSize,
  });
  const { mutate: synchronize, isLoading: isSynchronizing } =
    useSynchronizeLecturers();
  const { mutate: exportLogins, isLoading: isFileDownloading } =
    useExportLecturers();
  const { mutate: deleteLecturer, isLoading: isDeleteLoading } =
    useDeleteLecturer();

  const totalRows = useTotalRows(data?.totalElements);

  const columns: GridColumns = [
    {
      field: 'lastName',
      headerName: 'Прізвище',
      flex: 1,
      editable: true,
      renderCell: ({ row }: GridRenderCellParams<number, Lecturer>) => (
        <Link color="secondary" to={`${Path.USER}/${row.userId}`}>
          {row.lastName}
        </Link>
      ),
    },
    {
      field: 'firstName',
      headerName: 'Імʼя',
      flex: 1,
      editable: true,
      renderCell: ({ row }: GridRenderCellParams<number, Lecturer>) => (
        <Link color="secondary" to={`${Path.USER}/${row.userId}`}>
          {row.firstName}
        </Link>
      ),
    },
    {
      field: 'patronymic',
      headerName: 'По батькові',
      flex: 1,
      editable: true,
      renderCell: ({ row }: GridRenderCellParams<number, Lecturer>) => (
        <Link color="secondary" to={`${Path.USER}/${row.userId}`}>
          {row.patronymic}
        </Link>
      ),
    },
    {
      field: 'isRegistered',
      headerName: 'Зареєстрований',
      type: 'boolean',
      width: 150,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Дії',
      width: 100,
      cellClassName: dataGridClasses.actions,
      getActions: (params: GridRowParams<User>) => {
        const { id } = params.row;

        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={() =>
                setRowModesModel({ [id]: { mode: GridRowModes.View } })
              }
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={() =>
                setRowModesModel({
                  [id]: { mode: GridRowModes.View, ignoreModifications: true },
                })
              }
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() =>
              setRowModesModel({ [id]: { mode: GridRowModes.Edit } })
            }
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteLecturer(id)}
          />,
        ];
      },
    },
  ];

  const processRowUpdate = ({
    password,
    ...newRow
  }: Lecturer & { password?: string }) => {
    const { userId, firstName, lastName, patronymic } = newRow;

    edit({
      id: userId,
      firstName,
      lastName,
      patronymic,
    });

    return newRow;
  };

  return (
    <PaperPanel sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" mb={1} justifyContent="end">
        <Box mr={2}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            endIcon={<FileDownloadIcon />}
            disabled={isFileDownloading}
            onClick={() => exportLogins()}
          >
            Експортувати паролі в Excel
          </Button>
          <TipIcon text="Будуть експортовані логіни та паролі викладачів, які ще не зареєструвалися в системі" />
        </Box>
        <Box>
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
          <TipIcon text="До списку будуть додані лише нові викладачі, якщо такі існують на schedule.kpi.ua" />
        </Box>
      </Box>
      <DataGrid
        paginationMode="server"
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
        sx={dataGrid}
        columns={columns}
        rows={data?.data ?? []}
        rowCount={totalRows}
        rowModesModel={rowModesModel}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        loading={isLecturersLoading || isEditLoading || isDeleteLoading}
        processRowUpdate={processRowUpdate}
        pagination
      />
    </PaperPanel>
  );
};
