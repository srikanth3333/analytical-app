import { View } from 'react-native'
import React from 'react'
import axios from 'axios'
import moment from 'moment';
import { useSelector } from 'react-redux';
import {VStack,
    FormControl,
    Button,Input,Box,Text} from'native-base';

const index = () => {

    const [data,setRespData] =  React.useState(null)
    const [btnLoading,setBtnLoading] = React.useState(false)
    const [consumerId,setConsumerId] =  React.useState('')
    let user = useSelector(state => state.auth)
    const [formData, setData] = React.useState({
                                                subDiv:'',
                                                sectionCode:'',
                                                areaCode:''
                                            });
    const [errors, setErrors] = React.useState({});

    const validate = () => {
        if (formData.subDiv === undefined || formData.sectionCode === undefined || formData.areaCode === undefined)  {
            setErrors({ ...errors,
                subDiv: 'Name is required',
                sectionCode: 'sectionCode is required',
                areaCode: 'areaCode is required',
            });
            return false;
        }

        return true;
    };

    const onSubmit = () => {
        validate() ? console.log('Submitted') : console.log('Validation Failed');
    };

    const getSummary =  async () => {
        setBtnLoading(true)
        await axios.get(`https://mr.bharatsmr.com/dashboard/readingSummary?uidNo=${consumerId}&isJson=true&filter=&boardCode=${user?.dataUser?.boardCode}&page=0`)
        .then(res => {
            console.log(res)
            setRespData(res.data.mSummaryData && res.data.mSummaryData[0])
            let data = res.data.mSummaryData && res.data.mSummaryData[0]
            setData({
                "subDiv":data.subDiv,
                "sectionCode":data.sectionCode,
                "areaCode":data.areaCode
            })
            setBtnLoading(false)
        })
        .catch(err => {
            console.log(JSON.stringify(err))
            setBtnLoading(false)
            // alert("Something went wrong")
        })
    }

    

  return (
    <View>
      <Box mx="3" mt="4">
        <FormControl.Label _text={{
                        bold: true
                    }}>Enter Consumer ID</FormControl.Label>
        <Input  placeholder="Enter Consumer ID" onChangeText={(value) => setConsumerId(value)} />
            <Button onPress={getSummary} mt="5" colorScheme="cyan">
                Submit
            </Button>
      </Box>
      {
        !data ? <Box mx="4" mt="4"><Text textAlign="center">No Data please select consumer</Text></Box> : btnLoading ? <Text>Loading...</Text> :
        <VStack width="90%" mx="3" maxW="100%">
            <FormControl isRequired isInvalid={'name' in errors}>
                <FormControl.Label _text={{
                    bold: true
                }}>Sub Division</FormControl.Label>
                    <Input defaultValue={formData.subDiv} placeholder="John" onChangeText={value => setData({ ...formData,
                            subDiv: value
                        })} />
                {'subDiv' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
                    Sub Division should contain atleast 3 character.
                </FormControl.HelperText>}
                <FormControl.Label _text={{
                    bold: true
                }}>Section</FormControl.Label>
                    <Input defaultValue={formData.sectionCode} placeholder="John" onChangeText={value => setData({ ...formData,
                    sectionCode: value
                })} />
                {'sectionCode' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
                Section should contain atleast 3 character.
                </FormControl.HelperText>}
                <FormControl.Label _text={{
                    bold: true
                }}>Area</FormControl.Label>
                    <Input defaultValue={formData.areaCode} placeholder="John" onChangeText={value => setData({ ...formData,
                    areaCode: value
                })} />
                {'areaCode' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
                    Area should contain atleast 3 character.
                </FormControl.HelperText>}
            </FormControl>
            <Button onPress={onSubmit} mt="5" colorScheme="cyan">
                Save Data
            </Button>
        </VStack>
      }
      
    </View>
  )
}

export default index