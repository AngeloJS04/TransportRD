import styled from "styled-components/native";
import { TextInputMask } from 'react-native-masked-text'

export const Container = styled.View<propsContainer>`
  width: ${({ width }) => width ? width : '100%'};
  height: 60px;
  padding: 8px;
  margin-top: 14px;
  background-color: #BDBDBD50;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  margin-right: 4px
`

interface propsContainer {
  width: any
}

export const TextInput = styled.TextInput`
  width: 100%;
  margin-left: 4px;
  font-weight: bold;
  
  
`

export const MaskTextInput = styled(TextInputMask)`
  width: 100%;
  margin-left: 4px;
  font-weight: bold;
`