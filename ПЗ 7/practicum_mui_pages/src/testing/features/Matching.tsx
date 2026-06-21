import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { tTasks } from "../quizData"
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from './quizSlice';
import SortableList from './SortableList'

interface ComponentProps {
    index: number,
    tasks: tTasks,
    retry: number,
  }

function Matching({index, tasks, retry}: ComponentProps) {
  
  const sortRand = () => Math.round(Math.random()) * 2 - 1;
  const randAnswers = () => [...tasks].sort(sortRand).sort(sortRand).map((el) => el.answer);

  const [answers, setAnswers] = useState(randAnswers());
  const setRandAnswers = () => {
    setAnswers(randAnswers());
  }
  const dispatch = useDispatch();

  // Добавляем список ответов очередного задания в хранилище
  useEffect(() => {
    const newAnswers = randAnswers();

    setAnswers(newAnswers);
    dispatch(addList({ index, items: newAnswers }));
  }, [retry]);

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <List>
          {tasks.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton 
              sx={{
                border: '1px solid gray',
                borderRadius: '5px',
                textAlign: 'right',
            }}>
              <ListItemText primary={item.question} />
           </ListItemButton>
          </ListItem> 
          ))}
        </List>
      </Grid>

      <Grid size={6}>
       <SortableList index={ index } answers={ answers }/>
      </Grid>
    </Grid> 
  );
}

export default Matching