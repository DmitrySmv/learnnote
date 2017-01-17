import React, { PropTypes } from 'react';

const maxCountOfColumns = 12;

const Grid = ({ columnsCount, children }) => {
  const size = maxCountOfColumns / columnsCount;

  const wrappedChildren = React.Children.map(children, (child, i) => {
    const endClassName = i === children.length - 1 ? 'end' : '';
    const className = `large-${size} columns ${endClassName}`;
    return (<div className={className}>
      {child}
    </div>);
  });

  return (<div className='row'>{wrappedChildren}</div>)
};

Grid.propTypes = {
  columnsCount: PropTypes.number.isRequired
}

export default Grid;
