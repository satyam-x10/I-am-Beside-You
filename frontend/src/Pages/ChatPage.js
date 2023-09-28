import React, { useState, useContext} from "react";
import ChatContext from "../Context/chat-context";
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import { Box } from '@chakra-ui/react';
import AiChat from "../components/miscellaneous/AiChat";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useContext(ChatContext);
  const [onOpen, setOnOpen] = useState(false);

  /*  const navigate = useNavigate();
  const isRefreshingRef = useIsRefreshingRef() */
  const onOpenHandler = () => {
    setOnOpen(true);
  }
  //navigate('/chats');

  return (
    <React.Fragment>
      {onOpen && 
        <AiChat setOnOpen = {setOnOpen} />
      }
      <div style={{ width: "100%" }}>
      
            {user && <SideDrawer />}
            <Box d="flex" justifyContent="space-between" width="100%" h="90.5vh" p="12px">
              {user && ( <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
              {user && <MyChats fetchAgain={fetchAgain} onOpenHandler = {onOpenHandler}/>}
            </Box>
        
      </div>
    </React.Fragment>
  );
};

export default ChatPage;
