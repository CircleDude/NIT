export type tTasks = {
    "question": string; /* вопрос / вариант задания */
    "answer": string;   /* ответ / признак правильности / порядок */
}[]

export type tQuizzes = {
    "id": number,
    "type": "M" | "S" | "R" | "C",
    /* M — сопоставление, S — сортировка,
       R — выбор одного ответа, C — выбор нескольких ответов */
    "title": string, /* формулировка задания */
    "tasks": tTasks,
}[];

export const quiz: tQuizzes = [
  {
    "id": 1,
    "type": "M",
    "title": "Сопоставьте автомобиль и страну-производителя.",
    "tasks": [
      { "question": "SSC Tuatara", "answer": "США" },
      { "question": "Koenigsegg Jesko Absolut", "answer": "Швеция" },
      { "question": "Bugatti Chiron Super Sport", "answer": "Франция" },
      { "question": "Rimac Nevera", "answer": "Хорватия" },
      { "question": "Pagani Huayra", "answer": "Италия" },
    ]
  },
  {
    "id": 2,
    "type": "M",
    "title": "Сопоставьте автомобиль и его максимальную скорость (км/ч).",
    "tasks": [
      { "question": "SSC Tuatara", "answer": "532" },
      { "question": "Koenigsegg Jesko Absolut", "answer": "531" },
      { "question": "Hennessey Venom F5", "answer": "500" },
      { "question": "Bugatti Chiron Super Sport", "answer": "490" },
      { "question": "Rimac Nevera", "answer": "412" },
    ]
  },
  {
    "id": 3,
    "type": "S",
    "title": "Расположите автомобили в порядке убывания максимальной скорости (от самого быстрого).",
    "tasks": [
      { "question": "Devel Sixteen", "answer": "1" },
      { "question": "SSC Tuatara", "answer": "2" },
      { "question": "Koenigsegg Jesko Absolut", "answer": "3" },
      { "question": "Hennessey Venom F5", "answer": "4" },
      { "question": "Bugatti Chiron Super Sport", "answer": "5" },
    ]
  },
  {
    "id": 4,
    "type": "S",
    "title": "Расположите автомобили по году выпуска (от старых к новым).",
    "tasks": [
      { "question": "McLaren F1", "answer": "1" },
      { "question": "Bugatti Veyron Super Sport", "answer": "2" },
      { "question": "Lamborghini Veneno", "answer": "3" },
      { "question": "Koenigsegg Jesko Absolut", "answer": "4" },
    ]
  },
  {
    "id": 5,
    "type": "R",
    "title": "Какой из автомобилей развивает наибольшую максимальную скорость?",
    "tasks": [
      { "question": "Devel Sixteen", "answer": "true" },
      { "question": "SSC Tuatara", "answer": "false" },
      { "question": "Bugatti Chiron Super Sport", "answer": "false" },
      { "question": "Rimac Nevera", "answer": "false" },
    ]
  },
  {
    "id": 6,
    "type": "C",
    "title": "Какие из перечисленных автомобилей являются электрическими?",
    "tasks": [
      { "question": "Rimac Nevera", "answer": "true" },
      { "question": "Lotus Evija", "answer": "true" },
      { "question": "Pininfarina Battista", "answer": "true" },
      { "question": "Bugatti Chiron Super Sport", "answer": "false" },
      { "question": "Koenigsegg Jesko Absolut", "answer": "false" },
    ]
  },
]
