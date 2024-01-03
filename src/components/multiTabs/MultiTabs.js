import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch} from 'react-redux';
import {FlatList,View,ActivityIndicator} from 'react-native';
import CardItem from '../summary/CardItem'
import axios from 'axios';
import { Box, Button, Pressable, Text, HStack, Select, CheckIcon} from 'native-base';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Loader from '../loaders/Loader';
import EmpData from '../loaders/EmpData';

const Tab = createMaterialTopTabNavigator();

const CommonComponent = ({remark,props}) => {



    let user = useSelector(state => state.auth);
    const [formData, setFormData] = React.useState({uidNo:'',startDate:'',endDate:''});
    const [currentPage,setCurrentPage] = React.useState(0);
    const [newPage,setNewPage] = React.useState('');
    const [mData,setMData] = React.useState([])
    const [vscStatus, setVscStatus] = React.useState("")
    const [loading,setLoading] = React.useState(true)
    const [btnLoading,setBtnLoading] = React.useState(false)
    // const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false);
    const [dataCount, setDataCount] = React.useState(props.route.params.count)


    // let remark = remark;
    let mrid = props.route.params?.mrid;
    let count = props.route.params?.count;
    let urlChange = remark?.includes("LK")
    let urlChange2 = remark?.includes("MD")
    let currentPath = urlChange || urlChange2 ? 'mrAnalysisSummaryReadings' : 'readingSummary'
    let readingStatus = remark?.includes("LK") || remark?.includes("MD") || remark?.includes("OK")
        

    const getSummary =  async () => {
        setBtnLoading(true)
        console.log(`https://mr.bharatsmr.com/dashboard/readingSummary?mrid=${mrid}&page=${currentPage}&exception=${remark}&boardCode=${user.dataUser?.boardCode}&readingStatus=${remark}&startDate=${!formData.startDate ? '' : moment(formData.startDate).format("YYYY-MM-DD")}&endDate=${!formData.startDate ? '' : moment(formData.startDate).format("YYYY-MM-DD")}&vscStatus=${vscStatus}`)
        await axios.get(`https://mr.bharatsmr.com/dashboard/readingSummary?mrid=${mrid}&page=${currentPage}&exception=${remark}&boardCode=${user.dataUser?.boardCode}&readingStatus=${remark}&startDate=${!formData.startDate ? '' : moment(formData.startDate).format("YYYY-MM-DD")}&endDate=${!formData.startDate ? '' : moment(formData.startDate).format("YYYY-MM-DD")}&vscStatus=${vscStatus}`)
        .then(res => {
            
            if(res.data.mSummaryData) {
                // console.log(res.data.mSummaryData)
                setMData([...mData, ...res.data.mSummaryData])
                setLoading(false)    
                setDataCount(res.data.mSummaryData.length)
            }else {
                // console.log(res.data)
                setMData([...mData, ...res.data])
                setLoading(false)    
                setDataCount(res.data.length)
            }
            setBtnLoading(false)

            
        })
        .catch(err => {
            console.log(JSON.stringify(err))
            setBtnLoading(false)
            // alert("Something went wrong")
        })
    }

    const onRefresh = () => {
        setCurrentPage(0)
        setLoading(true)
        mData.length = 0;
        getSummary()
    }

    React.useEffect(() => {
        getSummary()
    }, [currentPage])

    const renderFooter = () => {
        return (
            <>
                {
                    
                    <View>
                        <ActivityIndicator size="large" color="#aaa" />
                    </View>
                }
                
            </>
        )
    }

    const handleForm = () => {
        setNewPage(0)
        setMData([])
        mData.length = 0;
        getSummary()
    }

    const loadMoreItems = () => {
        if(dataCount != 20) {
            return;
        }
        setCurrentPage(currentPage + 1)
    }
    
    // if(loading) {
    //     return <Loader />
    // }
    // if(mData.length === 0) {
    //     return <EmpData />
    // }

    return (
        <>
        <Box>
            <HStack justifyContent={"space-between"}>
                <Box width="48%">
                    <Pressable hright="100%" py="2" p="2" onPress={() => {
                        setOpen(true)
                        
                    }}>
                        <Text textAlign="center" mt={2}>{!formData.startDate ? 'Select Date' : moment(formData.startDate).format("YYYY-MM-DD")}</Text>
                    </Pressable>
                    <DatePicker
                        modal={true}
                        open={open}
                        date={new Date()}
                        mode="date"
                        onConfirm={(date) => {
                            setOpen(false)
                            setFormData({ ...formData,
                                startDate: date
                            })
                            setNewPage(0)
                        }}
                        onCancel={() => {
                            setOpen(false)  
                        }}
                    />
                </Box>
                <Box width="50%">
                    <Box maxW="300">
                        <Select minWidth="100%" accessibilityLabel="Choose Service" placeholder="Choose Service" 
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} mt={1} 
                                selectedValue={vscStatus}
                                onValueChange={itemValue => setVscStatus(itemValue)}>
                                <Select.Item label="Select All" value="" />
                                <Select.Item label="Show Un Tagged" value={0} />
                                <Select.Item label="Show Tagged" value={1} />
                        </Select>
                    </Box>
                </Box>
            </HStack>
            <Button isLoading={btnLoading} onPress={handleForm} borderRadius={0}>Submit</Button>
        </Box>
        {
            btnLoading ? <Loader /> :
                mData.length === 0 ?
            <EmpData />
            :
            <FlatList 
                data={mData}
                renderItem={({item,index}) => {
                    return  <CardItem key={index} item={item} />
                }}
                keyExtractor={(item,i) => i}
                onEndReached={loadMoreItems}
                ListFooterComponent={dataCount == mData.length  ? null : renderFooter}
                onEndReachedThreshold={0}
                onRefresh={() => onRefresh()}
                refreshing={loading}
            />
        }
        </>
    )
}

export default function MultiTabs({Tabs,props,selectedTab}) {

   return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: { width: '100%'},
      }}
      initialRouteName={selectedTab}
    >
    {
        Tabs.map((item,index) => (
            <Tab.Screen 
                key={index}
                name={item.name} 
                options={{title:item.title}} 
                children={()=><CommonComponent remark={item.remark} props={props}/>}
            />
        ))
    }
    </Tab.Navigator>
  );
}