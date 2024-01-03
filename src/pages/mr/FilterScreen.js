import { View } from 'react-native'
import React from 'react'
import {Modal,Box, Button, HStack, Input, Pressable,Center,FormControl,Text} from 'native-base';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const FilterScreen = ({navigation,route}) => {

    const [formData, setFormData] = React.useState({uidNo:'',startDate:'',endDate:''});
    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)
    const [date2, setDate2] = React.useState(new Date())
    const [open2, setOpen2] = React.useState(false)

    React.useEffect(() => {
        navigation.setOptions({title: route.params?.mrid})
    },[])


    const handleForm = () => {
        setMData([])
        mData.length = 0;
        setCurrentPage(1);
        getSummary()
    }

    const handleClear = () => {
        setFormData({uidNo:''})
        setCurrentPage(1);
        getSummary()
    }


  return (
    <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
        <Box py="4" px="4">
                <Input bg="#fefefe" value={formData.uidNo} placeholder="Enter UID No or Mobile No" 
                    onChangeText={value => setFormData({ ...formData,
                        uidNo: value
                    })}
                />
                <HStack justifyContent={"space-evenly"} pt="3">
                    <Box width="45%">
                        <Pressable bg="#ccc" p="2" onPress={() => setOpen(true)}>
                            <Text textAlign="center">{!formData.startDate ? 'Select Start Date' : moment(formData.startDate).format("YYYY-MM-DD")}</Text>
                        </Pressable>
                        <DatePicker
                            modal={true}
                            open={open}
                            date={date}
                            mode="date"
                            onConfirm={(date) => {
                                setOpen(false)
                                setFormData({ ...formData,
                                    startDate: date
                                })
                            }}
                            onCancel={() => {
                                setOpen(false)  
                            }}
                        />
                    </Box>
                    <Box width="45%">
                        <Pressable bg="#ccc" p="2" onPress={() => setOpen2(true)}>
                            <Text textAlign="center">{!formData.endDate ? 'Select End Date' : moment(formData.endDate).format("YYYY-MM-DD")}</Text>
                        </Pressable>
                        <DatePicker
                            modal={true}
                            open={open2}
                            date={date2}
                            mode="date"
                            onConfirm={(date) => {
                                setOpen2(false)
                                setFormData({ ...formData,
                                    endDate: date
                                })
                            }}
                            onCancel={() => {
                                setOpen2(false)  
                            }}
                        />
                    </Box>
                </HStack>
                <HStack space={2} justifyContent={"space-between"}>
                    <Button onPress={handleClear} mt="2" bg="error.600" width="50%" color="#fff">
                        <Text>Clear</Text>
                    </Button>
                    <Button onPress={handleForm} mt="2" width="50%" color="#fff">
                        <Text>Submit</Text>
                    </Button>
                </HStack>
        </Box>
    </View>
  )
}

export default FilterScreen