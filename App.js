import React, {Component} from 'react';
import { Image, StyleSheet, AppRegistry, TextInput, Picker } from 'react-native';
import { Container, Header, Content, Form, Body, Item, Input, Button, Label, Title, Text, Thumbnail } from 'native-base';
import { StackNavigator } from 'react-navigation';
import fileType from 'react-native-file-type';
import { RNS3 } from 'react-native-aws3';
import ModalDropdown from 'react-native-modal-dropdown';

var ImagePicker = require('react-native-image-picker');

var build = ['Academic Success Center'  , 'Barre Hall'  , 'Biological Sciences Field Station'  , 'Biosystems Research Complex'  , 'Brooks Center for the Performing Arts'  , 'Cook Engineering Laboratory'  , 'Cooper Library'  , 'Daniel Hall'  , 'Earle Hall'  , 'Edwards Hall'  , 'Endocrine Physiology Laboratory'  , 'Fluor Daniel Engineering'  , 'Innovation Building'  , 'Freeman Hall'  , 'Godfrey Hall'  , 'Godley-Snell Research Center'  , 'Greenhouse Complex'  ,  'Holtzendorff Hall'  , 'Houston Center'  , 'Hunter Chemistry Laboratory'  , 'Jordan Hall'  , 'Kinard Laboratory of Physics'  , 'Lee Hall'  , 'Lehotsky Hall'  , 'Life Sciences Building'  , 'Long Hall'  , 'Lowry Hall'  , 'Martin Hall'  , 'McAdams Hall'  , 'Newman Hall'  , 'Olin Hall'  , 'Poole Agricultural Center'  , 'Rhodes Annex'  , 'Rhodes Engineering Research Center'  , 'Riggs Hall'  , 'Sirrine Hall'  , 'Smith Building for Sonoco Institute of Packaging Design and Graphics'  , 'Strode Tower'  , 'Strom Thurmond Institute'  , 'Tillman Hall'  , 'Vickery Hall'  , 'Watt Family Innovation Center'  , 'Administrative Services Building'  , 'Alumni Center'  , 'Brackett Hall'  , 'Central Energy Facility'  , 'Clemson University Foundation/Shirley Center for Philanthropy'  , 'Dillard Building'  , 'Fire Station'  , 'Gentry Hall'  , 'Harcombe Hall'  , 'Kite Hill Recycling Center'  , 'Littlejohn House'  , 'Maintenance Stores'  , 'Mell Hall'  , 'Motor Pool'  , 'National Dropout Prevention Center'  , 'Parking and Transportation Services'  , 'Police Department'  , 'President’s Home'  , 'Sikes Hall'  , 'Trustee House'  , 'University Facilities Offices'  , 'Clemson Memorial Stadium and Frank Howard Field'  , 'Football Practice Facility'  , 'IPTAY/Ticket Office'  , 'Jervey Athletic Center'  , 'Littlejohn Coliseum'  , 'McFadden Building'  , 'Riggs Field (Soccer Stadium)'  , 'Sloan Tennis Center'  , 'Tiger Field (Kingsmore Baseball Stadium)'  , 'Cooper Library (Cooper Café)'  , 'Fernow Street Café (Chick-Fil-A®)'  , 'Hendrix Student Center (Hendrix Food Court, Einstein Bros® and P.O.D. Market)'  , 'Madren Center (Solé on the Green Restaurant)'  , 'Schilletter Dining Hall (Wendy’s®)'  , 'Watt Café'  , 'Barnett Hall'  , 'Benet Hall'  , 'Bowen Hall'  , 'Bradley Hall'  , 'Byrnes Hall'  , 'Calhoun Courts Apartments'  , 'Cope Hall'  , 'Core Campus'  , 'Donaldson Hall'  , 'Geer Hall'  , 'Holmes Hall'  , 'Johnstone Hall'  , 'Lever Hall'  , 'Lightsey Bridge I Apartments'  , 'Lightsey Bridge II Apartments'  , 'Manning Hall'  , 'Mauldin Hall'  , 'McCabe Hall'  , 'Norris Hall'  , 'Sanders Hall'  , 'Simpson Hall North'  , 'Simpson Hall South'  , 'Smith Hall'  , 'Stadium Suites'  , 'Thornhill Village Apartments'  , 'Wannamaker Hall'  , 'Young Hall'  , 'Barnes Center'  , 'Fike Recreation Center'  , 'Hendrix Student Center'  , 'Redfern Health Center'  , 'Union Station'  , 'University Union, Edgar Brown'  , 'Botanical Gardens'  , 'Brooks Center for the Performing Arts'  , 'Campbell Carriage House Coffee and Gift Shop'  , 'Campbell Geology Museum'  , 'Campbell Museum of Natural History'  , 'Carillon Garden'  , 'Class of 1957 Rotunda'  , 'Class of 1960 North Green'  , 'Clemson, Thomas Green Statue (Gantt Circle)'  , 'Cox Plaza'  , 'Fort Hill (Calhoun and Clemson Mansion)'  , 'Fran Hanson Discovery Center'  , 'Lee Hall (Lee Art Gallery)'  , 'Madren Center'  , 'Martin Inn'  , 'Military Heritage Plaza'  , 'Outdoor Theatre (Amphitheater)'  , 'Reunion Square'  , 'Scroll of Honor Memorial'  , 'Visitors Center, Class of 1944'  , 'Walker Golf Course Clubhouse'  , 'Woodland Cemeter'];

var cat = ['Housing','Facilities','Accessibility','Dining','Student Affairs','Other','Testing'];
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
class LoginScreen extends React.Component {
  handleLogin = () => {
    this.props.navigation.navigate('Report');
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
          <Image style={styles.image} source={require('./images/CUfixit.png')}/>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <TextInput/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true}/>
            </Item>
            <Button block
              onPress={this.handleLogin.bind(this)}>
              <Text>Login</Text>
            </Button>
          </Form>

        </Content>
      </Container>

    );
  }
}

class ReportScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user_name:'', building: '', description: '', phone_number: '',image_url:'',type:''};

  //  this._onPress = this._onPress.bind(this);
  }
  updateUser = (building_name) => {
     this.setState({ building_name: building_name })
  }
  handleSubmit = () => {
    var localType;
    fileType(this.state.image_url).then((type) => {
      localType = type.mime;
    });

    const file = {
      uri: this.state.image_url,
      name: this.state.image_url,
      type: "image/png"
    }

    //TODO: Mitchell pls help
    const options = {
      keyPrefix: "uploads/",
      bucket: "cufixit-images",
      region: "us-east-1",
      accessKey: "[AWS KEY HERE]",
      secretKey: "[AWS KEY HERE]",
      successActionStatus: 201
    }
    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      else {
      this.setState({image_url: response.body.postResponse.location});
      fetch('http://[HOST IP ADDRESS HERE]:8002/v1/submit', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
          });
    }
    });
  }

  render() {
    return (
      <Container style={styles.container}>
      <Header>
      <Body>
        <Image source={require('./images/CUfixit.png')} style={styles.image}/>
        </Body>
      </Header>
      <Content>
      <Button block
        onPress= {this.upload.bind(this)}>
        <Text>Attach a File</Text>
        </Button>
        <Text>User Name</Text>
        <TextInput
          onChangeText={(text) => this.setState({user_name: text})}/>
        <Text>Description</Text>
        <TextInput
          onChangeText={(text) => this.setState({description: text})}/>
        <Text>Phone Number</Text>
        <TextInput
          onChangeText={(text) => this.setState({phone_number: text})}/>
        <Text>Building</Text>
        <ModalDropdown options={build}
        onSelect={text => this.setState({building_name: build[text]})}/>
        <Text>Type</Text>
        <ModalDropdown options={cat}
        onSelect={text =>this.setState({type: cat[text]})}/>
        <Button block
                    onPress={this.handleSubmit.bind(this)}>
          <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    )
  }

upload = () => {
    ImagePicker.showImagePicker((response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else {
      //console.log(source);
      // You can also display the image using data:
       //let source = { uri: 'data:image/jpeg;base64,' + response.data };
      this.setState({
        image_url: response.uri
      });
    }
  });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  image: {
//    flex: 1,
  //padding-top:100,
    width: 275,
    height: 400,
    resizeMode: 'contain',
}
});

const RootStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Report: {
      screen: ReportScreen,
    },
  },
  {
    initialRouteName: 'Login',
  }
);

class StartUp extends React.Component {
  render() {
    return <RootStack />;
  }
}

AppRegistry.registerComponent("CUFixit", () => StartUp)
