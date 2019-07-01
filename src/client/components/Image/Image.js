import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'primereact/button';

import './Image.scss';
import ChainsActions from '../Chains/actions';

class Image extends React.Component {

  render() {

    return (
      <div
        className="image-root"
        style={{
          backgroundImage: 'url('+this.props.image+')',
          width: 100 + 'px',
          height: 100 + 'px'
        }}
      >
        <div>
          <Button
              icon="pi pi-th-large"
            onClick={() => this.props.onClickOpenLightBoxEventHandler(this.props.image)}/>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickOpenLightBoxEventHandler: (img) => {
      dispatch(ChainsActions.setActiveImage(img))
    },
    
  }
};

export default connect(null, mapDispatchToProps)(Image);
