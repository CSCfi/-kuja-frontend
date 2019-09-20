import React, { useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";

const CategorizedListMemory = React.memo(props => {
  const changesRef = useRef(null);
  const { runRootOperations } = props;

  changesRef.current = useMemo(() => {
    return props.changes;
  }, [props.changes]);

  const getAllChanges = useCallback(() => {
    return changesRef.current;
  }, [])

  const run = useCallback(
    operations => {
      return runRootOperations(operations, changesRef.current);
    },
    [runRootOperations]
  );

  return (
    <div>
      {!!props.render
        ? props.render({
            changes: props.changes,
            runRootOperations: run,
            getAllChanges
          })
        : null}
    </div>
  );
});

CategorizedListMemory.propTypes = {
  changes: PropTypes.array,
  runRootOperations: PropTypes.func
};

export default CategorizedListMemory;
