import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'slice',
  initialState: {
    numSing: '09',
    me: {},
  },

  reducers: {
    handleNum: (state, action) =>{
      state.numSing = action.payload
    },
    setme: (state, action) =>{
      state.me = action.payload
    },
  },
})

export const { handleNum, setme } = slice.actions
export default slice.reducer