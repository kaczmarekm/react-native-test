import { Image } from 'react-native';

const FastImage = Image;
FastImage.resizeMode = { contain: 'resize' };

export { FastImage };
