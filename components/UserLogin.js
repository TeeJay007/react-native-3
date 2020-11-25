import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loginUser } from '../actions/userActions';
import * as SecureStore from 'expo-secure-store';


class UserLogin extends Component{
    constructor(props){
        super(props)

        this.state = {
            userName: '',
            remember: false
        }
    }

    _onNameChange(text){
        this.setState({
            userName: text
        })
    }

    async _storeUser(){
        return await SecureStore.setItemAsync('userSettings', JSON.stringify({
            userName: this.state.userName,
            remember: this.state.remember
        })).then(true, false)
    }

    async _loadUserIfExist(){
        return SecureStore.getItemAsync('userSettings')
    }

    async componentDidMount(){
        const user = await this._loadUserIfExist();
        console.log(user)
        if(user !== null){
            const userData = JSON.parse(user);
            if(userData.remember){
                loginUser(userData.userName);            
                this.setState({
                    userName: userData.userName,
                    remember: userData.remember
                })
                this.props.navigation.push('Skelbimai');
            }
        }
    }

    render(){
        return(
            <View style={{
                flex: 1,
                paddingHorizontal: 16
            }}>
                <Text style={styles.formText}>Vardas:</Text>
                <TextInput 
                style={styles.textInput} 
                onChangeText={text => this._onNameChange(text)}
                value={this.state.userName}
                />
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20
                }} onPress={() => this.setState({remember: !this.state.remember})}>
                    {this.state.remember ? 
                        <MaterialIcons name="check-box" size={24} color="black" /> :
                        <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                    }

                    <Text>Prisiminti</Text>
                </TouchableOpacity>

                <Button title="Prisijungti" onPress={async () => {
                    if(this.state.userName.length > 0 && this._storeUser()){
                        this.props.navigation.push('Skelbimai');
                        this.props.loginUser(this.state.userName);
                    }
                }} color={this.state.userName.length > 0 ? '' : 'gray'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formText:{
        fontSize: 20,
        marginTop: 8
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 2,
        paddingHorizontal: 16,
        marginBottom: 8
    }
})

export default connect(store => ({user: store.user}), {loginUser})(UserLogin);