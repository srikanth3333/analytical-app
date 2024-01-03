import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Box, Center, HStack, Text, Pressable } from 'native-base';
import {Alert} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/auth/loginSlice';
import VersionNumber from 'react-native-version-number'

const UserProfile = () => {

  let user = useSelector(state => state.auth)
  let appVersion = VersionNumber.appVersion;
  let dispatch = useDispatch()
  console.log(appVersion)

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
    <Box flex="1">
      <Box py="4">
        <Center>
          <Icon name="user-circle-o" size={100} />
          <Box >
            <Text alignSelf={"center"} fontSize={"xl"}>{user.dataUser?.name}</Text>
          </Box>
        </Center>
      </Box>
      <Box>
        <HStack borderTopWidth="1" borderColor="#fcfcfc" p="2" px="4">
          <Text width="50%" fontSize="lg" fontWeight="bold">Mobile No:</Text>
          <Text fontSize="lg">{user.dataUser?.mobileNo}</Text>
        </HStack>
        <HStack borderTopWidth="1" borderColor="#fcfcfc" p="2"px="4">
          <Text width="50%" fontSize="lg" fontWeight="bold">BoardCode:</Text>
          <Text fontSize="lg">{user.dataUser?.boardCode}</Text>
        </HStack>
        <HStack borderTopWidth="1" borderColor="#fcfcfc" p="2" px="4">
          <Text width="50%" fontSize="lg" fontWeight="bold">Agency:</Text>
          <Text fontSize="lg">{user.dataUser?.agencyName}</Text>
        </HStack>
        <HStack borderTopWidth="1" borderColor="#fcfcfc" p="2" px="4">
          <Text width="50%" fontSize="lg" fontWeight="bold">Sub Division:</Text>
          <Text fontSize="lg">{user.dataUser?.subDiv}</Text>
        </HStack>
      </Box>
      <Box>
          <Pressable p="2" shadow="2" mt="4" m="4" bg="error.700" borderRadius={15}
                onPress={() => {
                  showAlert()
                }}
            >
                <Text alignSelf="center" fontSize="20" color="#fff">{"Logout"}</Text>
          </Pressable>
      </Box>
      <Text color="#666666" textAlign='center'>App Version: {appVersion}</Text>
    </Box>
  )
}

export default UserProfile