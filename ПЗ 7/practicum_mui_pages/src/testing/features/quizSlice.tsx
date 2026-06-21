import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
  lists: string[][]; // для каждого задания: текущий порядок / выбранные ответы
}

const initialState: ListsState = {
  lists: [],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    // Инициализация / сброс состояния конкретного задания
    addList: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.lists[index] = items; // присваиваем по индексу, а не вставляем
    },
    // Обновление состояния конкретного задания (перетаскивание, выбор варианта)
    setDraggedItems: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },
  },
});

export const { addList, setDraggedItems } = listsSlice.actions;
export default listsSlice.reducer;
