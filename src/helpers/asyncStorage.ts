import AsyncStorage from "@react-native-async-storage/async-storage"

export const setItemOnAsyncStorage = async (key: string, item: unknown): Promise<void> => {
  await AsyncStorage.setItem(`@wefit:${key}`, JSON.stringify(item))
}

export const getItemOfAsyncStorage = async (key: string): Promise<any> => {
  const item = await AsyncStorage.getItem(`@wefit:${key}`)
  if (!item) return

  return JSON.parse(item)
}