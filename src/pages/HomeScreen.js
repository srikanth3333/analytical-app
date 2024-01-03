import React from 'react'
import { PermissionsAndroid, ScrollView} from 'react-native';
import { Box, HStack, Text, Pressable} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Entypo';
import { getList } from '../redux/supervisorsList';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../components/loaders/Loader';
import moment from 'moment';

const HomeScreen = ({navigation}) => {

    let data = useSelector(state => state.supervisorList);
    let dispatch = useDispatch()

    let apiObject = {page:0}

    React.useEffect(() => {
        requestCameraPermission()
        dispatch(getList(apiObject))
    },[])


    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'App Camera Permission',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };

    if(data.loading) {
        return <Loader />
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Box pt="4" pl="5">
                <Text>Today's Data: {moment(new Date()).format('MMMM Do YYYY')}</Text>
            </Box>
            <HStack px="4" flexWrap="wrap" mt="2"> 
                    <Pressable onPress={() => navigation.navigate("Total")} shadow={2} m={2} width="45%" bg={"#999999"} py="3" px="4" rounded="xl" >
                        <HStack alignItems="center" >
                            <Icon name="users" color={"#fff"} size={35} />
                            <Text fontSize="30" color="#fff" fontWeight="bold" ml="4">{data.data?.totalCount}</Text>
                        </HStack>
                        <Text fontSize="lg">Total Meter Readers</Text>
                    </Pressable> 
                    <Pressable onPress={() => navigation.navigate("Active")} shadow={2} m={2} width="45%" bg={"#999"} py="3" px="4" rounded="xl" >
                        <HStack alignItems="center">
                            <Icon name="check" color={"#fff"} size={35} />
                            <Text fontSize="30" color="#fff" fontWeight="bold" ml="4">{data.data?.active?.length}</Text>
                        </HStack>
                        <Text fontSize="lg">Active Meter Readers</Text>
                    </Pressable> 
                    <Pressable onPress={() => navigation.navigate("InActive")} shadow={2} m={2} width="45%" bg={"#999"} py="3" px="4" rounded="xl" >
                        <HStack alignItems="center">
                            <Icon name="remove-user" color={"#fff"} size={35} />
                            <Text fontSize="30" color="#fff" fontWeight="bold" ml="4">{data.data?.totalCount - data.data?.active?.length}</Text>
                        </HStack>
                        <Text fontSize="lg">InActive Meter Readers</Text>
                    </Pressable> 
                    <Pressable onPress={() => navigation.navigate("Blocked")} shadow={2} m={2} width="45%" bg={"#999"} py="3" px="4" rounded="xl" >
                        <HStack alignItems="center">
                            <Icon name="squared-cross" color={"#fff"} size={35} />
                            <Text fontSize="30" color="#fff" fontWeight="bold" ml="4">{data.data?.blocked?.length}</Text>
                        </HStack>
                        <Text fontSize="lg">Blocked Meter Readers</Text>
                    </Pressable> 
            </HStack>
            <Text></Text>
            <HStack justifyContent="center" alignItems="center" flexWrap="wrap" px="6" my="2" >
                <Pressable onPress={() => navigation.navigate("ExceptionTabs")} shadow={2} width="100%" bg={"#EAF7EE"} py="12" px="4" rounded="xl" >
                        <Box alignItems={"center"}>
                            <MaterialCommunityIcons name="account-search" color={"#000"} size={75} />
                        </Box>
                        <Text alignSelf="center" fontSize="lg">Image Verification</Text>
                        <Text alignSelf="center">(Current month data until yesterday)</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("MRDetail")} shadow={2} width="100%" bg={"#EAF7EE"} py="12" px="4" rounded="xl" mt="4">
                        <Box alignItems={"center"}>
                            <MaterialCommunityIcons name="account-search" color={"#000"} size={75} />
                        </Box>
                        <Text alignSelf="center" fontSize="lg">Total Meter Readers</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Attandance")} shadow={2} width="100%" bg={"#EAF7EE"} py="12" px="4" rounded="xl" >
                        <Box alignItems={"center"}>
                            <MaterialCommunityIcons name="account-search" color={"#000"} size={75} />
                        </Box>
                        <Text alignSelf="center" fontSize="lg">Attandance</Text>
                        {/* <Text alignSelf="center">(Current month data until yesterday)</Text> */}
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Mapping")} mt="3" shadow={2} width="100%" bg={"#EAF7EE"} py="12" px="4" rounded="xl" >
                        <Box alignItems={"center"}>
                            <MaterialCommunityIcons name="account-search" color={"#000"} size={75} />
                        </Box>
                        <Text alignSelf="center" fontSize="lg">Mapping</Text>
                        {/* <Text alignSelf="center">(Current month data until yesterday)</Text> */}
                </Pressable>
            </HStack>
        </ScrollView>
    )
}

export default HomeScreen
