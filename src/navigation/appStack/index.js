import React from 'react'
import {TouchableOpacity,Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from '../bottomNavigation/index';
import AuthStack from '../authStack/index';
import {useDispatch, useSelector} from 'react-redux';
import { tokenLogin,logout } from '../../redux/auth/loginSlice';
import Splash from '../../pages/auth/Splash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Detail from '../../pages/summary/Detail';
import MRDetail from '../../pages/mr/Detail';
import ExceptionTabs from "../../components/exceptions/ExceptionTabs"
import Total from '../../pages/mr/Total';
import Active from '../../pages/mr/Active';
import Blocked from '../../pages/mr/Blocked';
import InActive from '../../pages/mr/InActive';
import ExceptionsData from "../../pages/mr/ExceptionsData";
import FilterScreen from '../../pages/mr/FilterScreen';
import Attandance from '../../pages/Attandance/Attandance';
import Mapping from '../../pages/Mapping';


const Stack = createNativeStackNavigator();

const index = () => {

    let auth = useSelector(state => state.auth)
    let dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(tokenLogin())
    },[])
      
    if(auth.loading) {
        return <Splash />
    }

    if(!auth.logStatus) {
        return <AuthStack />
    }


    const showAlert = () => {
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: async () => {
                await AsyncStorage.removeItem('mobileNo');
                dispatch(logout())
              },
            },
          ],
          { cancelable: false }
        );
    };


    return (
        <NavigationContainer>
            <Stack.Navigator
                // screenOptions={{
                //     headerShown: false, 
                //   }}
            >
                <Stack.Screen name="HomeScreen" component={BottomNavigation} 
                    options={{
                        title: 'Meter Reader Management',
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={async () => {
                                    showAlert()
                                }}
                            >
                                <Icon name="logout" color={"#000"} size={26} />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Stack.Screen options={{title: 'Summary'}} name="SummaryDetail" component={Detail} />
                <Stack.Screen options={{title: 'Total MR`s'}} name="MRDetail" component={MRDetail} />
                <Stack.Screen options={{title: 'Image Verification',headerShown:true}} name="ExceptionTabs" component={ExceptionTabs} />
                <Stack.Screen options={{title: 'Exceptions Data'}} name="ExceptionsData" component={ExceptionsData} />
                
                {/* mr screens */}
                <Stack.Screen options={{title: 'Total MR`s'}} name="Total" component={Total} />
                <Stack.Screen options={{title: 'Active MR`s'}} name="Active" component={Active} />
                <Stack.Screen options={{title: 'In Active MR`s'}} name="InActive" component={InActive} />
                <Stack.Screen options={{title: 'Blocked MR`s'}} name="Blocked" component={Blocked} />
                <Stack.Screen options={{title: 'Filter Screen'}} name="FilterScreen" component={FilterScreen} />


                <Stack.Screen options={{title: 'Attandance'}} name="Attandance" component={Attandance} />
                <Stack.Screen options={{title: 'Mapping'}} name="Mapping" component={Mapping} />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default index

