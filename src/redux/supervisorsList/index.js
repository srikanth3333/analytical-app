import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getList = createAsyncThunk('user/getList', 
	async (payload, {getState}) => {
		let {auth} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/todayMeterReaderStatus?supervisor=${auth.dataUser.mobileNo}&startDate=${""}&endDate=${""}&filter=${""}`)
        .then(res => {
			console.log(res.data)
			return {data:res.data}
        })
		.catch(err => {
			console.log(JSON.stringify(err))
			return {data:[]}
		})
	}
)

export const index = createSlice({
	name: 'supervisorList',
	initialState: {
		data: [],
		loading: true,
		error:false,
		count:0,
	},
	extraReducers: {
		[getList.pending]: (state) => {
			state.loading = true,
			state.error = false
		},
		[getList.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getList.rejected]: (state) => {
			state.loading = false,
			state.error = 'Unable to fetch data please try again later'
		},
	}
	
});

export default index.reducer;