import React, { Component } from 'react';
import {  View, Text as NativeText,Image,StyleSheet,AppRegistry,StatusBar,TextInput,Alert,YellowBox } from 'react-native';
import { Container, Header, Content, Form, Item,Body,Title, Input, Label,Button,Text} from 'native-base';
import Expo from "expo";
YellowBox.ignoreWarnings(['Warning: componentWillMount','Warning: componentWillReceiveProps','Warning: componentWillUpdate']);
export default class StackedLabelExample extends Component {

    constructor(props) {
 
        super(props)
     
        this.state = {
          loading: true,
          nim: '',
          nama: '',
          noHp: '',
          namaAlat:''
     
        }
     
      }

      async componentWillMount() {
        await Expo.Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.setState({ loading: false });
      }

      InsertDataToServer = () =>{
 
 
        const { nim }  = this.state ;
        const { nama }  = this.state ;
        const { noHp }  = this.state ;
        const { namaAlat }  = this.state ;
        
       fetch('https://aryahermawan9749.000webhostapp.com/kirimData.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
           nim: nim,
        
           nama: nama,
        
           noHp: noHp,

           namaAlat: namaAlat


        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
       // Showing response message coming from server after inserting records.
               Alert.alert(responseJson);
        
             }).catch((error) => {
               console.error(error);
             });
        
        
         }

  render() {
    if (this.state.loading) {
        return <Expo.AppLoading />;
      }
    return (
      <Container>
        <Header>
        <Body  style={{justifyContent:'center',alignItems:'center'}} >
                   <Title style={{paddingTop:5}} >E - Inventaris</Title>
                </Body>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>NIM</Label>
              <Input onChangeText={nim => this.setState({nim})} keyboardType='numeric'/>
            </Item>
            <Item stackedLabel last>
              <Label>NAMA</Label>
              <Input onChangeText={nama => this.setState({nama})}/>
            </Item>
            <Item stackedLabel last>
              <Label>Nomor HP</Label>
              <Input onChangeText={noHp => this.setState({noHp})} keyboardType='numeric'/>
            </Item>
            <Item stackedLabel last>
              <Label>Nama Barang</Label>
              <Input onChangeText={namaAlat => this.setState({namaAlat})}/>
            </Item>
          </Form>
          <View style={{paddingTop:20}}>
          <Button block dark style={{paddingTop:10}} onPress={this.InsertDataToServer} >
            <Text>SIMPAN</Text>
          </Button>
          </View>
        </Content>
      </Container>
    );
  }
}