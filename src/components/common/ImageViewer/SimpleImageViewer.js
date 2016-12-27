import React, { PropTypes } from 'react';

export default class SimpleImageViewer extends React.Component{
  static get propTypes(){
    return {
      imageUrl : PropTypes.string.isRequired,
    }
  }

  constructor(props){
    super(props);
  }

  render(){
    const { imageUrl } = this.props;
    return (
      <div>
        <h1>testing</h1>
        <img
          src={imageUrl}
          width={100}
          height={100}
        />
      </div>
    )
  }
}