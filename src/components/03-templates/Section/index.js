import React from "react";
import PropTypes from "prop-types";

const Section = React.memo(props => {
  return (
    <div className="flex">
      <div className="w-8 sm:w-16">
        {props.code && <h2 className="py-8">{props.code}.</h2>}
      </div>
      <div className="w-full">
        <h2 className="py-8">
          <span>{props.title}</span>
        </h2>
        <div className="pb-6">{props.children}</div>
      </div>
    </div>
  );
});

Section.propTypes = {
  code: PropTypes.number,
  title: PropTypes.string
};

export default Section;
