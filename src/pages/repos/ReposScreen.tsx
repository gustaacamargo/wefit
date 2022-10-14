import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, RefreshControl, View } from 'react-native';
import RepoCard from '../../components/cards/RepoCard';
import EmptyListMessage from '../../components/misc/EmptyListMessage';
import { getItemOfAsyncStorage } from '../../helpers/asyncStorage';
import { useBottomModal } from '../../hooks/useBottomModal';
import { IRepo } from '../../interfaces/IRepo';

function ReposScreen() {
  const { visible } = useBottomModal();
  const [repositories, setRepositories] = useState<Array<IRepo>>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchRepos = useCallback(async () => {
    if(isLoading) return
    const username = await getItemOfAsyncStorage("username")
    if(!username) return

    setIsLoading(true)
    const favoritedRepos = await getItemOfAsyncStorage("repositories") ?? []

    axios.get(`https://api.github.com/users/${username}/repos`)
    .then(res => {
      const idsOfFavoritedRepos: Array<string> = favoritedRepos.map(({ id }: IRepo) => { return String(id) })

      const repos = res.data.filter(({ id}: IRepo) => !idsOfFavoritedRepos.includes(String(id)))
        .map((repo: IRepo) => {
          return {
            id: repo.id,
            full_name: repo.full_name,
            description: repo.description,
            owner: {
              avatar_url: repo.owner.avatar_url
            },
            stargazers_count: repo.stargazers_count,
            language: repo.language,
            html_url: repo.html_url
          }
        });

      setRepositories(repos)
    })
    .catch(err => {
      Alert.alert("Erro", `Ocorreu um erro ao buscar os repositórios do usuário '${username}'`)
    })
    .finally(() => setIsLoading(false))
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchRepos()
    }, [visible])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5", paddingHorizontal: 16 }}>
      <FlatList
        style={{ paddingTop: 16 }}
        contentContainerStyle={{
          paddingBottom: 16
        }}
        data={repositories}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchRepos}/>}
        renderItem={({ item }) => <RepoCard repo={item} updateList={fetchRepos}/>}
        ListEmptyComponent={<EmptyListMessage message="Nenhum repo encontrado"/>}
      />
    </View>
  );
}

export { ReposScreen }