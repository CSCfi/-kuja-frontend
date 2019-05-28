import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const LOADING_TEXT = {
  FI: "Ladataan..."
};

const Loading = () => {
  const text = LOADING_TEXT.FI;
  return (
    <div className="flex items-center mx-auto">
      <CircularProgress />
      <h3 className="ml-4">{text}</h3>
    </div>
  );
};

export default Loading;
