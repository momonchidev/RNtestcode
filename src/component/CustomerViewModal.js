import React from 'react';
import { Modal, View, TouchableOpacity, Image, ScrollView, Text,ImageBackground } from 'react-native';
import {customerViewStyle,viewModalStyle} from './style';
import { AntDesign } from '@expo/vector-icons';

function CustomerViewModal({customerData,modalVisible,setModalVisible,showEditView}) {

    // pass the close function to child
    const handleCloseModal = () =>{
        setModalVisible(false);
    }

    const handleEditProfile = () =>{
        showEditView(true);
    }

    return (
        <>
            <Modal 
                visible={modalVisible} 
                animationType="slide"
                onRequestClose={handleCloseModal}>
                    <ScrollView>
                        <View>
                            <View >
                                <ImageBackground
                                style={customerViewStyle.headerBackgroundImage}
                                blurRadius={10}
                                source={{
                                    uri: "https://randomuser.me/api/portraits/women/81.jpg",
                                }}
                                >
                                <View style={customerViewStyle.headerColumn}>
                                    <Image
                                    style={customerViewStyle.userImage}
                                    source={{
                                        uri: "https://randomuser.me/api/portraits/women/81.jpg",
                                    }}
                                    />
                                    
                                    <TouchableOpacity onPress={() => setModalVisible(false)}  style={viewModalStyle.modalCloseBtn}>
                                        <AntDesign name="leftcircleo" size={27} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleEditProfile()}  style={viewModalStyle.editBtn}>
                                        <AntDesign name="edit" size={27} color="white" />
                                    </TouchableOpacity>
                                    <Text style={customerViewStyle.userNameText}>{`${customerData.lastName}, ${customerData.firstName}`}</Text>
                                    <View style={customerViewStyle.userEmailRow}>
                                        <View>
                                            <AntDesign
                                                name="mail"
                                                size={20}
                                                color="#000"
                                                style={{marginRight:5}}
                                            />
                                        </View>
                                        <View>
                                            <Text style={customerViewStyle.userEmailTxt}>
                                            {customerData.email}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                </ImageBackground>
                            </View>
                            <View style={{flexDirection:"column",paddingLeft:10,marginTop:20}}>
                              <View style={customerViewStyle.detailsRow}>
                                    <View>
                                        <AntDesign
                                            name="user"
                                            size={20}
                                            color="blue"
                                            style={{marginRight:5}}
                                        />
                                    </View>
                                    <View>
                                        <Text style={customerViewStyle.detailsText}>
                                        {customerData.custCode}
                                        </Text>
                                    </View>
                                </View>
                                <View style={customerViewStyle.detailsRow}>
                                    <View>
                                        <AntDesign
                                            name="phone"
                                            size={20}
                                            color="blue"
                                            style={{marginRight:5}}
                                        />
                                    </View>
                                    <View>
                                        <Text style={customerViewStyle.detailsText}>
                                        {customerData.phone}
                                        </Text>
                                    </View>
                                </View>
                                <View style={customerViewStyle.detailsRow}>
                                    <View>
                                        <AntDesign
                                            name="calendar"
                                            size={20}
                                            color="blue"
                                            style={{marginRight:5}}
                                        />
                                    </View>
                                    <View>
                                        <Text style={customerViewStyle.detailsText}>
                                        {customerData.dob}
                                        </Text>
                                    </View>
                                </View>
                                <View style={customerViewStyle.detailsRow}>
                                    <View>
                                        <AntDesign
                                            name="enviroment"
                                            size={20}
                                            color="blue"
                                            style={{marginRight:5}}
                                        />
                                    </View>
                                    <View>
                                        <Text style={customerViewStyle.detailsText}>
                                        {customerData.address}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
            </Modal>
        </>
    );
}

export default CustomerViewModal;