import React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";

import ListComp from "./components/ListComp";
import Network from "./Helpers/Network";
import Config from "./Helpers/Config";

class Episode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      episodeLoading:false,
      noData:false,
      seed: 1,
      page: 1,
      users: [],
      character:[],
      episode:[],
      isLoading: false,
      dataloading:false,
      loadingMore: false,
      morepage: false,
      totalPage: 1,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.loadEpisode();
}


  onPressButton = (item) => {
    this.props.navigation.navigate("EproductDetails", {
      userName: "username",
      product_id: item,
    });
  };

      
  

  
  loadEpisode = async() =>{

    this.setState({ episodeLoading: true,dataloading: true });
    
    console.log("insideLoadEpisode");
    let url = Config.base_url+"episodes";
   

    console.log("MyUselrlHere",url);

    await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "application/json",
          Origin: "*",
        },
        
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("responsefromEndopint", JSON.stringify(response));
          if (response.length<0) {
            this.setState({ noData: true });
          } else {

              this.setState({ episode: response});
                   
          }
          this.setState({ dataloading: false });
          this.setState({ loadingMore: false });
          this.setState({ refreshing: false,isRefreshing: false, });
        })
        .catch((error) => {
          console.log("errormessage", error);
          this.setState({ dataloading: false });
          this.setState({ refreshing: false });
          console.log("error", error);
        });
   
  }

  handleRefresh = () => {
    this.setState(
      {
        isRefreshing: true,
      },
      () => {
        
          this.loadEpisode("refresh");
      }
    );
  };

  
  

  

  renderEpisode = () => {
    const { character,episode, isRefreshing } = this.state;
    return (
      <FlatList
        data={episode}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignSelf: "center",
              alignItems: "center",
              marginTop:10,
            }}
          >
            <ListComp
              key={item.id}
              title={item.title}
              season={item.season}
              date= {item.air_date}
              episode={item.episode}
              character={item.characters}
              series = {item.series}
            />
          </View>
        )}
        keyExtractor={(i) => i.id}
        numColumns={1}
      />
    );
  };

    render(){
        
        return (
            this.state.dataloading?<View><Text>Loading...</Text></View>:
            this.renderEpisode()
        );
        
    }

}



     

export default Episode;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  gridView: {
    flex: 1,
  },

  main: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  allCentered:{
    
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
         
  },
  container2: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
