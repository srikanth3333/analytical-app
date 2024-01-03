import React from 'react'
import {
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    HStack,
    Stack,
    Pressable,
    VStack,Spinner,Select,
    CheckIcon,
    Button,
    useToast
  } from "native-base"
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal, View, TouchableOpacity, Linking, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome5';
import moment from "moment";
import axios from 'axios';
import { useSelector } from 'react-redux';


// Unmetered consumer
// Meter theft
// Duplicate consumer
// Untraceable consumer
// Mapping Issue / Consumer belong to different MRU
// Validation Issue


// Service wire not connected
// Periodically door lock 
// Manipulating by MR
// Consumer deny to generate bills
// Validation Issue



let UI = [
    {name:'Meter at height',value:"MAH"},
    {name:'Meter is internally dirty',value:"MIID"},
    {name:'Blank Display',value:"BD"},
    {name:'Display segment issue',value:"DSI"},
    {name:'Validation Issue',value:"VI"}
]

let IR = [
    {name:'Decimal not detected',value:"DND"},
    {name:'Display segment issue',value:"DSI"},
    {name:'Unclear Image',value:"UI"},
    {name:'Validation Issue',value:"VI"},
]

let IP = [
    {name:'Validation Issue',value:"VI"},
]


let SP = [
    {name:'Validation Issue',value:"VI"},
]

let II = [
    {name:'Non meter consumer',value:"NMC"},
    {name:'Validation Issue',value:"VI"}
]

const ReadingSummary = ({item, loading}, index) => {

    const [btnLoading,setLoading] = React.useState(false)
    const [zoomImg, setZoomImg] = React.useState(null);
    const [zoomer, setZoomer] = React.useState(false);  
    const [service, setService] = React.useState("");
    const [cardId, setCardId] = React.useState("");
    const [modifyId, setModifyId] = React.useState("");
    const [btnTxt, setBtnTxt] = React.useState("");
    let user = useSelector(state => state.auth);
    const toast = useToast();

    const CustomHeader = () => {
        return (
          <>
            <View style={{alignSelf: 'flex-end', marginTop: 15, marginRight: 15}}>
              <TouchableOpacity onPress={() => setZoomer(false)}>
                <Icon name="close" color="#fff" size={25} />
              </TouchableOpacity>
            </View>
          </>
        )
    }


    const handleModify = (_id) => {
        setModifyId(item._id)
        setBtnTxt("")
        setCardId("")
        return;
    }

    const handleValidateSubmit = (_id,analysisRemark,valueType) => {
        setLoading(true)
        let body = {
                "docId": item._id,
                "readingId":_id,
                "supApproved": false,
                "supRemark" : service,
                "agencyId": item.agencyId,
                "subDiv": item.subDiv,
                "sectionCode":item.sectionCode,
                "areaCode": item.areaCode,
                "mrid": item.mrid,
                "analysisRemark": analysisRemark,
                "valueType":valueType
        }

        axios.post(`https://mr.bharatsmr.com/supervisor/${user.dataUser?.boardCode}/saveRemarks`, body, {
            headers: {
                authkey: user.dataUser?.mobileNo
            }
        })
        .then(res => {
            
            toast.show({
                render: () => {
                  return <Box bg="emerald.500" px="4" py="2" rounded="sm" _text={{color:'#fff'}} mb={5}>
                          {res.data.message}
                        </Box>;
                }
            });
            
            setBtnTxt(_id)
            setLoading(false)
        })
        .catch(err => {
            toast.show({
                render: () => {
                  return <Box bg="error.700" px="4" py="2" rounded="sm" _text={{color:'#fff'}} mb={5}>
                          {"Not added remark something went wrong"}
                        </Box>;
                }
            });
            setBtnTxt("")
            setLoading(false)
        })
    }

    

    const handleSubmit = () => {
        setCardId(item._id)
        return;
    }

    const handleFormSubmit = (_id,analysisRemark,valueType) => {
        setLoading(true)
        setService('')
        let body = {
            "docId": item._id,
            "readingId":_id,
            "supApproved": true,
            "supRemark" : service,
            "agencyId": item.agencyId,
            "subDiv": item.subDiv,
            "sectionCode":item.sectionCode,
            "areaCode": item.areaCode,
            "mrid": item.mrid,
            "analysisRemark": analysisRemark,
            "valueType":valueType
        }

        axios.post(`https://mr.bharatsmr.com/supervisor/${user.dataUser?.boardCode}/saveRemarks`, body, {
            headers: {
                authKey: user.dataUser?.mobileNo
            }
        })
        .then(res => {
            
            toast.show({
                render: () => {
                  return <Box bg="emerald.500" px="4" py="2" rounded="sm" _text={{color:'#fff'}} mb={5}>
                          {res.data.message}
                        </Box>;
                }
            });
            setBtnTxt(_id)
            setLoading(false)
        })
        .catch(err => {
            toast.show({
                render: () => {
                  return <Box bg="error.700" px="4" py="2" rounded="sm" _text={{color:'#fff'}} mb={5}>
                          {"Not added remark something went wrong."}
                        </Box>;
                }
            });
            setBtnTxt("")
            setLoading(false)
        })
    }


    const ValidateBox = ({_id,data,analysisRemark,valueType}) => {
        return (
            <>
                {
                    btnTxt ==  _id ?
                        <>
                            { item.vsc === 4  || item.vsc === 3 ? null : <Text fontWeight={"bold"} pt="1">Supervisor Remark To Update: {!service ? "Accepted" : user.remarks[service]}</Text> } 
                            <Button onPress={() => handleModify(_id)} alignSelf={"center"} mx="5" width="45%" mt="3">Modify</Button> 
                        </>
                    : item._id == cardId ?
                        <>
                            <Pressable maxW="100%">
                                <Select selectedValue={service} minWidth="200" accessibilityLabel="Select exception" placeholder="Select exception" _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                    {
                                        data.map((item, index) => (
                                            <Select.Item key={index} label={item.name} value={item.value} />
                                        ))
                                    }
                                </Select>
                                <Button mt="2" 
                                    leftIcon={<IonIcon name={btnTxt == _id ? "checkmark-done" : "add-circle-sharp"} color="#fff" size={25} />}
                                    bg={btnTxt == _id ? "green.500" : "blue.500"} 
                                    // disabled={btnTxt == _id ? true : false}
                                    isLoading={btnLoading}
                                    onPress={() => handleValidateSubmit(_id,analysisRemark,valueType)}>Submit Remark</Button>
                            </Pressable>
                        </>
                    :
                        <HStack justifyContent={"space-evenly"} mt="3">
                                <Button width="45%" 
                                    leftIcon={<IonIcon name={btnTxt == _id ? "checkmark-done" : "add-circle-sharp"} color="#fff" size={25} />}
                                    bg={btnTxt == _id ? "green.500" : "blue.500"} 
                                    // disabled={btnTxt == _id ? true : false}
                                    isLoading={btnLoading}
                                    onPress={() => handleFormSubmit(_id,analysisRemark,valueType)}>Accepted</Button>
                                <Button width="45%" 
                                    // disabled={btnTxt == _id ? true : false}
                                    onPress={() => handleSubmit(_id,analysisRemark,valueType)}>To Be Corrected</Button>
                        </HStack>
                }
            </>                                  
        )
    }
    

    if(loading) {
        return (
            <VStack space={2} alignItems="center" justifyContent="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" fontSize="md">
                    Fetching Summary Data
                </Heading>
            </VStack>
        )
    }

    return (
        <Box alignItems="center">
                <Box
                    bg={`#fff`}
                    my="3"
                    maxW="90%"
                    shadow={3}
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1"
                >

                    <Modal visible={zoomer}   transparent={true}>
                        <ImageViewer  enableSwipeDown={true} renderHeader={() => <CustomHeader />} onRequestClose={() => setZoomer(false)} onSwipeDown={() => setZoomer(false)} onCancel={() => setZoomer(false)} imageUrls={[
                                {
                                    url: zoomImg,
                                }
                            ]}
                        />
                    </Modal>
                    <Box>
                        {
                            item.photoUrl
                            ?
                                <Pressable 
                                    onPress={() => {
                                        setZoomImg(item.photoUrl)
                                        setZoomer(true)
                                    }}
                                >
                                    <AspectRatio my="2" w="100%" ratio={16 / 9}>
                                        <Image
                                            source={{
                                                uri: item.photoUrl,
                                            }}
                                            alt="image"
                                        />
                                    </AspectRatio>
                                </Pressable>
                            :
                            null
                        }
                        {
                            item.readings != null
                            ?
                                Object.entries(item.readings).map(([key,value],index) => {
                                    if(key == 'KWH' || key == "KVAH") {
                                        return (
                                            <>
                                                <Pressable 
                                                    onPress={() => {
                                                        setZoomImg(value.bigImg)
                                                        setZoomer(true)
                                                    }}
                                                >
                                                    <AspectRatio my="2" w="100%" ratio={16 / 9}>
                                                        <Image
                                                            source={{
                                                                uri: value.smallImg,
                                                            }}
                                                            alt="image"
                                                        />
                                                    </AspectRatio>
                                                </Pressable>
                                                <HStack alignItems="center" justifyContent="space-between">
                                                    <Heading ml="4" size="md">{value.actualValue ? value.actualValue : value.scanValue} {key}</Heading>
                                                    <Text mr="2">{moment(item.readingDate).format('MMMM Do YYYY')}</Text>
                                                </HStack>
                                                <HStack alignItems="center" justifyContent="space-between">
                                                    <Heading ml="4" size="md">{value.analysisRemark}</Heading>
                                                    <Text mr="2">{moment(item.readingDate).format('h:mm:ss a')}</Text>
                                                </HStack>
                                                
                                                {
                                                    item.vsc == 4
                                                    ? 
                                                        <>
                                                            <Text fontWeight={"bold"} px="3" pt="1">Supervisor Remark: {'Accepted'}</Text> 
                                                            {
                                                                modifyId == item._id ?
                                                                <Box px="5">
                                                                    {
                                                                        value.analysisRemark == "Unclear Image" ?
                                                                            <ValidateBox _id={value._id} data={UI} analysisRemark={value.analysisRemark} valueType={value.valueType} index={index}  />
                                                                        : value.analysisRemark == "Incorrect Reading" ?
                                                                            <ValidateBox _id={value._id} data={IR} analysisRemark={value.analysisRemark} valueType={value.valueType} index={index} />
                                                                        : value.analysisRemark == "Incorrect Parameter" ?
                                                                            <ValidateBox _id={value._id} data={IP} analysisRemark={value.analysisRemark} valueType={value.valueType} index={index} /> 
                                                                        : value.analysisRemark == "Spoof" ?
                                                                            <ValidateBox _id={value._id} data={SP} analysisRemark={value.analysisRemark} valueType={value.valueType} index={index} />  
                                                                        : value.analysisRemark == "Invalid Image" ?
                                                                            <ValidateBox _id={value._id} data={II} analysisRemark={value.analysisRemark} valueType={value.valueType}  index={index} />  
                                                                        : null
                                                                    }
                                                                </Box> : <Button onPress={handleModify} alignSelf={"center"} mx="5" width="45%" mt="1">Modify</Button> 
                                                            }
                                                        </>
                                                    : item.vsc == 3 ||  item.vsc == 6 ?
                                                        <>
                                                            <Text fontWeight={"bold"} px="3" pt="1">Supervisor Remark: {user.remarks[item.supRemark]}</Text> 
                                                            {
                                                                modifyId == item._id ?
                                                                <Box px="5">
                                                                    {
                                                                        value.analysisRemark == "Unclear Image" ?
                                                                            <ValidateBox _id={value._id} data={UI} analysisRemark={value.analysisRemark} valueType={value.valueType} index={index}  />
                                                                        : value.analysisRemark == "Incorrect Reading" ?
                                                                            <ValidateBox _id={value._id} data={IR} analysisRemark={value.analysisRemark} valueType={value.valueType} index={index} />
                                                                        : value.analysisRemark == "Incorrect Parameter" ?
                                                                            <ValidateBox _id={value._id} data={IP} analysisRemark={value.analysisRemark} valueType={value.valueType} index={index} /> 
                                                                        : value.analysisRemark == "Spoof" ?
                                                                            <ValidateBox _id={value._id} data={SP} analysisRemark={value.analysisRemark} valueType={value.valueType} index={index} />  
                                                                        : value.analysisRemark == "Invalid Image" ?
                                                                            <ValidateBox _id={value._id} data={II} analysisRemark={value.analysisRemark} valueType={value.valueType}  index={index} />  
                                                                        : null
                                                                    }
                                                                </Box> : <Button onPress={handleModify} alignSelf={"center"} mx="5" width="45%" mt="1">Modify</Button> 
                                                            }
                                                        </>
                                                    : item.vsc == 5 ? 
                                                        <Text>Reported and Verified  {!item.supRemark ? "" : `Supervisor Remark : ${item.supRemark}`}</Text> 
                                                    :
                                                        <Box px="5">
                                                            {
                                                                value.analysisRemark == "Unclear Image" ?
                                                                    <ValidateBox _id={value._id} data={UI} analysisRemark={value.analysisRemark} valueType={value.valueType} index={index}  />
                                                                : value.analysisRemark == "Incorrect Reading" ?
                                                                    <ValidateBox _id={value._id} data={IR} analysisRemark={value.analysisRemark} valueType={value.valueType} index={index} />
                                                                : value.analysisRemark == "Incorrect Parameter" ?
                                                                    <ValidateBox _id={value._id} data={IP} analysisRemark={value.analysisRemark} valueType={value.valueType} index={index} /> 
                                                                : value.analysisRemark == "Spoof" ?
                                                                    <ValidateBox _id={value._id} data={SP} analysisRemark={value.analysisRemark} valueType={value.valueType} index={index} />  
                                                                : value.analysisRemark == "Invalid Image" ?
                                                                    <ValidateBox _id={value._id} data={II} analysisRemark={value.analysisRemark} valueType={value.valueType}  index={index} />  
                                                                : null
                                                            }
                                                        </Box>
                                                }

                                                    
                                                
                                            </>
                                        )
                                    }
                                })
                            :
                            null
                        }
                    </Box>
                    <HStack justifyContent="space-between" px="4" mt="2" pb="2">
                            <View>
                                <Text fontWeight="400">
                                    Account Number: {item.uidNo}
                                </Text>
                                <Text fontWeight="400">
                                    Serial No: {item.serialNo}
                                </Text>
                            </View>
                            <Pressable bg={"muted.200"} p="3" borderRadius={8} onPress={() => Linking.openURL(`geo:${item.lat},${item.lon}`)}>
                                <MaterialCommunityIcons name="map-marker-alt" color={"green"} size={30} />
                            </Pressable>
                    </HStack>
                </Box>
        </Box>
    )
}

export default ReadingSummary
