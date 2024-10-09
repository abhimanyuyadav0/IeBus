import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../theme'; // Adjust the import based on your theme path
import { ThemeColors } from '../../theme/themeTypes'; // Adjust the import based on your theme types
import CustomButton from '../customButton';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttons?: { text: string; onPress?: () => void }[];
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  onClose,
  buttons,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            
            {buttons?.map((button, index) => (
              <CustomButton key={index} title={button.text}  onPress={() => {
                if (button.onPress) {
                  button.onPress();
                }
                onClose();
              }} />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.overlay,
    },
    container: {
      width: '80%',
      backgroundColor: theme.background.primary, 
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.text.primary, 
    },
    message: {
      fontSize: 16,
      marginBottom: 20,
      color: theme.text.primary,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    button: {
      marginHorizontal: 5,
      padding: 10,
      backgroundColor: theme.background.primary, 
      borderRadius: 5,
    },
  });

export default CustomAlert;
