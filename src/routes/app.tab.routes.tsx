import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoriteScreen } from '../pages/favorite/FavoriteScreen';
import { ReposScreen } from '../pages/repos/ReposScreen';
import { FontAwesome } from '@expo/vector-icons'; 
import { Text } from 'react-native';
import { Settings } from '../components/settings';
import { ReposStackRoutes } from './repos.stack.routes';
import { FavoritedReposStackRoutes } from './favoritedRepos.stack.routes';

const Tab = createBottomTabNavigator();

export default function AppTabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'FavoriteScreen') {
            return <FontAwesome name="star" size={24} color={focused ? "#1976D2" : "rgba(0, 0, 0, 0.6)"} />;
          } else if (route.name === 'ReposScreen') {
            return <FontAwesome name="github" size={24} color={focused ? "#1976D2" : "rgba(0, 0, 0, 0.6)"} />;
          }
        },
        headerShown: false,
        tabBarActiveTintColor: '#1976D2',
        tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.6)',
      })}
    >
      <Tab.Screen name="ReposScreen" component={ReposStackRoutes} options={{ tabBarLabel: "Repositórios" }}/>
      <Tab.Screen name="FavoriteScreen" component={FavoritedReposStackRoutes} options={{ tabBarLabel: "Favoritos" }}/>
    </Tab.Navigator>
  );
}