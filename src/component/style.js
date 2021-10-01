import {StatusBar, StyleSheet } from "react-native";

export const BG_IMG = "https://images.pexels.com/photos/4992704/pexels-photo-4992704.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=700";
export const BG_IMG_RADIUS = 5;
export const SPACING = 20;
export const AVATAR_SIZE = 70;

export const WHITE = "#fff";

export const customersListStyle = StyleSheet.create({
    fetchContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        },
    searchHeaderContainer:{
        paddingLeft:SPACING,
        paddingRight:SPACING
    },
    contentContainerStyle:{
        padding:SPACING,
        paddingTop: StatusBar.currentHeight || 42
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#03A9F4',
        borderRadius: 30,
        elevation: 8
      },
      fabIcon: {
        fontSize: 40,
        color: 'white'
      }
        
});

export const searchHeaderStyle = StyleSheet.create({
    header: {
        backgroundColor: WHITE,
        padding: 10,
        marginVertical: 10,
        borderRadius: 20
    },
    textInput:{ 
        backgroundColor: '#fff', 
        paddingHorizontal: 20 
    } 
});

export const itemViewStyle = StyleSheet.create({
    itemView:{
        flexDirection:'row', 
    padding:SPACING, 
    marginBottom:SPACING,
    backgroundColor:'rgba(250,250,250,0.8)',
    borderRadius:12, 
    shadowColor:'#000', 
    shadowOffset:{
        width:0,
        height:10
    },
    shadowOpacity:.3,
    shadowRadius:20}
});

export const inputModalStyle = StyleSheet.create({
    formContainer: {
        flex: 1,
        marginTop:20,
        paddingLeft:10,
        paddingRight:10
    },
    modalContainer: {
        flex:1,
        padding:20
    },
    modalHeaderContainer:{
        marginTop:10,
        paddingLeft:10
    },
    modalCloseBtn:{
        alignSelf: 'flex-end',
        marginTop: -5,
        position: 'absolute'
    },
    modalTitle:{
        fontSize:20,
        fontWeight:'700'
    }
});