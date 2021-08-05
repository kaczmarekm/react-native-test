import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import md5 from 'md5';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { formatRelative } from 'date-fns';

import { Colors } from '../../utils/colors';
import { Customer } from '../../repository/models/Queue';

const avatarPlaceholderUri =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

export default function CustomersListItem({ item }: { item: Customer }) {
  const [collapsed, setCollapsed] = useState(true);
  const hasEmailAddress = !!item.customer.emailAddress;
  const expectedTimeFormatted = formatRelative(
    new Date(item.expectedTime),
    new Date(),
  );
  const imageUrl = hasEmailAddress
    ? `${Config.GRAVATAR_API_URL}${md5(
        item.customer.emailAddress?.trim().toLowerCase(),
      )}`
    : avatarPlaceholderUri;
  const handleSetCollapsed = (collapsed: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(collapsed);
  };
  return (
    <TouchableOpacity onPress={() => handleSetCollapsed(!collapsed)}>
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
}

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
