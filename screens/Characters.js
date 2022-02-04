import React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";

import ProductCard from "./components/ProductCard";
import Network from "./Helpers/Network";
import Config from "./Helpers/Config";

class Characters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      characterLoading:false,
      noData:false,
      seed: 1,
      page: 1,
      users: [],
      character:[],
      isLoading: false,
      dataloading:false,
      loadingMore: false,
      morepage: false,
      totalPage: 1,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.loadCharacter("initial");
}


  onPressButton = (item) => {
    this.props.navigation.navigate("EproductDetails", {
      userName: "username",
      product_id: item,
    });
  };

      
  

  
  loadCharacter = async(type) =>{


    console.log("SizeOfArray",this.state.users.length);
    console.log("MyTypeIsHere",type);
    this.setState({ characterLoading: true,dataloading: true });
    
    console.log("insideLoadCharacter");
    let url = "";
    if(type == "initial" || type == "refresh"){
        url = Config.base_url+"characters?"+"limit=12&offset=0";
    }else if(type == "loadmore"){
        url = Config.base_url+"characters?"+"limit=50&offset=1";
        
    }

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

            console.log("ThosIsThePageToLoad",this.state.page)
            if (this.state.page == 1) {
              this.setState({ users: response});
            } else {
                if(type == "loadmore"){

                    console.log("iAmLoadMoreComp")
                    this.setState({
                        users: [...this.state.users, ...response],
                        isRefreshing:false,
                    });
                }
            }            
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
        
          this.loadCharacter("refresh");
      }
    );
  };

  handleLoadMore = () => {
    console.log("insideLoadMore");
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        
          this.loadCharacter("loadmore");
        
      }
    );
  };

  

  

  renderPagination = () => {
      console.log("insedResderddd")
    const { character,users, isRefreshing } = this.state;
    console.log("UserNewToRenderinini", isRefreshing);
    return (
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignSelf: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <ProductCard
              key={item.id}
              name={item.name}
              onPressButton= {this.onPressButton.bind(this, item.id)}
              occupation={item.occupation}
              image={item.img}
              status = {item.status}
              category = {item.category}
            />
          </View>
        )}
        keyExtractor={(i) => i.id}
        refreshing={isRefreshing}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.01}
        numColumns={1}
        // onEndReachedThreshold = {this.handleLoadMore}
        // onEndThreshold={0}
      />
    );
  };

  

  
  render() {
    // console.log("thisIsLoadingMoreResult", this.state.loadingMore);
    let characterLoading = this.state.characterLoading;
    let dataLoading = this.state.dataloading;
    return (
      <View style={styles.main}>
        

        <View>
          <ScrollView
            contentContainerStyle={styles.allCentered} horizontal={true}
            style={{margin: 20,marginTop: 2,paddingBottom: 0,alignContent: "center",flexDirection: "row",}}
          >
            {dataLoading ? (
              <View><Text>Loading.......</Text></View>
            ) : this.state.noData == true ? (
              <View style={{ justifyContent: "center", alignContent: "center" }}>
                <Text>{"No data to Display"}</Text>
              </View>
            ) : 
              this.renderPagination()
            }
          </ScrollView>

          {/* check if Api loading more */}
          {this.state.loadingMore ? (
            <View>
              <View style={styles.allCentered}>
                <View style={styles.allCentered}>
                  <View style={styles.allCentered}>
                    <ActivityIndicator color="#17375e" size="large" />
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={{ height: 0 }}></View>
          )}
        </View>
      </View>
    );
  }
}
export default Characters;

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
});
