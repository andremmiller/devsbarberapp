import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// import CustomTabBar from '../'

import Home from '../screens/Home'
import Search from '../screens/Search'
import Appointments from '../screens/Appointments'
import Favourites from '../screens/Favourites'
import Profile from '../screens/Profile'
import CustomTabBar from '../components/CustomTabBar'


const Tab = createBottomTabNavigator()

export default () => (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Appointments" component={Appointments} />
        <Tab.Screen name="Favourites" component={Favourites} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
)

