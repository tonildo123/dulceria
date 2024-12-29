import { Box } from '@mui/material';
import ResponsiveAppBar from './Navbar';

const Layout = ({ children }) => {

  return (
    <Box>
      <ResponsiveAppBar />
      {children}
    </Box>
  );
};

export default Layout;
