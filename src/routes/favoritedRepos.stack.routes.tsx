import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FavoriteScreen } from '../pages/favorite/FavoriteScreen';
import { Settings } from '../components/settings';
import { DetailsScreen } from '../pages/details/DetailsScreen';
import { IRepo } from '../interfaces/IRepo';

export type FavoritedReposStackParamList = {
  "Repositórios": undefined,
  "Detalhes": { 
    repo: IRepo,
    isFavorited: boolean
  };
};

const { Navigator, Screen } = createStackNavigator<FavoritedReposStackParamList>();

export function FavoritedReposStackRoutes() {
  return (
    <Navigator
      initialRouteName='Repositórios'
    >
      <Screen name='Repositórios' component={FavoriteScreen} options={{ headerRight: () => <Settings/> }}/>
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