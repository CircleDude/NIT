import { Box, Button, Container, Typography } from '@mui/material';
import { quiz, tQuizzes } from "../quizData";
import Matching from "./Matching";
import Sorting from "./Sorting";
import SingleChoice from "./SingleChoice";
import MultipleChoice from "./MultipleChoice";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Score = { correct: number; total: number };

function Quiz() {

  const userAnswers = useSelector((state: RootState) => state.lists.lists);
  const [results, setResults] = useState<Score[]>([]);
  const [showResult, setResultState] = useState(false);
  const [retry, setRetry] = useState(0);


  const checkOne = (item: tQuizzes[number], userAns: string[] = []): Score => {
    switch (item.type) {
      case "M": {
        const correctSeq = item.tasks.map(t => t.answer);
        let correct = 0;
        correctSeq.forEach((val, i) => { if (val === userAns[i]) correct++; });
        return { correct, total: correctSeq.length };
      }
      case "S": {
        const correctSeq = [...item.tasks]
          .sort((a, b) => Number(a.answer) - Number(b.answer))
          .map(t => t.question);
        let correct = 0;
        correctSeq.forEach((val, i) => { if (val === userAns[i]) correct++; });
        return { correct, total: correctSeq.length };
      }
      case "R": {
        const right = item.tasks.find(t => t.answer === "true")?.question;
        return { correct: userAns[0] === right ? 1 : 0, total: 1 };
      }
      case "C": {
        let correct = 0;
        item.tasks.forEach(t => {
          const shouldSelect = t.answer === "true";
          const isSelected = userAns.includes(t.question);
          if (shouldSelect === isSelected) correct++;
        });
        return { correct, total: item.tasks.length };
      }
    }
  };

  const handleCheck = () => {
    setResultState(true);
    setResults(quiz.map((item, i) => checkOne(item, userAnswers[i])));
  };

  const handleRetry = () => {
    setResultState(false);
    setRetry(prev => prev + 1);
  };

  const fullyCorrect = results.filter(r => r.correct === r.total).length;

  const renderTask = (item: tQuizzes[number], index: number) => {
    switch (item.type) {
      case "M": return <Matching index={index} tasks={item.tasks} retry={retry} />;
      case "S": return <Sorting index={index} tasks={item.tasks} retry={retry} />;
      case "R": return <SingleChoice index={index} tasks={item.tasks} retry={retry} />;
      case "C": return <MultipleChoice index={index} tasks={item.tasks} retry={retry} />;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mb: '28px' }}>
      {quiz.map((item, index) => (
        <Box key={item.id} component="section" sx={{ m: 2, p: 2 }}>
          <Typography variant="h5" gutterBottom>
            {index + 1}. {item.title}
          </Typography>
          {renderTask(item, index)}
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button variant="contained" onClick={handleCheck}>Проверить</Button>
        <Button variant="contained" onClick={handleRetry}>Начать снова</Button>
      </Box>

      {showResult && (
        <Box sx={{ m: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Результаты тестирования
          </Typography>
          {results.map((score, index) => (
            <Typography key={index} align="center">
              Задание {index + 1}: {score.correct} из {score.total}
              {score.correct === score.total ? ' ✓' : ''}
            </Typography>
          ))}
          <Typography variant="h5" align="center" >
            Итог: {fullyCorrect} из {quiz.length} заданий выполнено полностью верно
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Quiz;
