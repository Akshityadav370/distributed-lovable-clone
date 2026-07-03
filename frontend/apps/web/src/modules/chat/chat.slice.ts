import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ChatUiState {
  generatingByProject: Record<number, boolean>;
  errorByProject: Record<number, string | null>;
}

const initialState: ChatUiState = {
  generatingByProject: {},
  errorByProject: {},
};

const chatSlice = createSlice({
  name: 'chatUi',
  initialState,
  reducers: {
    setGenerating(state, action: PayloadAction<{ projectId: number; value: boolean }>) {
      state.generatingByProject[action.payload.projectId] = action.payload.value;
    },
    setError(state, action: PayloadAction<{ projectId: number; message: string | null }>) {
      state.errorByProject[action.payload.projectId] = action.payload.message;
    },
  },
});

export const { setGenerating, setError } = chatSlice.actions;
export default chatSlice.reducer;
