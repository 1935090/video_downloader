import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  headerCard: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    paddingVertical: 10,
    shadowOpacity: 0.00,
    paddingHorizontal: 10,
    marginBottom: 0,
    ...ApplicationStyles.shadow,
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontFamily: Fonts.type.base,
    textAlign: "left",
    paddingLeft: 5
  },
  itemText: {
    textAlign: "left",
    color: '#333',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular - 1
  },
  itemIcon: {
    marginRight: Metrics.doubleBaseMargin,
    color: Colors.black,
  },
  menuItem: {
    marginTop: Metrics.baseMargin * 4/3,
    marginBottom: 0,
    marginLeft: Metrics.baseMargin * 4/3,
    marginRight: Metrics.baseMargin * 4/3,
    paddingLeft: Metrics.baseMargin,
    backgroundColor: Colors.white,
    ...ApplicationStyles.shadow,
  }
})
