import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
  name: 'videoSlice',
  initialState: {
    selected: '', // 유저가 선택한 비디오
    videoURL: '',
    stretchModal: false,
    stretchingMode: false,
    videoList: [],
  },
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setVideoURL: (state, action) => {
      state.videoURL = action.payload;
    },
    setStretchModal: (state, action) => {
      state.stretchModal = action.payload;
    },
    setStretchingMode: (state, action) => {
      state.stretchingMode = action.payload;
    },
    setVideoList: (state, action) => {
      state.videoList = action.payload;
    },
  },
});

export default videoSlice;
export const {
  setSelected,
  setVideoURL,
  setStretchModal,
  setStretchingMode,
  setVideoList,
} = videoSlice.actions;
