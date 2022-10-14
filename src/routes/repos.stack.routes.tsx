import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ReposScreen } from '../pages/repos/ReposScreen';
import { FavoriteScreen } from '../pages/favorite/FavoriteScreen';
import { Settings } from '../components/settings';
import { DetailsScreen } from '../pages/details/DetailsScreen';

const { Navigator, Screen } = createStackNavigator();

export function ReposStackRoutes() {
  return (
    <Navigator
      initialRouteName='Repositórios'
    >
      <Screen name='Repositórios' component={ReposScreen} options={{ headerRight: () => <Settings/> }}/>
      <Screen name='Favoritos' component={FavoriteScreen} options={{ headerRight: () => <Settings/> }}/>
      <Screen 
        name='Detalhes' 
        component={DetailsScreen} 
        options={{ 
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: "#fff",
        }}
      />
    </Navigator>
  );
}