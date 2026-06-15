import { cars } from "../table";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function BuildingsGrid() {
  const rows: GridRowsProp = cars;
  const columns: GridColDef[] = [
    { field: 'Производитель', flex: 0.5},
    { field: 'Название', headerName: 'Название', flex: 1},
    { field: 'Тип', flex: 0.5},
    { field: 'Страна', flex: 0.5},
    { field: 'Год' },
    { field: 'Максимальная скорость'},
  ]
  return (
   <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
     <DataGrid
       localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
       rows={rows}
       columns={columns}
       showToolbar={true}
    />
   </Container>
 )
}

export default BuildingsGrid;