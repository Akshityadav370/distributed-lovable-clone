import { createSlice } from '@reduxjs/toolkit';

interface ProjectsUiState {
  isCreateDialogOpen: boolean;
}

const initialState: ProjectsUiState = {
  isCreateDialogOpen: false,
};

const projectsSlice = createSlice({
  name: 'projectsUi',
  initialState,
  reducers: {
    openCreateDialog(state) {
      state.isCreateDialogOpen = true;
    },
    closeCreateDialog(state) {
      state.isCreateDialogOpen = false;
    },
  },
});

export const { openCreateDialog, closeCreateDialog } = projectsSlice.actions;
export default projectsSlice.reducer;
