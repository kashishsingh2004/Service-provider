import { configureStore } from '@reduxjs/toolkit';
import schoolReducer from '../features/schoolSlice';
import teacherReducer from '../features/teacherSlice';
import themeReducer from '../features/themeSlice';
import userAuthReducer from '../features/userAuthSlice';

export const store = configureStore({
    reducer: {
        school: schoolReducer,
        teacher: teacherReducer,
        theme: themeReducer,
        userAuth: userAuthReducer,
    },
});

export default store;