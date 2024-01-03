import { Box,Pressable,Center,Image,Text,HStack } from 'native-base';
import {FlatList,Linking} from 'react-native';
import React from 'react'
import { getList } from '../../redux/supervisorsList';
import { getAnalysis } from '../../redux/analysisRemarks';
import { useSelector, useDispatch} from 'react-redux';
import EmpData from '../../components/loaders/EmpData';
import Loader from '../../components/loaders/Loader';
import CallIcon from 'react-native-vector-icons/Feather';
import WhatsappIcon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const ExceptionsData = ({navigation,route}) => {

    let data = useSelector(state => state.analysis)
    let mr = useSelector(state => state.supervisorList);
    let dispatch = useDispatch();
    let apiObject = {page:0,mrid:route.params?.mrid.split(',')}
    let outputArray = [...mr.data.active, ...mr.data.blocked, ...mr.data.inActive]
    let mrid = outputArray.filter((item) => item.mrid == route.params?.mrid)

    React.useEffect(() => {
        dispatch(getList(apiObject))
        .then(res => {
            dispatch(getAnalysis(apiObject))  
        })
        navigation.setOptions({title: route.params?.mrid, headerRight: () => (
            <HStack space={5}>
                <Pressable
                    onPress={() => {
                        Linking.openURL(`whatsapp://send?text=hi&phone=91${mrid && mrid[0]?.mobileNo}`)
                    }}
                >
                    <WhatsappIcon name="whatsapp" color="#000" size={27} />
                </Pressable>
                <Pressable 
                    onPress={() => {
                        Linking.openURL(`tel:${mrid && mrid[0]?.mobileNo}`)
                    }}
                >
                    <CallIcon color="#000" name="phone-call" size={27} /> 
                </Pressable>
            </HStack>
          ),})
    },[dispatch])

    let startDate = moment().startOf('month')
    let beforeDay = moment().subtract(1, 'days')
    let dateOutput = startDate.format('M') == beforeDay.format('M')


    if(data.loading) {
        return <Loader />
      }
    
      if(!data.data || data.data.length === 0) {
        return <EmpData />
      }

    const renderItem = ({item}) => {
        return (
            <Box p="3">
                <Pressable p="3" bg="#fff" shadow="4" borderRadius={5} onPress={() => {
                    // navigation.navigate("SummaryDetail", {mrid:item.id,remark:remark});
                }}>
                    <Center>
                        <Image
                            source={{
                                uri: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png",
                            }}
                            alt="Alternate Text"
                            size={"lg"}
                            // mb="2"
                        />
                        {
                            dateOutput ?
                            <Text>(From: {`${startDate.format('DD-MM-YYYY')} To: ${beforeDay.format('DD-MM-YYYY')}`})</Text>    
                            :
                            <Text>(From: {`${startDate.format('DD-MM-YYYY')}`})</Text>    
                        }
                        <Text fontSize="xl" mb="2">Consumer Count: {item.consumerCount}</Text>
                        <Box>
                            <Box mb="3">
                                <Text fontSize="xl" alignSelf="center">OK</Text>
                                <Pressable p="2" shadow="2" bg="#fff" borderRadius={15}
                                    onPress={() => {
                                        navigation.navigate("SummaryDetail", {mrid:item.id,remark:"Ok",count:item.OK,selectedTab:"Ok"});
                                    }}
                                >
                                        <Text alignSelf="center" fontSize="20" underline color="blue.500">{item.OK}</Text>
                                </Pressable>
                            </Box>
                            <Box mb="3">
                                <Text fontSize="xl" alignSelf="center">Door Lock</Text>
                                <Pressable p="2" shadow="2" bg="#fff" borderRadius={15}
                                    onPress={() => {
                                        navigation.navigate("SummaryDetail", {mrid:item.id,remark:"LK",count:item.LK,selectedTab:"LK"});
                                    }}
                                >
                                        <Text alignSelf="center" fontSize="20" underline color="blue.500">{item.LK}</Text>
                                </Pressable>
                            </Box>
                            <Box mb="3">
                                <Text fontSize="xl" alignSelf="center">Meter Defective</Text>
                                <Pressable p="2" shadow="2" bg="#fff" borderRadius={15}
                                    onPress={() => {
                                        navigation.navigate("SummaryDetail", {mrid:item.id,remark:"MD",count:item.MD,selectedTab:"MD"});
                                    }}
                                >
                                        <Text alignSelf="center" fontSize="20" underline color="blue.500">{item.MD}</Text>
                                </Pressable>
                            </Box>
                            <Box mb="3">
                                <Text fontSize="xl" alignSelf="center">With Exceptions</Text>
                                <Pressable p="2" shadow="2" bg="#fff" borderRadius={15}
                                    onPress={() => {
                                        navigation.navigate("SummaryDetail", {mrid:item.id,remark:"WD",count:item.WD,selectedTab:"WD"});
                                    }}
                                >
                                        <Text alignSelf="center" fontSize="20" underline color="blue.500">{item.WD}</Text>
                                </Pressable>
                            </Box>
                            <Box mb="3">
                                <Text fontSize="xl" alignSelf="center">Without Exceptions</Text>
                                <Pressable p="2" shadow="2" bg="#fff" borderRadius={15}
                                    onPress={() => {
                                        navigation.navigate("SummaryDetail", {mrid:item.id,remark:"WOD",count:item.WOD,selectedTab:"WOD"});
                                    }}
                                >
                                        <Text alignSelf="center" fontSize="20" underline color="blue.500">{item.WOD}</Text>
                                </Pressable>
                            </Box>
                            <Box mb="3">
                                <Text fontSize="xl" alignSelf="center">Field Issues</Text>
                                <Pressable p="2" shadow="2" bg="#fff" borderRadius={15}
                                    onPress={() => {
                                        navigation.navigate("SummaryDetail", {mrid:item.id,remark:"FI",count:item.FI,selectedTab:"FI"});
                                    }}
                                >
                                        <Text alignSelf="center" fontSize="20" underline color="blue.500">{item.FI}</Text>
                                </Pressable>
                            </Box>
                           
                        </Box>
                    </Center>
                </Pressable>
            </Box>
        )
    }

    return (
        <>  
            <FlatList 
                decelerationRate="fast"
                data={data.data}
                renderItem={renderItem}
                keyExtractor={(item,i) => i}
            />
        </>
        
    )
}


export default ExceptionsData