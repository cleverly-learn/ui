import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { DEFAULT_PAGE_SIZE } from 'constants/data-grid';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
} from '@mui/x-data-grid';
import { PaperPanel } from 'components/_common/PaperPanel';
import { User } from 'api/users/types/user.interface';
import { dataGrid, dataGridClasses } from 'components/_common/DataGrid/styles';
import { useEditLecturer } from 'components/Dashboard/components/Lecturers/feature/mutations/use-edit-lecturer';
import { useExportLecturers } from 'components/Dashboard/components/Lecturers/feature/mutations/use-export-lecturers';
import { useLecturersPage } from 'components/Dashboard/components/Lecturers/feature/queries/use-lecturers-page';
import { useSynchronizeLecturers } from 'components/Dashboard/components/Lecturers/feature/mutations/use-synchronize-lecturers';
import { useTotalRows } from 'hooks/data-grid/use-total-rows';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InfoIcon from '@mui/icons-material/Info';
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
  const { mutate: edit, isLoading: isEditLoading } = useEditLecturer({
    page,
    size: pageSize,
  });
  const { mutate: synchronize, isLoading: isSynchronizing } =
    useSynchronizeLecturers();
  const { mutate: exportLogins, isLoading: isFileDownloading } =
    useExportLecturers();

  const totalRows = useTotalRows(data?.totalElements);

  const columns: GridColumns = [
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
    { field: 'login', headerName: 'Логін', width: 150 },
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
        ];
      },
    },
  ];

  const processRowUpdate = ({
    password,
    ...newRow
  }: User & { password?: string }) => {
    const { id, firstName, lastName, patronymic } = newRow;

    edit({
      id,
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
          <Tooltip title="Будуть експортовані логіни та паролі викладачів, які ще не зареєструвалися в системі">
            <IconButton size="small" disableRipple>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
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
          <Tooltip title="До списку будуть додані лише нові викладачі, якщо такі існують на schedule.kpi.ua">
            <IconButton size="small" disableRipple>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
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
        loading={isLecturersLoading || isEditLoading}
        processRowUpdate={processRowUpdate}
        pagination
      />
    </PaperPanel>
  );
};
