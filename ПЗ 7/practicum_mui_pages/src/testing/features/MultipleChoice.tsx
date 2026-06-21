import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
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

function MultipleChoice({ index, tasks, retry }: ComponentProps) {

  const sortRand = () => Math.round(Math.random()) * 2 - 1;
  const randOptions = () => [...tasks].sort(sortRand).sort(sortRand).map(el => el.question);

  const [options, setOptions] = useState(randOptions());
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.lists.lists[index]) || [];

  useEffect(() => {
    setOptions(randOptions());
    dispatch(addList({ index, items: [] }));
  }, [retry]);

  const handleToggle = (option: string) => {
    const next = selected.includes(option)
      ? selected.filter(o => o !== option)
      : [...selected, option];
    dispatch(setDraggedItems({ index, items: next }));
  };

  return (
    <FormControl>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selected.includes(option)}
                onChange={() => handleToggle(option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default MultipleChoice;
