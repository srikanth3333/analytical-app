import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSummary = createAsyncThunk('user/getSummary', 
	async (payload, {getState}) => {
		let {auth} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/${payload.urlPath}?mrid=${payload.mrid}&startDate=${""}&endDate=${""}&page=${payload.page}&exception=${payload.remark}&boardCode=${auth.dataUser?.boardCode}&readingStatus=${payload.remark}&agencyId=${auth.dataUser?.agency}`)
        .then(res => {
			// console.log('resp', `https://mr.bharatsmr.com/dashboard/${payload.urlPath}?mrid=${payload.mrid}&startDate=${""}&endDate=${""}&page=${payload.page}&exception=${payload.remark}&boardCode=${auth.dataUser?.boardCode}&readingStatus=${payload.remark}`)
            return {data: payload.urlPath == 'mrAnalysisSummaryReadings' ? res.data : res.data.mSummaryData}
			// return {data: res.data.mSummaryData}
        })
		.catch(err => {
			return {data:[]}
		})
	}
)

export const index = createSlice({
	name: 'summary',
	initialState: {
		data: [],
		loading: true,
		error:false,
		count:0,
	},
	extraReducers: {
		[getSummary.pending]: (state) => {
			state.loading = true,
			state.error = false
		},
		[getSummary.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getSummary.rejected]: (state) => {
			state.loading = false,
			state.error = 'Unable to fetch data please try again later'
		},
	}
	
});

export default index.reducer;