import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';
import { tGroup } from "../../../list/table";

type GroupProps = {
 data: tGroup;
};

function GroupGrid({ data }: GroupProps) {
  const rows: GridRowsProp = data;
  const columns: GridColDef[] = Object.keys(data[0])
  .filter(key => key !== "id")
  .map(key => ({
    field: key,
    flex: 1,
  }));
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

export default GroupGrid;