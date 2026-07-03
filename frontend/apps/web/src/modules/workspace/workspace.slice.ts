import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WorkspaceUiState {
  expandedPaths: string[];
  selectedPath: string | null;
  canvasMode: 'preview' | 'code';
  previewUrlByProject: Record<number, string | null>;
}

const initialState: WorkspaceUiState = {
  expandedPaths: [],
  selectedPath: null,
  canvasMode: 'preview',
  previewUrlByProject: {},
};

const workspaceSlice = createSlice({
  name: 'workspaceUi',
  initialState,
  reducers: {
    toggleFolder(state, action: PayloadAction<string>) {
      const path = action.payload;
      state.expandedPaths = state.expandedPaths.includes(path)
        ? state.expandedPaths.filter((p) => p !== path)
        : [...state.expandedPaths, path];
    },
    selectFile(state, action: PayloadAction<string>) {
      state.selectedPath = action.payload;
    },
    setCanvasMode(state, action: PayloadAction<'preview' | 'code'>) {
      state.canvasMode = action.payload;
    },
    setPreviewUrl(state, action: PayloadAction<{ projectId: number; previewUrl: string }>) {
      state.previewUrlByProject[action.payload.projectId] = action.payload.previewUrl;
    },
  },
});

export const { toggleFolder, selectFile, setCanvasMode, setPreviewUrl } = workspaceSlice.actions;
export default workspaceSlice.reducer;
