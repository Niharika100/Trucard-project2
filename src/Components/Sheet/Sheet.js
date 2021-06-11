import React from 'react';
import {
    View,
    Text,
    Modal,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    PixelRatio as PR
} from 'react-native';

const Sheet = ({ modalVisible, close, component }) => {
    return (
        <Modal
            visible={modalVisible}
            transparent={true} 
            animationType="fade" 
            style={styles.modalContainer}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={close} style ={{width:'100%', height:'100%', flex : 1}}>
                </TouchableOpacity>
                {
                    component
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1,
        justifyContent: 'flex-end',
    },
})

export default Sheet;