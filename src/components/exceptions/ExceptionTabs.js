import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, Box, Pressable, Image, Center, Heading } from 'native-base';
import {FlatList} from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { getAnalysis } from '../../redux/analysisRemarks';
import { getList } from '../../redux/supervisorsList';
import Loader from '../loaders/Loader';
import moment from 'moment';

const Tab = createMaterialTopTabNavigator();


const Common = ({navigation,data,remark}) => {

    let startDate = moment().startOf('month')
    let beforeDay = moment().subtract(1, 'days')
    let dateOutput = startDate.format('M') == beforeDay.format('M')

    const renderItem = ({item}) => {
        return (
            <Box p="3">
                <Pressable p="3" bg="#fff" shadow="4" borderRadius={5} onPress={() => {
                    navigation.navigate("SummaryDetail", {mrid:item.id,remark:remark,count:item[remark],page:"exceptionTab",selectedTab:remark});
                }}>
                    <Center>
                        <Image
                            source={{
                                uri: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png",
                            }}
                            alt="Alternate Text"
                            size={"sm"}
                            
                        />
                    
                        <Text fontSize="xl">MRID: {item.id}</Text>
                        <Text fontSize="xl">Exceptions: {item[remark]}</Text>
                        <Text fontSize="xl">Consumer Count: {item.consumerCount}</Text>
                    </Center>
                </Pressable>
            </Box>
        )
    }

    return (
        <>
            <Box bg="#fff" p="5">
                <Center>
                    {
                        dateOutput ?
                        <Text>(From: {`${startDate.format('DD-MM-YYYY')} To: ${beforeDay.format('DD-MM-YYYY')}`})</Text>    
                        :
                        <Text>(From: {`${startDate.format('DD-MM-YYYY')}`})</Text>    
                    }
                    
                    <Heading fontSize="4xl">{!data || data.length == 0 ? 0 : data?.reduce((acc,value) => acc + value[remark], 0)}</Heading>
                </Center>
            </Box>
            
            <FlatList 
                decelerationRate="fast"
                data={data}
                renderItem={renderItem}
                keyExtractor={(item,i) => i}
            />
        </>
        
    )
}

const OKData = ({navigation}) => {

    let data = useSelector(state => state.analysis)
    let dispatch = useDispatch();
    let list = useSelector(state => state.supervisorList);
    let outputArray = [...list.data.active, ...list.data.blocked, ...list.data.inActive]
    let array = outputArray.map((item) => item.mrid)
    let apiObject = {page:0,mrid:array}
    console.log(array)


    useEffect(() => {
        dispatch(getList(apiObject))
        .then(res => {
            dispatch(getAnalysis(apiObject))  
        })
        
    },[dispatch])

    

    if(data.loading) {
        return <Loader />
    }

    return <Common remark="WD" navigation={navigation} data={data.data} />
}


const MDData = ({navigation}) => {

    let data = useSelector(state => state.analysis)
    let dispatch = useDispatch();
    let apiObject = {page:0}

    useEffect(() => {
        dispatch(getList(apiObject))
        .then(res => {
            dispatch(getAnalysis(apiObject))  
        })
        
    },[dispatch])
    
    if(data.loading) {
        return <Loader />
    }


    return <Common remark="WOD" navigation={navigation} data={data.data} />
}


const LKData = ({navigation}) => {

    let data = useSelector(state => state.analysis)
    let dispatch = useDispatch();
    let list = useSelector(state => state.supervisorList);
    let outputArray = [...list.data.active, ...list.data.blocked, ...list.data.inActive]
    let array = outputArray.map((item) => item.mrid)
    let apiObject = {page:0,mrid:array}

    useEffect(() => {
        dispatch(getList(apiObject))
        .then(res => {
            dispatch(getAnalysis(apiObject))  
        })
        
    },[dispatch])

    if(data.loading) {
        return <Loader />
    }

    return <Common remark="FI" navigation={navigation} data={data.data} />
}


export default function SummaryDataTabs() {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: { width: '100%'},
      }}
    >
      <Tab.Screen name="WD" options={{title:'With Exception'}} component={OKData}  />
      <Tab.Screen name="FI" options={{title:'Field Issue'}} component={LKData}  />
      {/* <Tab.Screen name="WOD" options={{title:'Without Exception'}} component={MDData}  /> */}
    </Tab.Navigator>
  );
}