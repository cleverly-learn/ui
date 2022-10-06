import { DEFAULT_PAGE_SIZE } from 'constants/data-grid';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridValueFormatterParams,
  GridValueGetterParams,
  GridValueSetterParams,
} from '@mui/x-data-grid';
import { Student } from 'api/students/types/student.interface';
import { dataGrid, dataGridClasses } from 'components/_common/DataGrid/styles';
import { useDeleteStudent } from 'components/Dashboard/components/Students/feature/mutations/use-delete-student';
import { useEditStudent } from 'components/Dashboard/components/Students/feature/mutations/use-edit-student';
import { useFaculties } from 'components/Dashboard/components/Students/feature/queries/use-faculties';
import { useGroups } from 'components/Dashboard/components/Students/feature/queries/use-groups';
import { useStudentsPage } from 'components/Dashboard/components/Students/feature/queries/use-students-page';
import { useTotalRows } from 'hooks/data-grid/use-total-rows';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import React, { FC, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';

export const List: FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [facultyId, setFacultyId] = useState<number>();

  const { data, isLoading: isStudentsLoading } = useStudentsPage({
    page,
    size: pageSize,
  });
  const { mutate: edit, isLoading: isEditLoading } = useEditStudent({
    page,
    size: pageSize,
  });
  const { mutate: deleteStudent, isLoading: isDeleteLoading } =
    useDeleteStudent();
  const { data: faculties } = useFaculties();
  const { data: groups } = useGroups({ facultyId });

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
    {
      field: 'groupId',
      headerName: 'Група',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: groups
        ? groups.map(({ id, name }) => ({ label: name, value: id }))
        : [],
      valueGetter: (params: GridValueGetterParams<undefined, Student>) =>
        params.row.group.id,
      valueFormatter: (params: GridValueFormatterParams) =>
        data?.data.find(({ id }) => id === params.id)?.group.name,
    },
    {
      field: 'facultyId',
      headerName: 'Факультет',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: faculties
        ? faculties.map(({ id, name }) => ({ label: name, value: id }))
        : [],
      valueGetter: (params: GridValueGetterParams<undefined, Student>) =>
        params.row.group.faculty.id,
      valueFormatter: (params: GridValueFormatterParams) =>
        data?.data.find(({ id }) => id === params.id)?.group.faculty.name,
      valueSetter: (params: GridValueSetterParams<Student, number>) => {
        setFacultyId(params.value);
        return { ...params.row, facultyId: params.value };
      },
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
      getActions: (params: GridRowParams<Student>) => {
        const { id, group } = params.row;

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
              onClick={() => {
                setFacultyId(undefined);
                setRowModesModel({
                  [id]: { mode: GridRowModes.View, ignoreModifications: true },
                });
              }}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              setFacultyId(group.faculty.id);
              setRowModesModel({ [id]: { mode: GridRowModes.Edit } });
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStudent(id)}
          />,
        ];
      },
    },
  ];

  const processRowUpdate = (newRow: Student) => {
    const { id, firstName, lastName, patronymic, groupId } =
      newRow as Student & { groupId: number };

    edit({
      id,
      firstName,
      lastName,
      patronymic,
      groupId,
    });

    return newRow;
  };

  return (
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
      loading={isStudentsLoading || isEditLoading || isDeleteLoading}
      processRowUpdate={processRowUpdate}
      pagination
    />
  );
};
