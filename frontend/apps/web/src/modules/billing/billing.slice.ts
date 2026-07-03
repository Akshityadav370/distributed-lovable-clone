import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface BillingUiState {
  selectedPlanId: number | null;
}

const initialState: BillingUiState = {
  selectedPlanId: null,
};

const billingSlice = createSlice({
  name: 'billingUi',
  initialState,
  reducers: {
    selectPlan(state, action: PayloadAction<number | null>) {
      state.selectedPlanId = action.payload;
    },
  },
});

export const { selectPlan } = billingSlice.actions;
export default billingSlice.reducer;
