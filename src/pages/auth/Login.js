import * as React from "react";
import {ImageBackground,Image} from 'react-native';
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider, Pressable } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {getUser,verifyOtp,sendOtp} from "../../redux/auth/loginSlice";

const Login = ({navigation}) => {

    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    let dispatch = useDispatch()
    let user = useSelector(state => state.auth)

    

    const handleForm = (e) => {
        if(!formData.mobileNo) {
            alert('mobile number cannot be empty')
            return;
        }
        dispatch(getUser({mobileNo:formData.mobileNo}))
        .then(res => {
            console.log(user)
        })
    }


    const handleOtp = (e) => {
        if(!formData.otp) {
            alert('OTP cannot be empty')
            return;
        }
        dispatch(verifyOtp({mobileNo:formData.mobileNo,otp:formData.otp}))
    }


  return <Center w="100%">
      <Box  safeArea px="8" bg="#fff" py="8" w="90%" borderRadius={10} maxW="350" shadow={2}>
        <Image 
            source={require("../../assets/login/logo.jpg")}
            resizeMode={"contain"}
            style={{height:80,alignSelf:'center'}}
        />
        {/* <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
            color: "warmGray.50"
      }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading> */}

        <VStack space={3} mt="5">
            {
                user.otpView == false ? 
                <>
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
                    <Button mt="2" onPress={handleForm}  colorScheme="indigo">
                        Sign in
                    </Button>
                </>
                : 
                <>
                    <FormControl isRequired isInvalid={'name' in errors}>
                        <FormControl.Label>Enter OTP</FormControl.Label>
                        <Input 
                            keyboardType="numeric"
                            placeholder="Enter OTP"
                            maxLength={4}
                            onChangeText={value => setData({ ...formData,
                                otp: value
                            })}
                        />
                    </FormControl>
                    <Button mt="2" onPress={handleOtp}  colorScheme="indigo">
                        Enter OTP
                    </Button>
                </>
            }
          
          
          
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              I'm a new user.{" "}
            </Text>
            <Pressable  onPress={() => navigation.navigate("Register")}>
              <Text
                color= "indigo.500"
                fontWeight= "medium"
                fontSize= "sm"
              >Sign Up</Text>
            </Pressable>
          </HStack>
        </VStack>
      </Box>
    </Center>;
};

export default ({navigation}) => {
    return (
        <ImageBackground
            source={require('../../assets/login/lg_bg.jpg')} // Replace with the path to your image
            style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <Center flex={1} px="3">
                <Login navigation={navigation}/>
            </Center>
        </ImageBackground>
    );
};
    