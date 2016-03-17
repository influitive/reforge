import { connect } from 'react-redux';
import NavLink from './components/nav-link';
import { push } from 'react-router-redux';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(push(ownProps.path))
});

export default connect(null, mapDispatchToProps)(NavLink);
