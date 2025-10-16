import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { all } from 'axios'

 export const counterslice = createSlice({
  name: 'counter',
  initialState: {
    allUsers: [],
    count: 0
  },
//   reducers: {
//     increment: (state) => {
//       state.count += 1
//     },
//     decrement: (state) => {
//       state.count -= 1
//     },
//     reset: (state) => {
//       state.count = 0
//     }
//   }
})

export const { increment, decrement, reset } = counterslice.actions
export default counterslice.reducer
