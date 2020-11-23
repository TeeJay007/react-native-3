import { connect } from "react-redux";
import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { addAd } from '../actions/adActions';

class SomeDataComponent extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <Text>YEEY</Text>
                <Text>{this.props.ads.length}</Text>
                <Button onPress={() => {
                    this.props.addAd('someAd', 'someDesc')
                }} title="CLIK" />
            </View>
        )
    }
}

export default connect(store => {
    return {ads: store.ads}
}, { addAd })(SomeDataComponent)