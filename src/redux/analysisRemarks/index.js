import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAnalysis = createAsyncThunk('user/analysis', 
	async (payload, {getState}) => {
		let {auth} = getState();
		// console.log(`https://mr.bharatsmr.com/dashboard/mrid?mridList=${JSON.stringify(payload.mrid)}&supervisor=${auth.dataUser.mobileNo}&boardCode=${auth.dataUser?.boardCode}&agencyId=${auth.dataUser?.agency}`)
		return await axios.get(`https://mr.bharatsmr.com/dashboard/mrid?mridList=${JSON.stringify(payload.mrid)}&supervisor=${auth.dataUser.mobileNo}&boardCode=${auth.dataUser?.boardCode}&agencyId=${auth.dataUser?.agency}`)
        .then(res => {
			// console.log(`://mr.bharatsmr.com/dashboard/mrid?mridList=${payload.mrid}&supervisor=${auth.dataUser.mobileNo}&boardCode=${auth.dataUser?.boardCode}&agencyId=${auth.dataUser?.agency}`)
            try{
                // const result = res.data.filter(({id}) => mrids.includes(id))
                return {data:res.data}
            }catch(e){ 
                return {data:[],count:0,total:0}
            }
        })
	}
)

export const index = createSlice({
	name: 'analysis',
	initialState: {
		data: [],
		loading: true,
		error:false,
		count:0,
	},
	extraReducers: {
		[getAnalysis.pending]: (state) => {
			state.loading = true,
			state.error = false
		},
		[getAnalysis.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getAnalysis.rejected]: (state) => {
			state.loading = false,
			state.error = 'Unable to fetch data please try again later'
		},
	}
	
});

export default index.reducer;