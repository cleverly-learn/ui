import { Box } from '@mui/material';
import { Create } from 'components/Dashboard/components/Admins/components/Create/Create';
import { DEFAULT_PAGE_SIZE } from 'constants/data-grid';
import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  GridColumns,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
} from '@mui/x-data-grid';
import { PaperPanel } from 'components/_common/PaperPanel';
import { User } from 'api/users/types/user.interface';
import { dataGrid, dataGridClasses } from 'components/_common/DataGrid/styles';
import { useAdminsPage } from 'components/Dashboard/components/Admins/feature/queries/use-admins-page';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import { useDeleteAdmin } from 'components/Dashboard/components/Admins/feature/mutations/use-delete-admin';
import { useEditAdmin } from 'components/Dashboard/components/Admins/feature/mutations/use-edit-admin';
import { useTotalRows } from 'hooks/data-grid/use-total-rows';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import React, { FC, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';

export const Admins: FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const { data: user } = useCurrentUser();
  const { data, isLoading: isAdminsLoading } = useAdminsPage({
    size: pageSize,
    page,
  });
  const { mutate: deleteAdmin, isLoading: isDeleteLoading } = useDeleteAdmin();
  const { mutate: edit, isLoading: isEditLoading } = useEditAdmin({
    page,
    size: pageSize,
  });

  const totalRows = useTotalRows(data?.totalElements);

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'login', headerName: 'Логін', width: 150 },
    {
      field: 'password',
      headerName: 'Пароль',
      flex: 0.7,
      editable: true,
      renderCell: () => <div>••••••••••</div>,
    },
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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Дії',
      width: 100,
      cellClassName: dataGridClasses.actions,
      getActions: (params: GridRowParams<User>) => {
        const { id } = params.row;

        if (id === user?.id) {
          return [];
        }

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
            onClick={() => deleteAdmin(id)}
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
      password: password?.trim() || undefined,
    });

    return newRow;
  };

  return (
    <PaperPanel sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box mb={2}>
        <Create />
      </Box>
      <DataGrid
        paginationMode="server"
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
        columns={columns}
        rows={data?.data ?? []}
        rowCount={totalRows}
        rowModesModel={rowModesModel}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        loading={isAdminsLoading || isDeleteLoading || isEditLoading}
        isCellEditable={(params: GridCellParams<unknown, User>) =>
          params.row.id !== user?.id
        }
        isRowSelectable={(params) => params.row.id !== user?.id}
        processRowUpdate={processRowUpdate}
        sx={dataGrid}
        getRowClassName={(params) =>
          params.row.id === user?.id ? dataGridClasses.rowSelected : ''
        }
        pagination
      />
    </PaperPanel>
  );
};
