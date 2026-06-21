import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { tTasks } from "../quizData";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addList, setDraggedItems } from './quizSlice';
import { RootState } from '../../store';

interface ComponentProps {
  index: number;
  tasks: tTasks;
  retry: number;
}

function SingleChoice({ index, tasks, retry }: ComponentProps) {

  const sortRand = () => Math.round(Math.random()) * 2 - 1;
  const randOptions = () => [...tasks].sort(sortRand).sort(sortRand).map(el => el.question);

  const [options, setOptions] = useState(randOptions());
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.lists.lists[index]?.[0] ?? '');

  useEffect(() => {
    setOptions(randOptions());
    dispatch(addList({ index, items: [] }));
  }, [retry]);

  const handleChange = (value: string) => {
    dispatch(setDraggedItems({ index, items: [value] }));
  };

  return (
    <FormControl>
      <RadioGroup value={selected} onChange={(e) => handleChange(e.target.value)}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default SingleChoice;
