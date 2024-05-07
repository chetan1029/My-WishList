import {
  FlatList,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Feather from 'react-native-vector-icons/Feather';

// Components
import HeaderBar from '../components/HeaderBar';
import {useOfflineStore} from '../store/offline-store';
import {useStore} from '../store/store';
import SharedWishListFlatList from '../components/SharedWishListFlatList';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const SharedWishListScreen = ({route, navigation}: any) => {
  // state
  const [refreshing, setRefreshing] = useState(false);

  // Store
  const UserDetail = useStore((state: any) => state.UserDetail);
  const themeColor = useOfflineStore((state: any) => state.themeColor);
  const sharedWishList = useStore((state: any) => state.SharedWishList);
  const fetchSharedWishList = useStore(
    (state: any) => state.fetchSharedWishList,
  );

  // Other variables
  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  // use Effect
  React.useEffect(() => {
    fetchSharedWishList(UserDetail);
  }, [fetchSharedWishList]);

  // functions
  const onRefresh = async () => {
    setRefreshing(true);
    fetchSharedWishList(UserDetail);
    setRefreshing(false);
  };

  return (
    <View
      style={[styles.ScreenContainer, {backgroundColor: themeColor.primaryBg}]}>
      <StatusBar backgroundColor={themeColor.primaryBg}></StatusBar>
      {/* App Header */}
      <HeaderBar title="Shared WishList" themeColor={themeColor} />

      {/* SharedWishList Flatlist */}
      <SharedWishListFlatList
        ListRef={ListRef}
        sharedWishList={sharedWishList}
        tabBarHeight={tabBarHeight}
        onRefresh={onRefresh}
        refreshing={refreshing}
        navigation={navigation}
        themeColor={themeColor}
      />
    </View>
  );
};

export default SharedWishListScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
