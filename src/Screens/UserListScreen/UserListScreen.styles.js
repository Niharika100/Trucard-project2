import {
    StyleSheet, 
    PixelRatio as PR, 
} from 'react-native';

const styles = StyleSheet.create({
    cardContainer: {
      flex: 1,
      paddingRight: PR.getPixelSizeForLayoutSize(24) / PR.get(),
      paddingBottom: PR.getPixelSizeForLayoutSize(24) / PR.get(),
      paddingLeft: PR.getPixelSizeForLayoutSize(8) / PR.get(),
      paddingTop: PR.getPixelSizeForLayoutSize(8) / PR.get(),
      marginVertical: PR.getPixelSizeForLayoutSize(12) / PR.get(),
      borderWidth: 2,
      borderColor: '#F06D6D',
      borderRadius: 12,
      backgroundColor: 'white'
    },
    idStyle: {
      alignItems: 'center',
      alignSelf:'center',
      padding: PR.getPixelSizeForLayoutSize(4) / PR.get(),
      width: PR.getPixelSizeForLayoutSize(32) / PR.get(),
      height: PR.getPixelSizeForLayoutSize(32) / PR.get(),
      borderWidth: 1,
      borderRadius: 40,
      backgroundColor: '#F06D6D'
    },
    textContainer: {
      marginVertical: PR.getPixelSizeForLayoutSize(2) / PR.get(),
      fontFamily: 'SpaceGrotesk-Bold',
    }
  })

export default styles;