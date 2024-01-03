import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = createAsyncThunk('user/getUser', 
	async (payload, {dispatch}) => {
		return await axios.get(`https://mr.bharatsmr.com/dashboard/usersList?mobileNo=${payload.mobileNo}`)
		.then(res => {
			let [user] = res.data
			if(!user) {
				alert("Not a registered User")
				return {data:null}
			}
			dispatch(sendOtp({mobileNo: payload.mobileNo}))
			return {data:user}
		})
		
	}
)


export const sendOtp = createAsyncThunk('user/sendOtp', 
	async (payload) => {
		return await axios.get(`https://mr.bharatsmr.com/sendOtp?mobileNo=${payload.mobileNo}`)
		.then(res => {
            if(res.data.message == "Success") {
                return {msg:'OTP Sent Successfully',otpView:true}
            }
		})
		.catch(err => {
            return {msg:'Error try again later',otpView:false}
		})
	}
)

export const logout = createAsyncThunk('user/logout', 
	async () => {
		return {logStatus: false}
	}
)


export const tokenLogin = createAsyncThunk('user/new', 
	async (payload,{dispatch}) => {
		let mobileNo = await AsyncStorage.getItem('mobileNo');
		return await axios.get(`https://mr.bharatsmr.com/dashboard/usersList?mobileNo=${mobileNo}`)
		.then(res => {
			let [user] = res.data
			if(!user || !mobileNo) {
				return {logStatus: false};
			}
			return {dataUser:user,logStatus:true}
		})	
	}
)


export const verifyOtp = createAsyncThunk('user/verifyOtp', 
	async (payload,{dispatch,getState}) => {
		let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/verifyOtp?mobileNo=${payload.mobileNo}&otp=${payload.otp}`)
		.then(res => {
            
			if(res.data.message == "Success") {
				const storeData = async () => {
                    try {
                      await AsyncStorage.setItem('mobileNo', payload.mobileNo);
                    } catch (e) {
                      console.log('login error')
                    }
                };
                storeData()
				return {logStatus:true,otpView:false,logData:res.data}
			}else {
				alert("Wrong OTP")
				return {logStatus:false,otpView:true,logData:[]}
			}
		})
		
	}
)


export const getHierarchy = createAsyncThunk('Hierarchy/getHierarchy',
	async (payload,{getState}) => {
		let {auth} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/getHierarchy?boardCode=${payload.boardCode}&subDiv=${payload.subDiv}&section=${payload.section}&area=${payload.area}&agencyId=${payload.agency}&mrid=${payload.mrid}`)
		.then(res => {
			console.log(`https://mr.bharatsmr.com/dashboard/getHierarchy?boardCode=${payload.boardCode}&subDiv=${payload.subDiv}&section=${payload.section}&area=${payload.area}&agencyId=${payload.agency}&mrid=${payload.mrid}`)
			return {hierarchyData:res.data}
		})
        .catch(err => {
            return {hierarchyData:[]}
        })
	}
)


export const authSlice = createSlice({
    name:'auth',
    initialState: {
        loading: true,
        data: [],
        dataUser:[],
        error: false,
        logStatus: false,
        loggedIn:false,
        logData:[],
        msg:'',
        otpView: false,
		hierarchyData:null,
		remarks: {
			"MAH": "Meter at height",
			"MIID": "Meter is internally dirty",
			"BD":"Blank Display",
			"VI": "Validation Issue",
			"DND": "Decimal not detected",
			"DSI": "Display segment issue",
			"PRIHTMR": 'Previous reading is higher than meter reading',
			"MS": "Meter stuck",
			"MJ": "Meter Jump",
			"VF": "Voltage fluctuations",
			"CU": "Consumer untraceable",
			"NMC": "Non meter consumer",
			"AC": "Agriculture consumer",
			"UI":"Unclear Image"
		},
		abbr: {
			"FI":"Field Issues",
			"WD":"With Exceptions",
			"LK":"Door Lock",
			"MD":"Meter Defective",
			"WD":"With Exceptions",
			"WOD":"Without Exceptions",
			"Ok":"OK",
		}
    },
    extraReducers: {
        [tokenLogin.pending]: (state) => {
            state.loading = true
            state.error = false
		},
        [sendOtp.fulfilled]: (state, action) => {
			state.otpView = action.payload.otpView
		},
        [logout.fulfilled]: (state, action) => {
			state.logStatus = false
		},
        [getUser.fulfilled]: (state, action) => {
			state.loading = false
			state.dataUser = action.payload.data
		},
        [verifyOtp.fulfilled]: (state, action) => {
			state.otpView = action.payload.otpView
			state.loggedIn = action.payload.logStatus
			state.logData = action.payload.logData
            state.logStatus = action.payload.logStatus
		},
		[getHierarchy.fulfilled]: (state, action) => {
			state.hierarchyData = action.payload.hierarchyData
		},
        [tokenLogin.fulfilled]: (state, action) => {
			state.logStatus = action.payload.logStatus
			state.dataUser = action.payload.dataUser
            state.loading = false
 		},
        [tokenLogin.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
       
    },
})

export default authSlice.reducer;