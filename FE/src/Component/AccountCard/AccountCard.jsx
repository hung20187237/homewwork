import React from 'react'
import {
    Box,
    Flex,
    Image,
    Text,
  } from "@chakra-ui/react";
  import { useState, useContext } from 'react';
  import { Context } from "../../context/Context";
  import axios from "axios";
  

export default function AccountCard({account}) {
  const { user: currentUser} = useContext(Context);
  const [currentaccount, setCurrentAccount] = useState(account);

  const handleAccountDelete = async () => {
    try {
      await axios.delete("http://localhost:8800/api/account/" + account._id, { data: { userId: currentUser._id } });
      setCurrentAccount(null)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAccountUpdate = async () => {
    try {
      await axios.put("http://localhost:8800/api/account/" + account._id, { 
        data: { 
          userId: currentUser._id,
          account
        },

      });
      setCurrentAccount(null)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Flex display={'flex'} marginTop='6vh' border={'1px solid'}
        justifyContent='space-between'
        padding={'12px'}
    >
      {currentaccount?
        <>
          <Flex display={'flex'} alignItems={'center'}>
              <Image
                height={50}
                width={50}
                borderRadius={100}
                marginRight={16}
                src={account.avatar}
              /> 
              <Text alignItems={'center'} fontSize={20} justifyContent='center' >{account.accountname}</Text>

          </Flex>
          <Flex justifyContent='center' alignItems={'center'} >
              <Text alignItems={'center'} marginRight={16}>Update</Text>
              {account.userId == currentUser._id ? 
              <Text alignItems={'center'} marginRight={16} onClick={handleAccountDelete} >Cancel</Text>
              : null}
          </Flex>
        </>
      :null}
    </Flex>
  )
}
