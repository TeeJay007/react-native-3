import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';


const AdDisplay = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={() => {
        item.nav.push('Skelbimo info', {
            id: item.ad.id
        })
    }}>
        <Text style={styles.itemText}>{item.ad.name}</Text>
    </TouchableOpacity>
)

class AdFilteredList extends Component{
    render(){
        return(
            <View style={{
                flex: 1
            }}>
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

export default connect(store => ({ads: store.ads.filter(a => a.user === store.user.name)}))(AdFilteredList);