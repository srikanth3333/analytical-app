import React from 'react';
import {Pressable,HStack,} from 'native-base';
import {Linking} from 'react-native';
import MultiTabs from '../../components/multiTabs/MultiTabs';
import CallIcon from 'react-native-vector-icons/Feather';
import WhatsappIcon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const Detail = (props) => {

    let mr = useSelector(state => state.supervisorList);
    let outputArray = [...mr.data.active, ...mr.data.blocked, ...mr.data.inActive]
    let mrid = outputArray.filter((item) => item.mrid == props.route.params?.mrid)

    React.useEffect(() => {
        props.navigation.setOptions({title: props.route.params?.mrid, headerRight: () => (
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
    },[])
    

    const mrScreen = [
        { name: 'Ok', title: 'OK',remark:"Ok" },
        { name: 'LK', title: 'Door Look',remark:"LK" },
        { name: 'MD', title: 'Meter Defective',remark:"MD" },
        { name: 'WD', title: 'With Exceptions',remark:"WD" },
        { name: 'WOD', title: 'Without Exceptions',remark:"WOD" },
        { name: 'FI', title: 'Field Issues',remark:"FI" },
    ]
    const exceptionScreen = [
        { name: 'WD', title: 'With Exceptions',remark:"WD" },
        { name: 'FI', title: 'Field Issues',remark:"FI" },
    ]

    // let tabsData = 

    console.log(props.route.params.selectedTab)

  return (
    <>
        <MultiTabs 
            props={props}
            selectedTab={props.route.params.selectedTab}
            Tabs={props.route.params.page == "exceptionTab" ? exceptionScreen : mrScreen}
        />
    </>
  )
}

export default Detail