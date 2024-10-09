import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import CustomText from '../customText';

interface ToastProps {
  animationDuration?: number;
  duration?: number;
  message: string;
  offsetBottom?: number;
  offsetTop?: number;
  onDestroy?: () => void;
  onHide?: () => void;
  open: boolean;
  placement?: 'top' | 'bottom';
  textStyle?: {fontSize: number};
  type?: 'success' | 'warning' | 'error' | 'normal';
}

const {width} = Dimensions.get('window');

const Toast: React.FC<ToastProps|any> = ({
  animationDuration = 300,
  duration = 3000,
  message,
  offsetBottom = 30,
  offsetTop = 30,
  onDestroy = () => {},
  onHide = () => {},
  open,
  placement = 'bottom',
  textStyle = {fontSize: 12},
  type = 'normal',
}) => {
  const [visible, setVisible] = useState(open);
  const translateY = new Animated.Value(placement === 'top' ? -100 : 100);

  useEffect(() => {
    if (open) {
      setVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();

      const timeout = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: placement === 'top' ? -100 : 100,
          duration: animationDuration,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
          onHide();
          onDestroy();
        });
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [open, animationDuration, onHide, onDestroy, placement, duration]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return COLORS.status.success;
      case 'warning':
        return COLORS.status.warning;
      case 'error':
        return COLORS.status.error;
      case 'normal':
      default:
        return COLORS.status.available;
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          backgroundColor: COLORS.background.primary,
          top: placement === 'top' ? offsetTop : undefined,
          bottom: placement === 'bottom' ? offsetBottom : undefined,
          transform: [{translateY}],
        },
      ]}>
      <View style={styles.toastContent}>
        <View style={styles.iconContainer}>
          <View
            style={{
              backgroundColor: getBackgroundColor(),
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={styles.messageContainer}>
          <CustomText style={[styles.toastMessage, {fontSize: textStyle.fontSize}]}>
            {message}
          </CustomText>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    left: width * 0.1, 
    right: width * 0.1, 
    borderRadius: 10, 
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, 
    opacity: 1, 
    overflow: 'hidden',
  },
  toastContent: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  iconContainer: {
    width: '2%',
    height: '100%',
  },
  messageContainer: {
    width: '98%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  toastMessage: {
    color: COLORS.text.primary,
    textAlign: 'left',
    fontWeight: '500', 
  },
});

export default Toast;
