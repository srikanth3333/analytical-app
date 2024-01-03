import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View, ScrollView } from 'react-native';
import { useToast, Box, Text, 
  Pressable, Heading, IconButton, Icon, HStack, Avatar, VStack, Spacer, Center } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
// import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import IconArrow from 'react-native-vector-icons/SimpleLineIcons';
import IconDelete from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';

function CardSwipe({data,navigation,api,apiObject}) {


  const [mode, setMode] = useState('Basic');
  let user = useSelector(state => state.auth)
  const toast = useToast();
  let dispatch = useDispatch();

  function Basic() {
  
    const [listData, setListData] = useState(data);
    let itemData = data
  
    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };
  
    const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setListData(newData);
    };
  
    const onRowDidOpen = rowKey => {
      console.log('This row opened', rowKey);
    };

    const handleRemove = async (mrid) => {
      let body = {
          "agency": user.dataUser.agency,
          "mridList": JSON.stringify(mrid.split(', '))
      }
      // console.log(body)
      // return;
      await axios.post(`https://mr.bharatsmr.com/supervisor/${user.dataUser.boardCode}/removeMrid`, body,{
          headers: {
              authkey: user.dataUser.mobileNo
          }
      })
      .then(res => {
          console.log(res)
          toast.show({
              render: () => {
                return <Box bg="emerald.500" px="4" py="2" rounded="sm" _text={{color:'#fff'}} mb={5}>
                        {res.data.message}
                      </Box>;
              }
          });
          console.log(res.data)
          dispatch(api(apiObject))

      })
      .catch(err => {
          toast.show({
              render: () => {
                return <Box bg="error.500" px="4" py="2" rounded="sm" _text={{color:'#fff'}} mb={5}>
                        {"Something went wrong try again later"}
                      </Box>;
              }
          });
          console.log(JSON.stringify(err))
      })
  }
  
    const renderItem = ({
      item,
      index
    }) => <Box>
        <Pressable onPress={() => navigation.navigate("ExceptionsData",{mrid:item.mrid,count:10})} _dark={{
            bg: 'coolGray.800'
        }} _light={{
            bg: 'white'
        }}>
          <Box pl="4" pr="5" py="2" borderBottomWidth={1} borderColor="#ccc">
            <HStack alignItems="center" space={3}>
              <Avatar size="48px" source={{
              uri: item.avatarUrl
            }} />
              <VStack>
                <Text color="coolGray.800" _dark={{
                color: 'warmGray.50'
              }} bold>
                  {item.name}
                </Text>
                <Text color="coolGray.600" _dark={{
                color: 'warmGray.200'
              }}>
                  {item.mrid}
                </Text>
                <Text color="coolGray.600" _dark={{
                color: 'warmGray.200'
              }}>
                  last seen: {moment(item.updatedAt).utcOffset("+05:30").format("DD/MM/YYYY HH:mm A")}
                </Text>
              </VStack>
              <Spacer />
              <Pressable onPress={() => handleRemove(item.mrid)} mr="3">
                <IconDelete name="delete" color="red" size={25} />
              </Pressable>
              <IconArrow name="arrow-right" color="#ccc" size={20} />
            </HStack>
          </Box>
        </Pressable>
      </Box>;
  
    const renderHiddenItem = (data, rowMap) => <HStack flex="1" pl="2">
        <Pressable w="70" ml="auto" cursor="pointer" bg="coolGray.200" justifyContent="center" onPress={() => closeRow(rowMap, data.item.key)} _pressed={{
        opacity: 0.5
      }}>
          <VStack alignItems="center" space={2}>
            {/* <Icon as={<Entypo name="dots-three-horizontal" />} size="xs" color="coolGray.800" /> */}
            <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
              More
            </Text>
          </VStack>
        </Pressable>
        <Pressable w="70" cursor="pointer" bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key)} _pressed={{
        opacity: 0.5
      }}>
          <VStack alignItems="center" space={2}>
            {/* <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" /> */}
            <Text color="white" fontSize="xs" fontWeight="medium">
              Delete
            </Text>
          </VStack>
        </Pressable>
      </HStack>;
  
    return (
          <Box bg="white" safeArea flex="1">
            <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-130} previewRowKey={'0'} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} />
          </Box>
      
    )
  }
  
  return <Box _dark={{
                bg: 'coolGray.800'
              }} _light={{
                bg: 'white'
              }} flex="1" safeAreaTop  >
        
        
          <Basic data={data.data} navigation={navigation} />
      </Box>
}


export default CardSwipe;
    