import React, { useEffect, useState,useRef } from 'react';
import { Text, View ,Button,Image} from 'react-native';
import { Camera, useCameraDevice,useCameraDevices } from 'react-native-vision-camera';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform, PermissionsAndroid } from 'react-native';
import { useSelector } from 'react-redux';


const Attandance = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const device = useCameraDevice('front'); // Set the initial camera device
  const camera = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  let user = useSelector(state => state.auth)


  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    const result = await request(
      Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
    setLocationPermission(result);
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  console.log(user.dataUser)
  console.log(locationPermission)


  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    // const result = await request(PERMISSIONS.IOS.CAMERA);
    console.log('status',status);
    
    if (status === 'granted') {
      setCameraPermission(true);
    } else if (status === 'notDetermined') {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission === 'authorized');
    } else {
      setCameraPermission(false);
    }
  };

  useEffect(() => {
    requestLocationPermission()
    checkCameraPermission();
    getLocation();
  }, []);

  if (cameraPermission === null) {
    return <Text>Checking camera permission...</Text>;
  } else if (!cameraPermission) {
    return <Text>Camera permission not granted</Text>;
  }

  if (!device) {
    return <Text>No camera device available</Text>;
  }

  const takePhoto = async () => {
    try {
      if (!camera.current) {
        console.error('Camera reference not available.', camera);
        return;
      }

      const photo = await camera.current.takePhoto();
      console.log('photo',photo);
      getLocation()
      if (photo) {
        setCapturedPhoto(`file://${photo.path}`);
        setShowPreview(true);
      } else {
        console.error('Photo captured is undefined or empty.');
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const confirmPhoto = () => {
    console.log('Photo confirmed:', capturedPhoto);
    setShowPreview(false); 
  };

  const retakePhoto = () => {
    setCapturedPhoto(null); 
    setShowPreview(false);
  };

  const onCameraReady = (ref) => {
    camera.current = ref;
  };

  return (
    <View style={{ flex: 1 }}>
       {showPreview && capturedPhoto ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: capturedPhoto }} 
            style={{ width: 300, height: 300, marginBottom: 20 }}
          />
          {location ? <Text style={{color:'black'}}>latitude: {location.latitude}, Longitude: {location.longitude}</Text> : null}
          <Text style={{color:'black'}}>Date & Tme:  {moment(new Date()).format("DD-MM-YYYY hh:mm A")}</Text>
          <Text style={{color:'black'}}>Supervisor Name: {user?.dataUser?.name}</Text>
          <Text style={{color:'black'}}>Agency Name: {user?.dataUser?.agency}</Text>
          <Text style={{color:'black'}}>Div / Sub div: {user?.dataUser?.subDiv}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Retake" onPress={retakePhoto} style={{marginRight:15}} />
            <Button title="Confirm" onPress={confirmPhoto} />
          </View>
        </View>
      ) : (
        <>
          <Camera
            style={{ height:400}}
            device={device}
            isActive={true}
            ref={(ref) => onCameraReady(ref)} 
            photo={true}
            video={true}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop:20}}>
              <Button title="Take Photo" onPress={takePhoto} />
          </View>
        </>
      )}
      
    </View>
  );
};

export default Attandance;
