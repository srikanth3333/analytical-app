import * as React from "react";
import {ImageBackground, Pressable,Image} from 'react-native';
import { Box, Text, Heading, VStack, FormControl, Input, CheckIcon, Button, HStack, Center, ScrollView, Select } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { getHierarchy } from "../../redux/auth/loginSlice";
import axios from "axios";
import MultiSelect from "../../components/multiSelect/MultiSelect";

const Login = ({navigation}) => {

    const [formData, setData] = React.useState({
        subDiv:'',
        section:'',
        area:'',
        mrid:'',
        agency: '',
        boardCode: ''
    });
    const [errors, setErrors] = React.useState({});
    const [mrids, setMrids] = React.useState([]);
    let dispatch = useDispatch()
    let user = useSelector(state => state.auth)


    React.useEffect(() => {
        dispatch(getHierarchy({
            subDiv:'',
            section:'',
            area:'',
            mrid:'',
            agency:'',
            boardCode: ''
          }))
    },[])


    const handleSubmit = async () => {
        console.log(formData)
        if(!formData.name || !formData.mobileNo 
            || !formData.agency || !formData.subDiv
            || !formData.boardCode || mrids.length == 0) {
                alert("Below fields cannot be empty")
                return;
        }
        
        let body = {
            "boardCode": formData.boardCode,
            "mobileNo": formData.mobileNo,
            "name": formData.name,
            "agency": formData.agency,
            "subDiv": formData.subDiv,
            "div": "",
            "mridList": JSON.stringify(mrids)   
        }
        // console.log(body)
        // return;
        await axios.post(`https://mr.bharatsmr.com/supervisor/${formData.boardCode}/signUp`, body , {
            headers: {
                authkey: user.dataUser?.mobileNo
            }
        })
        .then(response => {
            console.log(response.data)
            alert(response.data.message + ' Please login after approval' + "failed list" + JSON.stringify(response.data.failedMridList))
        })  
        .catch(err => {
            alert("Something went wrong try again later")
        })
    }


  return (
    <ScrollView style={{flex:1,width:'100%',marginVertical:20}} showsVerticalScrollIndicator={false}>
        <Center w="100%">
        <Box  safeArea px="8" bg="#fff" py="8" w="90%" borderRadius={10} maxW="350" shadow={2}>
            <Image 
                source={require("../../assets/login/logo.jpg")}
                resizeMode={"contain"}
                style={{height:80,alignSelf:'center',marginBottom:20}}
            />
            {/* <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
        }}>
            Welcome
            </Heading>
            <Heading mt="1" _dark={{
            color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
                Register to continue!
            </Heading> */}

            <VStack space={3} mt="5">
            <>
                <FormControl isRequired isInvalid={'name' in errors}>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input 
                        onChangeText={value => setData({ ...formData,
                            name: value
                        })}
                    />
                </FormControl>
                <FormControl isRequired isInvalid={'name' in errors}>
                    <FormControl.Label>Mobile Number</FormControl.Label>
                    <Input 
                        keyboardType="numeric"
                        placeholder="Enter mobile number"
                        maxLength={10}
                        onChangeText={value => setData({ ...formData,
                            mobileNo: value
                        })}
                    />
                </FormControl>
                    <FormControl.Label m="0" p="0">Boardcode</FormControl.Label>
                    <Select minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5" />
                                        }} 
                                        onValueChange={itemValue => {
                                            setData({ ...formData,
                                                boardCode: itemValue
                                            })
                                            dispatch(getHierarchy({
                                                subDiv:'',
                                                section:'',
                                                area:'',
                                                mrid:'',
                                                agency: '',
                                                boardCode: itemValue
                                            }))
                                            
                                        }}
                        
                    >
                            <Select.Item label={"Select None"} value={""} />
                            <Select.Item label={"SBPDCL"} value={"SBPDCL"} />
                            <Select.Item label={"NBPDCL"} value={"NBPDCL"} />
                    </Select>
                {/* <FormControl isRequired isInvalid={'name' in errors}> */}
                    <FormControl.Label m="0" p="0">Agency</FormControl.Label>
                    <Select minWidth="200" selectedValue={formData.agency} accessibilityLabel="Choose agency" placeholder="Choose agency" _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5" />
                                        }} 
                                        onValueChange={itemValue => {
                                            setData({ ...formData,
                                                agency: itemValue
                                            })
                                            dispatch(getHierarchy({
                                                subDiv: '',
                                                section:'',
                                                area:'',
                                                mrid:'',
                                                agency: itemValue, 
                                                boardCode: formData.boardCode
                                              }))
                                        }}
                        
                    >
                            <Select.Item label={"Select None"} value={""} />
                            {
                                user.hierarchyData && user.hierarchyData[0]?.agency.map((item) => (
                                    <Select.Item label={item} value={item} />
                                ))
                            }
                    </Select>
                {/* </FormControl> */}
                {/* <FormControl isRequired isInvalid={'name' in errors}> */}
                    <FormControl.Label m="0" p="0">Sub Division</FormControl.Label>
                    <Select minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                        }}  
                        onValueChange={itemValue => {
                            setData({ ...formData,
                                subDiv: itemValue
                            })
                            dispatch(getHierarchy({
                                subDiv: itemValue,
                                section:'',
                                area:'',
                                mrid:'',
                                agency: formData.agency, 
                                boardCode: formData.boardCode
                              }))
                            
                        }}
                        >
                            <Select.Item label={"Select None"} value={""} />
                            {
                                user.hierarchyData && user.hierarchyData[0]?.subDiv.map((item) => (
                                    <Select.Item label={item} value={item} />
                                ))
                            }
                    </Select>
                {/* </FormControl> */}
                {/* <FormControl isRequired isInvalid={'name' in errors}> */}
                    <FormControl.Label m="0" p="0">MRIDS</FormControl.Label>
                    {/* <Select minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                        }}  

                        onValueChange={itemValue => {
                            setData({ ...formData,
                                mrid: itemValue
                            })
                        }}
                        
                    >
                        <Select.Item label={"Select None"} value={""} />
                            {
                                user.hierarchyData && user.hierarchyData[0]?.mrid.map((item) => (
                                    <Select.Item label={item} value={item} />
                                ))
                            }
                    </Select> */}
                    <MultiSelect
                        mrData={user.hierarchyData && user.hierarchyData[0]?.mrid}
                        setMrids={setMrids}
                     />
                {/* </FormControl> */}
                <Button mt="2" onPress={handleSubmit}  colorScheme="indigo">
                    Sign in
                </Button>
            </>
            
            <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="coolGray.600" _dark={{
                color: "warmGray.200"
            }}>
                Already a user.{" "}
                </Text>
                <Pressable 
                    onPress={() => navigation.navigate("Login")}    
                >
                <Text 
                        color="indigo.500"
                        fontWeight="medium"
                        fontSize="sm" 
                    >Login</Text>
                </Pressable>
            </HStack>
            </VStack>
        </Box>
        </Center>
    </ScrollView> 
  )
};

export default ({navigation}) => {
    return (
        <ImageBackground
            source={require('../../assets/login/lg_bg.jpg')} // Replace with the path to your image
            style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <Center flex={1} px="3">
                <Login navigation={navigation} />
            </Center>
        </ImageBackground>
    );
};
    