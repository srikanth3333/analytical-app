import { View } from 'react-native'
import React from 'react'
import { Center } from 'native-base'
import Icon from 'react-native-vector-icons/Entypo';
import {Text} from 'native-base'

const EmpData = () => {
  return (
    <Center flex="1">
        <Icon name="folder" size={65} />
        <Text fontSize="xl">No Data Found</Text>
    </Center>
  )
}

export default EmpData