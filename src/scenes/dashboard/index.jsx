import React, { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  PersonOutlineOutlined,
  Diversity1Outlined,
  ChatBubbleOutline,
  Event,
  Home,
} from "@mui/icons-material";
import {
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Typography from '@mui/material/Typography';
import StatBox from "components/StatBox";


const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    userCount: 0,
    familyCount: 0,
    eventCount: 0,
    messageCount: 0,
 notificationCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/dashboard`);
        const data = await response.json();
        
        setData({
          userCount: data.userCount,
          familyCount: data.familyCount,
          eventCount: data.eventCount,
          messageCount: data.messageCount,
         notificationCount: data.notificationCount,
         
          
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total users"
          value={data.userCount}
          icon={
            <PersonOutlineOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total families"
          value={data.familyCount}
          icon={
            <Diversity1Outlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total events"
          value={data.eventCount}
          icon={
            <Event
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <StatBox
          title="Total messages"
          value={data.messageCount}
          icon={
            <ChatBubbleOutline
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total notifications"
          value={data.notificationCount}
          icon={
            <Home
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 3 - Fill the gap */}
        <Box
          gridColumn="1 / -1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ bgcolor: theme.palette.grey[200], borderRadius: "10px", height:"300px"}}
        >
          <Typography variant="h1" sx={{ color: theme.palette.grey[600] }}>
          السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ وَبَرَكاتُهُ
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

