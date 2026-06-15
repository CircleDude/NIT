import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

export type tSeries= {
  'Максимальная высота': boolean,
  'Средняя высота': boolean,
  'Минимальная высота': boolean,
 }

type CheckboxProps = {
  series: tSeries;
  setSeries: React.Dispatch<
    React.SetStateAction<tSeries>
  >;
  isBar: boolean;
  setIsBar: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

function SettingChart({series, setSeries, isBar, setIsBar}: CheckboxProps) {

  const handleTypeChange = () => {
    setIsBar(!isBar);
  }

  const handleSeriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setSeries(prev => ({
        ...prev,
        [name as keyof tSeries]: checked,
    }));
  };

  return (
    <Stack
      direction="row"
      divider={ <Divider orientation="vertical" flexItem /> }
      spacing={2}
      sx={{ m: "20px 0", justifyContent:"center" }}
    >
        <FormControl>
            <FormLabel id="label-radio-group">
            Тип диаграммы:
            </FormLabel>
            <RadioGroup
            name="group-radio"
            value={(isBar) ? "bar": "dot"}
            onChange={ handleTypeChange }
            >
            <FormControlLabel value="bar"
                control={
                <Radio checked={isBar} />
                }
                label="Гистограмма"
            />
            <FormControlLabel value="dot"
                control={
                <Radio checked={!isBar}/>
                }
                label="Линейная"
            />
            </RadioGroup>
        </FormControl>

        <FormControl>
        <FormLabel id="label-checkbox-group">
            На диаграмме показать:
        </FormLabel>
        <FormControlLabel
            control={
            <Checkbox checked={series["Максимальная высота"]}
                name="Максимальная высота"
                onChange={ handleSeriesChange } />
            }
            label="максимальную высоту" 
        />
        <FormControlLabel
            control={
            <Checkbox checked={series["Средняя высота"]}
                name="Средняя высота"
                onChange={ handleSeriesChange } />
            }
            label="среднюю высоту" 
        />
        <FormControlLabel
            control={
            <Checkbox checked={series["Минимальная высота"]}
                name="Минимальная высота"
                onChange={ handleSeriesChange } />
            }
            label="минимальную высоту" 
        />
        </FormControl>
    </Stack>
  )
}

export default SettingChart;