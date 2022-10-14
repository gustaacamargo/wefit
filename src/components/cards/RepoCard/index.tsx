import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Box, Button, Divider, HStack, TextInput } from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';
import { IRepo } from '../../../interfaces/IRepo';
import { getItemOfAsyncStorage, setItemOnAsyncStorage } from '../../../helpers/asyncStorage';
import { useNavigation } from '@react-navigation/core';

interface IProps {
  repo: IRepo, 
  showFavoriteButton?: boolean,
  updateList?: () => void,
  isFavorited?: boolean
}

const RepoCard = ({ repo, showFavoriteButton = true, updateList = () => {}, isFavorited = false }: IProps) => {
  const [username, reponame] = repo.full_name.split("/")
  const navigation = useNavigation();

  const handleFavorite = async (repo: IRepo) => {
    const favoritedRepos = await getItemOfAsyncStorage("repositories") ?? []
    const repos: Array<IRepo> = [...favoritedRepos]

    repos.push(repo)

    await setItemOnAsyncStorage("repositories", repos)
    updateList()
  } 

  const handleNavigate = () => {
    navigation.navigate("Detalhes", {
      repo,
      isFavorited
    })
  }

  return (
    <TouchableOpacity 
      onPress={() => handleNavigate()}
      key={`repo-${repo.id}`} 
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      }}
    >
      <HStack justify='between' items='center'>
        <HStack>
          <Text style={{ fontWeight: "400", fontSize: 12, lineHeight: 15, color: "#070707" }}>{username}/</Text>
          <Text style={{ fontWeight: "700", fontSize: 12, lineHeight: 15, color: "#070707" }}>{reponame}</Text>
        </HStack>
        <Avatar 
          style={{
            width: 29,
            height: 29
          }}
          imageStyle={{
            width: 29,
            height: 29
          }}
          icon={props => <FontAwesome name="user" {...props} />} 
          color="#ccc"
          image={{ uri: repo.owner.avatar_url }}
        />
      </HStack>

      <Divider style={{ marginVertical: 16 }} color="#DADADA" />

      <Text style={{ color: "#9A9A9A", fontSize: 12 }}>{repo.description ?? "Sem descrição"}</Text>

      <HStack mt={16} justify="between" items='center'>
          {showFavoriteButton && (
            <Button
              color='#FAF3DC'
              title="Favoritar"
              disableElevation
              style={{
                height: 36,
                borderRadius: 4  
              }}
              onPress={() => handleFavorite(repo)}
              titleStyle={{ fontWeight: "700", color: "#FFD02C" }}
              leading={props => <FontAwesome name="star" {...props} color="#FFD02C" />}
            />
          )}
          
          <HStack justify={showFavoriteButton ? "center" : "start"} items='center' fill>
            <FontAwesome name="star" size={18} color="#FFD02C" />
            <Text style={{ marginLeft: 8, color: "#9A9A9A", fontSize: 12 }}>{repo.stargazers_count}</Text>
          </HStack>
          <HStack justify={showFavoriteButton ? "center" : "end"} items='center' fill>
            <FontAwesome name="circle" size={10} color="red" />
            <Text style={{ marginLeft: 6, color: "#9A9A9A", fontSize: 12 }}>{repo.language ?? "Indefinido"}</Text>
          </HStack>
        </HStack>
    </TouchableOpacity>
  );
};

export default RepoCard;