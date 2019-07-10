import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const LOADING_TEXT = {
  FI: "Ladataan..."
};

const Loading = (props) => {
  const { text } = props;
  let loadingtext;
  if (text) {
    loadingtext = text;
  }
  else 
    loadingtext = LOADING_TEXT.FI;

  return (
    <div className="flex items-center mx-auto">
      <span className="mr-6">
        <CircularProgress />
      </span>
      <h3 className="ml-4">{loadingtext}</h3>
    </div>
  );
};

export default Loading;
