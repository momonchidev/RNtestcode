import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import { AVATAR_SIZE, itemViewStyle, SPACING } from './style';

function CustomerItemView(props) {
    return (
        <View style={itemViewStyle.itemView}>
            <Image
                source={{ uri: "https://randomuser.me/api/portraits/women/81.jpg" }}
                style={{width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE,marginRight: SPACING /2}}
            />
            <View>
                <Text style={{fontSize:22,fontWeight:'700',}}>
                    {`${props.item.lastName}, ${props.item.firstName}`}
                </Text>
                <Text style={{fontSize:18,opacity:.7,}}>
                    {props.item.email}
                </Text>
                <Text style={{fontSize:14,opacity:.8, color:'#56c5e4'}}>
                    {props.item.phone}
                </Text>
                <Text style={{fontSize:14,opacity:.8, color:'#56c5e4'}}>
                    {props.item.address}
                </Text>
            </View>
        </View>
    );
}



export default CustomerItemView;