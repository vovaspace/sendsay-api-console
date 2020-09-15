import PropTypes from 'prop-types';


export const StylePropType = PropTypes.objectOf(PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]));
