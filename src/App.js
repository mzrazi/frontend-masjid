import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector} from "react-redux";
import { BrowserRouter, Navigate, Route, Outlet, Routes, Router } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Families from "scenes/families";
import { useState,useEffect } from "react";
import jwt_decode from "jwt-decode"



import Prayer from "scenes/prayer";
import Notifications from "scenes/notifications";
import Members from "scenes/members";
import Message from "scenes/message";
import Gallery from "scenes/gallery";
import Addimage from "scenes/addimage";
import EditEvent from "scenes/editevent";
import Events from "scenes/events";
import AddEvents from "scenes/addevents";
import Login from "scenes/login/login";
import Payments from "scenes/payments/payments";
import SendNotification from "scenes/sendnotification/sendnotification";
import Settings from "scenes/settings/settings";
import Users from "scenes/users/users";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

 const [isAuthenticated, setIsAuthenticated] = useState(true);




  console.log("done"+localStorage.token);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');

    console.log(token);
    console.log(expirationTime);
    if (token && expirationTime) {
      const decodedToken = jwt_decode(token);
      const currentTime = new Date().getTime() / 1000;
      if (decodedToken.exp > currentTime) {
        setIsAuthenticated(true);
      } else {
        console.log("called");
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
      }
    } else {
      setIsAuthenticated(false);
      console.log("else");
    }
  }, []);
 

  
 
  const PrivateRoutes = () => {
   console.log("state"+ isAuthenticated);
  return (
    isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
  )
  }

  const HandleLogout = () => {
    // clear authentication state
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    setIsAuthenticated(false);
    console.log("set false");
  }


  return (
    <div className="app">
    
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
        <Routes>
         <Route path="/" element={<Navigate to="/Login"/>}/>
          <Route element={<Layout handlelogout={HandleLogout}/>}>
              <Route element={<PrivateRoutes />}>
                
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/families" element={<Families />} />
                <Route path="/addevents" element={<AddEvents />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/addimage" element={<Addimage />} />
                <Route path="/prayertime" element={<Prayer />} />
                <Route path="/messages" element={<Message />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/editevents/:id" element={<EditEvent />} />
                <Route path="/members/:id" element={<Members />} />
                <Route path="/payments/:id" element={<Payments />} />
                <Route path="/sendnotification" element={<SendNotification />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/users" element={<Users />}/>
                
              </Route>
            
          </Route>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}/>} />
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
     
      
    </div>

    
  );
}

export default App;
