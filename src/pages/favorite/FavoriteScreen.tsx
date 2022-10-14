import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import RepoCard from '../../components/cards/RepoCard';
import EmptyListMessage from '../../components/misc/EmptyListMessage';
import { getItemOfAsyncStorage } from '../../helpers/asyncStorage';
import { IRepo } from '../../interfaces/IRepo';

function FavoriteScreen() {
  const [repositories, setRepositories] = useState<Array<IRepo>>([])
  const [isLoading, setIsLoading] = useState(false)

  const getFavoritedRepos = useCallback(async () => {
    setIsLoading(true)
    const repos = await getItemOfAsyncStorage("repositories") ?? []
    setRepositories(repos)
    setIsLoading(false)
  }, [])

  useFocusEffect(
    useCallback(() => {
      getFavoritedRepos()
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5", paddingHorizontal: 16 }}>
      <FlatList
        style={{ paddingTop: 16 }}
        contentContainerStyle={{
          paddingBottom: 16
        }}
        data={repositories}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getFavoritedRepos}/>}
        renderItem={({ item }) => <RepoCard isFavorited showFavoriteButton={false} repo={item}/>}
        ListEmptyComponent={<EmptyListMessage message="Sem repos favoritados"/>}
      />
    </View>
  );
}

export { FavoriteScreen }