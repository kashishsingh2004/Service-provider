import { createSlice } from '@reduxjs/toolkit';

const schoolSlice = createSlice({
    name: 'school',
    initialState: {
        schools: [],
        currentSchool: null,
    },
    reducers: {
        setSchools: (state, action) => {
            state.schools = action.payload;
        },
        setCurrentSchool: (state, action) => {
            state.currentSchool = action.payload;
        },
    },
});

export const { setSchools, setCurrentSchool } = schoolSlice.actions;
export default schoolSlice.reducer;