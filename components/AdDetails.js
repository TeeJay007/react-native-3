import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { deleteAd } from '../actions/adActions';

class AdDetails extends Component{

    constructor(props){
        super(props)

        this.state ={
            willRemove: false,
            id: null
        }
    }

    componentWillUnmount(){
        if(this.state.willRemove && this.state.id !== null){
            this.props.deleteAd(this.state.id);
        }
    }

    render(){
        const ad = this.props.ads.filter(v => v.id === this.props.route.params.id)[0];

        return(
            <View style={{
                flex: 1,
                paddingHorizontal: 16
            }}>
                <Text style={styles.title}>{ad.name}</Text>
                <Text style={styles.description}>{ad.description}</Text>
                <Button title="Atnaujinti" onPress={() => 
                    this.props.navigation.navigate("Atnaujinti", {
                        id: ad.id
                    })
                } />
                <Button title="Trinti" onPress={() => {
                    this.setState({
                        id: ad.id,
                        willRemove: true
                    })
                    this.props.navigation.navigate("Visi skelbimai");
                }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        paddingVertical: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        borderBottomWidth: 2,
    },
    description:{
        fontSize: 20,
    }
})

export default connect(store => ({ads: store.ads}), {deleteAd})(AdDetails);