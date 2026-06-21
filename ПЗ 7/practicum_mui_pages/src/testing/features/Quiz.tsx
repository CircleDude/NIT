import { Box, Button, Container, Typography } from '@mui/material';
import { quiz } from "../quizData";
import Matching from "./Matching";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function Quiz() {
  
  const userAnswers = useSelector((state: RootState) => state.lists.lists);
  const [result, setResult] = useState([0]);

  const [showResult, setResultState] = useState(false);

  const [retry, setRetry] = useState(0);

  const handleCheck = () => {
    setResultState(true);
    
    const results = quiz.map((quizItem, taskIndex) => {
      const correctAnswers = quizItem.tasks.map(task => task.answer);
      const currentAnswers = userAnswers[taskIndex];

      let correctCount = 0;

      correctAnswers.forEach((answer, index) => {
        if (answer === currentAnswers[index]) {
          correctCount++;
        }
      });

      return correctCount;
    });

    setResult(results);
  }

  const handleRetry = () => {
    setResultState(false);
    setRetry(prev => prev + 1);
  }
   
  return (
    <Container maxWidth="md" sx={{mb: '28px'}}>
      {quiz.map((item, index) => (
        <Box key={item.id} component="section" sx={{ m: 2, p:2 }}>
          <Typography variant="h5" gutterBottom>
                {index + 1}. { item.title }
          </Typography>
          <Matching index={index} tasks={ item.tasks } retry={ retry }/>
        </Box>
        ))}
      <Box sx={{ display: 'flex', justifyContent:'space-around' }}>
        <Button variant="contained" onClick={ handleCheck }>Проверить</Button>
        <Button variant="contained" onClick={ handleRetry }>Начать снова</Button>
      </Box>
      {showResult && (<>
        <Box sx={{ m:4 }}>
          <Typography variant="h5" align='center'>
            Результаты тестирования
          </Typography>
          {result.map((count, index) => (
            <Typography key={index} align='center'>
              Задание {index + 1}. Верных ответов: {count}.
            </Typography>
          ))}
        </Box>
      </>)}
    </Container>
  );
}

export default Quiz