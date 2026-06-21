import { tTasks } from "../quizData";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from './quizSlice';
import SortableList from './SortableList';

interface ComponentProps {
  index: number;
  tasks: tTasks;
  retry: number;
}

function Sorting({ index, tasks, retry }: ComponentProps) {

  const sortRand = () => Math.round(Math.random()) * 2 - 1;
  const randItems = () => [...tasks].sort(sortRand).sort(sortRand).map(el => el.question);

  const [items, setItems] = useState(randItems());
  const dispatch = useDispatch();

  useEffect(() => {
    const newItems = randItems();
    setItems(newItems);
    dispatch(addList({ index, items: newItems }));
  }, [retry]);

  return <SortableList index={index} answers={items} />;
}

export default Sorting;
