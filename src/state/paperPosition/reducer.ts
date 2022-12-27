import { createSlice } from '@reduxjs/toolkit'

export type FeeEarning = {
  amount0: number
  amount1: number
}
export type FeesPerUnitLiquidity = {
  amount0: number
  amount1: number
}

export interface CustomPosition {
    feeTier: number
    liquidity: number
    tickLower: number
    tickUpper: number
    poolAddress: string
    amount0: number
    amount1: number
    feeEarning: FeeEarning
    feesPerUnitLiquidity: FeesPerUnitLiquidity
    lpTokens: number
    user: string
    timeAdded: number
  }

export interface PaperPosition extends CustomPosition {
  token0: string
  token1: string
}

export interface PaperPositionState {
  positions: {
    [key: string]: PaperPosition
  }
}

export const initialState: PaperPositionState = {
  positions: {}
}

const paperPositionSlice = createSlice({
  name: 'paper-position',
  initialState,
  reducers: {
    updateCustomPosition(state, { payload }: { payload: PaperPosition }) {
      state.positions[payload.poolAddress] = {...(state.positions[payload.poolAddress] || {}), ...payload}
    },
    setPositions(state, { payload }: { payload: PaperPosition[] }) {
      state.positions = payload.reduce<{[key: string]: PaperPosition}>((acc, cur) => {
        acc[cur.poolAddress as keyof typeof acc] = cur

        return acc
      }, {})
    }
  }
})

export const {
  updateCustomPosition,
  setPositions
} = paperPositionSlice.actions
export default paperPositionSlice.reducer
