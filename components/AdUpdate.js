import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { updateAd } from '../actions/adActions';

class AdNew extends Component{
    constructor(props){
        super(props)

        const ad = this.props.ads.filter(v => v.id === this.props.route.params.id)[0];

        this.state = {
            adId: ad.id,
            adName: ad.name,
            adDescription: ad.description
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
                <TextInput 
                style={styles.textInput} 
                onChangeText={text => this._onNameChange(text)}
                value={this.state.adName}
                />
                <Text style={styles.formText}>Skelbimo aprašymas:</Text>
                <TextInput 
                style={styles.textInput} 
                onChangeText={text => this._onDescriptionChange(text)} 
                value={this.state.adDescription}
                />
                <Button title="Atnaujinti" onPress={() => {
                    this.props.updateAd(this.state.adId, this.state.adName, this.state.adDescription)
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

export default connect(store => ({ads: store.ads}), {updateAd})(AdNew);