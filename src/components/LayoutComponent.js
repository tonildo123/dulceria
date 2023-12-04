import { Box} from '@mui/material';
import ResponsiveAppBar from './Navbar';
import Footer from './Footer';


const Layout = ({ children }) => {


  return (
    <Box>
      <ResponsiveAppBar />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
