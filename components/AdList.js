import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addAd } from '../actions/adActions';


const AdDisplay = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={() => {
        item.nav.push('Skelbimo info', {
            id: item.ad.id
        })
    }}>
        <Text style={styles.itemText}>{item.ad.name}</Text>
    </TouchableOpacity>
)

class AdList extends Component{
    render(){
        return(
            <View style={{
                flex: 1
            }}>
                {/* <Button title="add" onPress={() => this.props.addAd('new', 'desc')}/> */}
                <Button title="new" onPress={() => this.props.navigation.push("Naujas skelbimas")} />
                <FlatList 
                    data={this.props.ads.map(v => ({ad: v, nav: this.props.navigation}))}
                    renderItem={AdDisplay}
                    keyExtractor={item => item.ad.id.toString()}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item:{
        paddingVertical: 20,
        borderBottomWidth: 1,
        alignItems:'center',
    },
    itemText:{
        fontSize: 20,
    }
})

export default connect(store => {
    console.log(store)
   return ({ads: store.ads})
}, { addAd })(AdList);