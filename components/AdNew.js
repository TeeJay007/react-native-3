import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { addAd } from '../actions/adActions';

class AdNew extends Component{
    constructor(props){
        super(props)

        this.state = {
            adName: '',
            adDescription: ''
        }
    }

    _onNameChange(text){
        this.setState({
            adName: text
        })
    }

    _onDescriptionChange(text){
        this.setState({
            adDescription: text
        })
    }

    render(){
        return(
            <View style={{
                flex: 1,
                paddingHorizontal: 16
            }}>
                <Text style={styles.formText}>Skelbimo pavadinimas:</Text>
                <TextInput style={styles.textInput} onChangeText={text => this._onNameChange(text)} />
                <Text style={styles.formText}>Skelbimo aprašymas:</Text>
                <TextInput style={styles.textInput} onChangeText={text => this._onDescriptionChange(text)} />
                <Button title="Pridėti" onPress={() => {
                    this.props.addAd(this.state.adName, this.state.adDescription)
                    this.props.navigation.goBack()
                }}/>
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

export default connect(store => ({ads: store.ads}), {addAd})(AdNew);