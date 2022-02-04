import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,

} from "react-native";

class ListComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    
    
    let characters = "";
      this.props.character && this.props.character.length > 0
        ?this.props.character.forEach(element => {
              characters += element+","
        })
        : characters = "nill";
    
    return (
      <View>
        <View style={{backgroundColor: "#f5f5f5",borderRadius: 10,marginBottom: 0,height: 100,width: 300,
          }}
        >
            <Text>Title: {this.props.title}</Text>
            <Text>
                <Text style={{fontWeight: "bold"}}>Season:</Text>
            <Text> </Text> {this.props.season}</Text>

            <Text>
                <Text style={{fontWeight: "bold"}}>Date:</Text> 
            <Text></Text> {this.props.date}</Text>
            
            <Text>
                <Text style={{fontWeight: "bold"}}>Episode: </Text>
            <Text></Text>{this.props.episode}</Text>
            <Text>
                <Text style={{fontWeight: "bold"}}>Characters:</Text>
            <Text></Text>{characters}</Text>
        </View>
        <View style={{ marginTop:10, justifyContent:'center',alignContent:'center' }}>
          
            
          
          {/* <Text style={{ }}>Name: {this.props.name} </Text>
          <Text>Status: {this.props.status}</Text>
          <Text>Category: {this.props.category}</Text> */}
        </View>
      </View>
    );
  }
}
export default ListComp;
