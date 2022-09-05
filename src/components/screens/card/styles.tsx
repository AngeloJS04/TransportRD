import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const { height } = Dimensions.get('window')

export const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`

export const Container = styled.View`
  width: 100%;
  height: ${height}px;
  padding: 16px;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: #4e455410;
`

export const Header = styled.View`
  margin-top: 5px
  width: 100%;
`

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #4e455e;
`

export const Subtitle = styled.Text`
  font-weight: 300;
  color: #4e455e;
`

export const Content = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  background-color: #FFFFFF;
  align-items: center;
`

export const View = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 55px;
  margin-bottom: 20px;
  background-color: #6A1B9A;
  align-items: center;
  justify-content: center;
  border-radius: 55px;
  margin-top: 22px
`

export const TextButton = styled.Text`
  color: #FFFFFF
`