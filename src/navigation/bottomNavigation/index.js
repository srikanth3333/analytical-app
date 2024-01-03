import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import User from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import RlIcon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../../pages/HomeScreen';
import Notifications from '../../pages/Notifications';
import RealTime from '../../pages/realtime';
import Chat from '../../pages/Chat';
import Profile from '../../pages/Profile';
import Search from '../../pages/Search';
import UserProfile from '../../pages/UserProfile';

const Tab = createMaterialBottomTabNavigator();


const index = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            // activeColor="#e91e63"
            // barStyle={{ backgroundColor: 'tomato' }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Search"
                component={Search}
                options={{
                tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                tabBarLabel: 'Chat',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
             */}
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                tabBarLabel: 'Assigned MR`s',
                    tabBarIcon: ({ color }) => (
                        <User name="users" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="RealTime"
                component={RealTime}
                options={{
                tabBarLabel: 'Real Time',
                    tabBarIcon: ({ color }) => (
                        <RlIcon name="user-cog" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="UserProfile"
                component={UserProfile}
                options={{
                tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Icon name="user-circle-o" color={color} size={26} />
                    ),
                }}
            />

           
            
        </Tab.Navigator>
    )
}

export default index
