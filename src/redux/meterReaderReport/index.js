import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReports = createAsyncThunk('reports/getReportsMR', 
	async (payload, {getState}) => {
		let {auth} = getState();		
		return await axios.get(`https://mr.bharatsmr.com/dashboard/mrAnalysisExport?startDate=${""}&endDate=${""}&mrid=${""}&boardCode=${auth.dataUser?.boardCode}&subDiv=${""}&section=${""}&area=${""}&agencyId=${""}&page=${payload.page}&agencyId=${auth.dataUser?.agency}`)
        .then(res => {
            try{
                return {data:res.data}
            }catch(e){ 
                return {data:[]}
            }
        })
	}
)

export const index = createSlice({
	name: 'reportsMR',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
		startDate: '',
		endDate:''
    },
	extraReducers: {
		[getReports.pending]: (state) => {
			state.loading = true,
			state.error = false
		},
		[getReports.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getReports.rejected]: (action) => {
			return {loading:false,error:'Something went wrong'}
		},
	}
	
});

export default index.reducer;