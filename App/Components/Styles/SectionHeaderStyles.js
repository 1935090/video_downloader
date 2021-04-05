import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../Themes';

export default StyleSheet.create({
  card: {
    marginTop: 0,
    marginBottom: Metrics.baseMargin,
    padding: 10,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: Colors.ricePaper,
    elevation:  Metrics.shadow.elevation,
    shadowColor: Colors.black,
    shadowOpacity: Metrics.shadow.opacity,
    shadowRadius: Metrics.shadow.radius,
    shadowOffset: {
      width: Metrics.shadow.width,
      height: Metrics.shadow.height
    },
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0
  },
  cardItem: {
    backgroundColor: Colors.transparent
  },
  cardBody: {
    alignItems: 'flex-start'
  },
  itemText: {
    ...Fonts.style.normal,
    color: "#737373",
    fontSize: 17,
    marginLeft: Metrics.baseMargin,
    textAlign: "center"
  },
  badge: {
    position: 'absolute',
    borderRadius: 4,
    paddingTop: 1,
    right: -4,
    bottom: -3,
    backgroundColor: '#A4CBFA', margin: 0
  }
})
