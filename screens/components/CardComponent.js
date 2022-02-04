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
      <View key = {this.props.key}>
        <View
          style={{backgroundColor: "#f5f5f5",padding:10,borderRadius: 10,marginBottom: 0,height: 290,width: 300,
          }}
        >
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
          
            
          <Text>
                <Text style={{fontWeight: "bold"}}>Name:</Text>
          <Text></Text>{this.props.name}</Text>
          
          <Text>
                <Text style={{fontWeight: "bold"}}>Status:</Text>
          <Text></Text>{this.props.status}</Text>

          <Text>
                <Text style={{fontWeight: "bold"}}>Category:</Text>
          <Text></Text>{this.props.category}</Text>

          <Text>
                <Text style={{fontWeight: "bold"}}>Series:</Text>
          <Text></Text>{this.props.series}</Text>
          
        </View>
      </View>
    );
  }
}
export default CardComponent;
