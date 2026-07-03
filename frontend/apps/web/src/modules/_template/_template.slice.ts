import { createSlice } from '@reduxjs/toolkit';

interface TemplateUiState {
  isDialogOpen: boolean;
  selectedId: number | null;
}

const initialState: TemplateUiState = {
  isDialogOpen: false,
  selectedId: null,
};

const templateSlice = createSlice({
  name: 'templateUi',
  initialState,
  reducers: {
    openDialog(state) {
      state.isDialogOpen = true;
    },
    closeDialog(state) {
      state.isDialogOpen = false;
    },
    selectEntity(state, action: { payload: number | null }) {
      state.selectedId = action.payload;
    },
  },
});

export const { openDialog, closeDialog, selectEntity } = templateSlice.actions;
export default templateSlice.reducer;
