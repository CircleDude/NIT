import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Navbar from "../Navbar";
import Footer from "../Footer";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import GroupGrid from './components/GroupGrid';
import GroupChart from './components/GroupChart';
import SettingChart from './components/SettingChart';
// import { countries, years, types } from './groupdata';
import { getGroupedData, cars } from '../../list/table';
import * as React from 'react';

type tSelect = "Страна" | "Год" | "Тип";

function Chart() {
  const [group, setGroup] = React.useState<tSelect>("Страна");
  const [groupData, setGroupData] = React.useState(getGroupedData(cars, "Страна"));
  const [isBar, setIsBar] = React.useState(true);

  const [series, setSeries] = React.useState({
    'Максимальная скорость': true,
    'Средняя скорость': true,
    'Минимальная скорость': false,
  });

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as tSelect);
    if (event.target.value === "Страна") setGroupData(getGroupedData(cars, "Страна"));
    else if (event.target.value === "Год") setGroupData(getGroupedData(cars, "Год"));
    else if (event.target.value === "Тип") setGroupData(getGroupedData(cars, "Тип"));
  }

  return (
    <div>
      <Navbar active="3" />
      <Box sx={{ width:"200px", mx:"auto", my:2 }}>
        <FormControl fullWidth>
          <InputLabel> Группировать по </InputLabel>
          <Select
              id="select-group"
              value={ group }
              label="Группировать по"
              onChange={ handleChange }
          >
            <MenuItem value="Страна"> Стране </MenuItem>
            <MenuItem value="Год"> Году </MenuItem>
            <MenuItem value="Тип"> Типу </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <GroupChart data={ groupData } series={ series } isBar={ isBar } />
      <SettingChart series={ series } setSeries={ setSeries } isBar={ isBar } setIsBar={ setIsBar } />
      <GroupGrid data={ groupData } />
      <Footer />
    </div>
  );
}

export default Chart;