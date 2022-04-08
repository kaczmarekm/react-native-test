import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import md5 from 'md5';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { formatRelative } from 'date-fns';

import { Colors } from '../../utils/colors';
import { Customer } from '../../repository/models/Queue';
import { FastImage } from '../../../packages/fast-image';
import { getEnv } from '../../../packages/config';

const styles = StyleSheet.create({
  customerItem: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 17.5,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  customerItemNameText: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.black,
    flexShrink: 1,
  },
  customerItemRightPanel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerItemDateText: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.black,
    marginLeft: 5,
  },
  downArrowView: {
    width: 28,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  userAvatarView: {
    paddingVertical: 20,
    paddingLeft: 30,
    alignSelf: 'stretch',
  },
  userAvatar: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});

const avatarPlaceholderUri =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

const CustomersListItem = ({ item }: { item: Customer }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(!collapsed);
  }, [setCollapsed, collapsed]);

  const expectedTimeFormatted = useMemo(
    () => formatRelative(new Date(item.expectedTime), new Date()),
    [item.expectedTime],
  );

  const imageUrl = useMemo(
    () =>
      !!item.customer.emailAddress
        ? `${getEnv('GRAVATAR_API_URL')}${md5(
            item.customer.emailAddress.trim().toLowerCase(),
          )}`
        : avatarPlaceholderUri,
    [item.customer.emailAddress],
  );

  return (
    <TouchableOpacity onPress={toggleCollapsed}>
      <View style={styles.customerItem}>
        <Text style={styles.customerItemNameText} numberOfLines={1}>
          {item.currentPosition}. {item.customer.name}
        </Text>
        <View style={styles.customerItemRightPanel}>
          <Text style={styles.customerItemDateText}>
            {expectedTimeFormatted}
          </Text>
          <View style={styles.downArrowView}>
            <FontAwesomeIcon
              icon={collapsed ? faChevronDown : faChevronUp}
              size={18}
            />
          </View>
        </View>
      </View>
      {!collapsed && (
        <View style={styles.userAvatarView}>
          <FastImage
            source={{ uri: imageUrl }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.userAvatar}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomersListItem;
