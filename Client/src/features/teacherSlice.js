import { createSlice } from '@reduxjs/toolkit';

const teacherSlice = createSlice({
    name: 'teacher',
    initialState: {
        teachers: [],
        currentTeacher: null,
    },
    reducers: {
        setTeachers: (state, action) => {
            state.teachers = action.payload;
        },
        setCurrentTeacher: (state, action) => {
            state.currentTeacher = action.payload;
        },
    },
});

export const { setTeachers, setCurrentTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;