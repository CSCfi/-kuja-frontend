import React from "react";
import PropTypes from "prop-types";

const LupaSection = props => {
  const { kohde } = props;

  if (kohde.heading && kohde.values && kohde.values.length > 0) {
    const { heading, values } = kohde;
    const elements = values.map((item,i) => (<p key={i}>{item}</p>));
    return (
      <div className="flex">
        <div className="w-full">
          {heading && (
            <h2 className="py-8">
              <span>{heading}</span>
            </h2>
          )}
          <div className="pb-4">{elements}</div>
        </div>
      </div>
    )
  } else {
    return (<></>)
  }
};

LupaSection.propTypes = {
  kohde: PropTypes.object
}

export default LupaSection;
