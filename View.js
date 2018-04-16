import React, { Component } from 'react';
import Expo from "expo";
import {  View, ScrollView, Text,StyleSheet,Image, FlatList,RefreshControl,StatusBar,ActivityIndicator, Alert,Linking } from 'react-native';
import {Container,Title,Header, Content, Form, Item, Input, Label, Left, Button,Icon, Body,Card,CardItem,List,ListItem, Thumbnail, Right} from 'native-base'
export default class SettingScreen extends Component {

    constructor(props) {
		super(props);
		this.state = {
			loading: true,
			data: [],
			error: null,
			refreshing: false,
			ActivityIndicator_Loading: false,
		};
	}

	componentDidMount() {
		this.setState({ ActivityIndicator_Loading: true }, () => {
			this.setState({ refreshing: true });
			const url = 'https://aryahermawan9749.000webhostapp.com/getData.php';
			//this.setState({ loading: true });
			fetch(url)
				.then((response) => response.json())
				.then((responseJson) => {
					console.log("comp");
					console.log(responseJson);
					this.setState({
						data: responseJson,
						error: responseJson.error || null,
						loading: false,
						refreshing: false,
						ActivityIndicator_Loading: false,

					});
				}
				);
		});
	}

	onRefresh() {
		this.setState({refreshing: true});
		this.componentDidMount();
	  }

	async componentWillMount() {
		await Expo.Font.loadAsync({
		  Roboto: require("native-base/Fonts/Roboto.ttf"),
		  Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
		  Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
		});
		this.setState({ loading: false });
	  }
  render() {
	if (this.state.loading) {
		return <Expo.AppLoading />;
	  }
    return (
        <Container>
            <Header> 
                <Body  style={{justifyContent:'center',alignItems:'center'}} >
                <Title style={{paddingTop:5}} >Riwayat Peminjaman</Title>
                </Body>
            </Header>
           
            <View style={{flex:1}} >
					{
						this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'/> : null
					}
					<View>
					<FlatList
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.onRefresh.bind(this)}
							/>
						}
						data={this.state.data}
						keyExtractor={item=> item.id}
						renderItem={({ item }) =>
						<Card>
						<CardItem cardBody>
						<List>
							<ListItem icon>
								<Left>
									<Icon name="ios-body" />
								</Left>
								<Text style={{fontWeight:'bold'}} >{item.nama}</Text>
							</ListItem>
							</List>
						</CardItem>
						<CardItem cardBody>
						<List>
							<ListItem icon>
								<Left>
									<Icon name="ios-card" />
								</Left>
								<Text style={{fontWeight:'bold'}} >{item.nim}</Text>
							</ListItem>
							</List>
						</CardItem>
						<CardItem cardBody>
						<List>
							<ListItem icon>
								<Left>
									<Icon name="ios-construct" />
								</Left>
								<Text>Alat yang dipinjam : {item.namaAlat}</Text>
							</ListItem>
							</List>
						</CardItem>
						<CardItem cardBody>
						<List>
							<ListItem icon>
								<Left>
									<Icon name="ios-contact" />
								</Left>
								<Text>No HP : {item.noHp}</Text>
							</ListItem>
							</List>
						</CardItem>
					</Card>
						}
// 						onEndReached={this.onEndReached}
//   onEndReachedThreshold={0.5}
						
					/>
					</View>
				</View>
            
        </Container>
    );
  }
}