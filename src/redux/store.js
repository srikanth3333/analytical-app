import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/loginSlice';
import summaryReducer from "./summary/index";
import supervisorReducer from "./supervisorsList/index";
import analysisReducer from "./analysisRemarks/index";
import realTimeReducer from "./realtime/index"

export default configureStore({
	reducer: {
        auth: authReducer,
        summary:summaryReducer,
        supervisorList:supervisorReducer,
        analysis:analysisReducer,
        realtime: realTimeReducer
    },
});