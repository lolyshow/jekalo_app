import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,

} from "react-native";

class CardComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    
    const img = this.props.image && this.props.image!="undefined"? this.props.image: "../assets/images/laptop2.jpeg";
    let image = { uri: img };
    return (
      <View>
        <View
          style={{
            backgroundColor: "#f5f5f5",
            // marginLeft: 0,
            // margin: 10,
            padding:10,
            borderRadius: 10,
            marginBottom: 0,
            height: 290,
            width: 300,
          }}
        >
          <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
           
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableHighlight
              onPress={this.props.onPressButton}
              onLongPress={this._onLongPressButton}
              underlayColor="white"
            >
              <Image source={image} style={{ width: 300, height: 290, resizeMode:"stretch" }} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={{ marginTop:10, justifyContent:'center',alignContent:'center' }}>
          
            
          
          <Text style={{ }}>Name: {this.props.name} </Text>
          <Text>Status: {this.props.status}</Text>
          <Text>Category: {this.props.category}</Text>
        </View>
      </View>
    );
  }
}
export default CardComponent;
