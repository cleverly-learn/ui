import * as styles from 'components/Dashboard/components/Admins/styles';
import { DEFAULT_PAGE_SIZE } from 'components/Dashboard/components/Admins/constants';
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
import { useAdminsPage } from 'components/Dashboard/components/Admins/feature/queries/use-admins';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import { useDeleteUser } from 'hooks/mutations/use-delete-user';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import React, { FC, useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';

export const Admins: FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data, isLoading: isAdminsLoading } = useAdminsPage({
    size: pageSize,
    page,
  });
  const { mutate: deleteAdmin, isLoading: isDeleteLoading } = useDeleteUser();

  const [totalRows, setTotalRows] = useState(data?.totalElements ?? 0);

  const isLoading = isUserLoading || isAdminsLoading || isDeleteLoading;

  useEffect(() => {
    setTotalRows((prevState) => data?.totalElements ?? prevState);
  }, [data?.totalElements]);

  const handleEdit = (id: number) => () => {
    setRowModesModel({ [id]: { mode: GridRowModes.Edit } });
  };

  const handleDelete = (id: number) => () => {
    deleteAdmin(id);
    // setRows(rows.filter((row) => row.id !== id));
  };

  const handleSave = (id: number) => () => {
    setRowModesModel({ [id]: { mode: GridRowModes.View } });
  };

  const handleCancel = (id: number) => () => {
    setRowModesModel({
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    // TODO: For creating new
    // const editedRow = rows.find((row) => row.id === id);
    // if (editedRow.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };

  const processRowUpdate = (newRow: User) => {
    const updatedRow = { ...newRow, isNew: false };

    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns: GridColumns = [
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
      cellClassName: styles.ACTIONS_CLASS_NAME,
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
              onClick={handleSave(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancel(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEdit(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDelete(id)}
          />,
        ];
      },
    },
  ];

  return (
    <PaperPanel>
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
        loading={isLoading}
        isCellEditable={(params: GridCellParams<unknown, User>) =>
          params.row.id !== user?.id
        }
        isRowSelectable={(params) => params.row.id !== user?.id}
        onRowEditStart={(params, event) => {
          // TODO: Check on create
          // eslint-disable-next-line no-param-reassign
          event.defaultMuiPrevented = true;
        }}
        onRowEditStop={(params, event) => {
          // TODO: Check on create
          // eslint-disable-next-line no-param-reassign
          event.defaultMuiPrevented = true;
        }}
        processRowUpdate={processRowUpdate}
        sx={styles.dataGrid}
        getRowClassName={(params) =>
          params.row.id === user?.id ? styles.SELECTED_CLASS_NAME : ''
        }
        pagination
      />
    </PaperPanel>
  );
};
