import { Button, HStack } from '@react-native-material/core';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Linking, RefreshControl, Text, View } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FavoritedReposStackParamList } from '../../routes/favoritedRepos.stack.routes';
import { getItemOfAsyncStorage, setItemOnAsyncStorage } from '../../helpers/asyncStorage';
import { IRepo } from '../../interfaces/IRepo';

type Props = NativeStackScreenProps<FavoritedReposStackParamList, 'Detalhes'>;

function DetailsScreen({ route, navigation }: Props) {
  const { repo } = route.params;
  const [isFavorited, setIsFavorited] = useState(route.params.isFavorited)
  const [username, reponame] = repo.full_name.split("/")

  const openRepository = async (url: string) => {
    await Linking.openURL(url)
  } 

  const handleFavorite = async () => {
    const favoritedRepos = await getItemOfAsyncStorage("repositories") ?? []
    const repos: Array<IRepo> = [...favoritedRepos]

    repos.push(repo)

    await setItemOnAsyncStorage("repositories", repos)
    setIsFavorited(true)
  } 

  const handleRemoveOfFavorite = async () => {
    const favoritedRepos = await getItemOfAsyncStorage("repositories") as Array<IRepo> ?? []

    const index = favoritedRepos.findIndex(rep => rep.id === repo.id)
    if(index > -1) {
      const repos = favoritedRepos.slice(0, index)
      await setItemOnAsyncStorage("repositories", repos)
      setIsFavorited(false)
    }
  } 

  const handlePress = () => {
    if(isFavorited) {
      handleRemoveOfFavorite()
    }
    else {
      handleFavorite()
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5", justifyContent: "space-between" }}>
      <StatusBar style="light" />
      <View style={{ padding: 16, backgroundColor: "#fff" }}>
        <HStack style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: "400", fontSize: 20, lineHeight: 24, color: "#070707" }}>
            {username}/
            <Text style={{ fontWeight: "700", fontSize: 20, lineHeight: 24, color: "#070707" }}>
              {reponame}
            </Text>
          </Text>
        </HStack>

        <Text style={{ color: "#9A9A9A", fontSize: 16, }}>{repo.description ?? "Sem descrição"}</Text>

        <HStack items='center' style={{ marginTop: 16 }}>
          <FontAwesome name="circle" size={10} color="red" />
          <Text style={{ marginLeft: 6, color: "#9A9A9A", fontSize: 12 }}>{repo.language ?? "Indefinido"}</Text>
        </HStack>
      </View>
      <View style={{ padding: 16, backgroundColor: "#fff" }}>
        <Button
          color='#FAF3DC'
          title="Ver repositório"
          variant='text'
          style={{
            height: 36,
            borderRadius: 4,
            marginBottom: 8
          }}
          onPress={() => openRepository(repo.html_url)}
          titleStyle={{ fontWeight: "700", color: "#1976D2" }}
          trailing={props => <MaterialCommunityIcons name="link" {...props} color="#1976D2" />}
        />

        <Button
            color={isFavorited ? "#fff" : "#FFD02C"}
            title={isFavorited ? "Desfavoritar" : "Favoritar"}
            style={{
              height: 36,
              borderRadius: 4,
            }}
            variant={isFavorited ? "outlined" : "contained"}
            disableElevation={isFavorited}
            onPress={handlePress}
            titleStyle={{ fontWeight: "700", color: "#000" }}
            trailing={props => <FontAwesome name={isFavorited ? "star-o" : "star"} {...props} color="#000" />}
          />
      </View>
    </View>
  );
}

export { DetailsScreen }