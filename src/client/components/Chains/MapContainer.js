import React from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';


export class MapContainer extends React.Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker
    chainName: "",
    location: {
      description: "",
      location: {
        lat: 0,
        lng: 0
      }
    }
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%'
    }

    const { jointId } = this.props.match.params
    const { location } = this.props.location.state
    const lat = location.lat
    const lng = location.lng
    return (
      <div>
        <Map
          google={this.props.google}
          style={mapStyles}
          initialCenter={{
            lat: location.location.lat,
            lng: location.location.lng
          }}
          zoom={15}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={jointId + " ," + location.description}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyD3QiGKOJxZN_GL6Bp0hGMz-cXyLqKEkSk'
})(MapContainer)