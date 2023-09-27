import React from 'react';
import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";


const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered >
        <ModalOverlay />
        <ModalContent h="380px" bg="#22c4b2">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
            fontWeight="bold"
            bg="#000"
            color="yellow.400"
          >
            {user.name}
          </ModalHeader>
          
          <ModalBody 
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar size="2xl" name={user.name} borderColor="black" borderWidth="2px" bg="#319795" color="black"/>
            <Text
              fontSize={{ base: "28px", md: "30px" }} fontWeight="bold" color="black"
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter >
            <Button onClick={onClose} colorScheme='red'>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default ProfileModal;