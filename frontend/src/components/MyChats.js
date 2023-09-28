import React, { useEffect, useState, useContext } from 'react';
import { AddIcon, AtSignIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import ChatContext from "../Context/chat-context";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
//import { useHelper } from '../config/helper-hook';

const MyChats = ({ fetchAgain, onOpenHandler }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = useContext(ChatContext);
  //const {getSender}=useHelper();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      console.log(data, 'fetching all users chats in my chats');

    } catch (error) {

      console.log(error.message);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInformation"))); //chatLogics 
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  //fetching chats again witht the updated list of all of our chats...
  //--when we leave a group our updated list of chats needs to be fetched again

  return (
    <>
      <Box
        d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}

        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
        bg="#182126"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Work sans"
          d="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          color="white"
        >
          Chats
          <GroupChatModal>
            <Button bg="#319795" color="white" _hover={{ bg: "black.400" }}
              d="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
            >
              New Group
            </Button>
          </GroupChatModal>
        </Box>
        <Box
          d="flex"
          flexDir="column"
          p={3}

          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
          bg="#374e5b"

        >
          {chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat, i) => (

                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#182126" : "wheat"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                  </Text>
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
        <Box><Tooltip label="Chat with Ai bot!" hasArrow placement="bottom-end">
          <Button variant="ghost" bg='#319795' onClick={onOpenHandler} color="white"
            _hover={{ color: "yellow.400" }} _active={{ color: "yellow.400" }}>
            <AtSignIcon />
            
            <Text d={{ base: "none", md: "flex" }} px={4} fontWeight="bold">
              Talk to Ai
            </Text>
          </Button>
        </Tooltip>
        </Box>

      </Box>
    </>
  );
};

export default MyChats;
