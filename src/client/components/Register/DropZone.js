import React, { Component,useMemo } from "react";
import Dropzone from "react-dropzone";


const maxSize = 1048576; //1mb
class DropZone extends Component {

  render() {
    const baseStyle = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderWidth: 2,
      borderRadius: 2,
      borderColor: '#eeeeee',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out'
    };
    return (
      <div style={baseStyle}>
        <Dropzone
          onDrop={this.props.onDrop}
          accept="image/jpeg, image/png"//whatever the file type needed
          minSize={0}
          maxSize={maxSize}
          multiple
          
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragReject,
            rejectedFiles
          }) => {
            const isFileTooLarge =
              rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
            return (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive
                  ? "Drop it when it's hot!"
                  : "Click me or drag a file to upload!"}
                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                {isDragReject && "File type not accepted, sorry!"}
                {isFileTooLarge && (
                  <div>File is too large.</div>
                )}
              </div>
            );
          }}
        </Dropzone>
      </div>
    );
  }
}
export default DropZone;