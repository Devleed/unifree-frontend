import { createSlice } from '@reduxjs/toolkit'
import { CustomPosition } from 'components/PositionListItem'

interface PaperPosition extends CustomPosition {
  token0: string
  token1: string
}

export interface PaperPositionState {
  positionDetails: PaperPosition | undefined
}

export const initialState: PaperPositionState = {
  positionDetails: undefined
}

const paperPositionSlice = createSlice({
  name: 'paper-position',
  initialState,
  reducers: {
    updateCustomPosition(state, { payload }: { payload: PaperPosition }) {
      state.positionDetails = payload
    },
  }
})

export const {
  updateCustomPosition,
} = paperPositionSlice.actions
export default paperPositionSlice.reducer
