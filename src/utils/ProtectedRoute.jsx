import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({
  redirectPath,
  children,
  isLogged,
}) {

  if (!isLogged) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;