import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { getAllPosts } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppWrite";
import { RefreshControl } from "react-native";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "@/constants";
import EmptyState from "@/components/EmptyState";
import { searchPosts } from "@/lib/appwrite";

const Bookmark = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts, refetch } = useAppWrite(getAllPosts);
  const [search, setSearch] = useState(searchPosts)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard 
          title={item.title}
           thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
            <View>
                <Text className="font-psemibold text-2xl text-gray-100">
                 Saved Video
                </Text>
              </View>
             
            </View>
            <SearchInput 
            />

           
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      
    </SafeAreaView>
  );
};

export default Bookmark;
