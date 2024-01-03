import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

export const getRealTime = createAsyncThunk('user/getRealTime', 
	async (payload, {getState}) => {
		let {auth} = getState();
		console.log(`https://mr.bharatsmr.com/dashboard/meterreadings/today?page=${payload.page}&agencyId=${auth.dataUser.agency}&boardCode=${auth.dataUser.boardCode}&limitRecords=50&mridList=${payload.mridList.length == 0 ? '' : JSON.stringify(payload.mridList)}&groupByKey=agencyId&mrid=${!payload.mrid ? '' : payload.mrid}`)
		return await axios.get(`https://mr.bharatsmr.com/dashboard/meterreadings/today?page=${payload.page}&agencyId=${auth.dataUser.agency}&boardCode=${auth.dataUser.boardCode}&limitRecords=50&mridList=${payload.mridList.length == 0 ? '' : JSON.stringify(payload.mridList)}&groupByKey=agencyId&mrid=${!payload.mrid ? '' : payload.mrid}`)
        .then(res => {
            // console.log(`https://mr.bharatsmr.com/dashboard/meterreadings/today?page=${payload.page}&agencyId=${auth.dataUser.agency}&boardCode=${auth.dataUser.boardCode}&limitRecords=50&mridList=${JSON.stringify(payload.mridList)}&groupByKey=agencyId&mrid=${payload.mrid}`)
            return {data: res.data}
        })
		.catch(err => {
			console.log(JSON.stringify(err))
			return {data:[]}
		})
	}
)

export const index = createSlice({
	name: 'getRealTime',
	initialState: {
		data: [],
		loading: true,
		error:false,
		count:0,
	},
	extraReducers: {
		[getRealTime.pending]: (state) => {
			state.loading = true,
			state.error = false
		},
		[getRealTime.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getRealTime.rejected]: (state) => {
			state.loading = false,
			state.error = 'Unable to fetch data please try again later'
		},
	}
	
});

export default index.reducer;