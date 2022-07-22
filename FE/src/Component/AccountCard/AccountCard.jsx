import React from 'react'
import {
    Box,
    Flex,
    Image,
    Text,
  } from "@chakra-ui/react";

export default function AccountCard({account}) {
  return (
    <Flex display={'flex'} marginTop='6vh' border={'1px solid'}
        justifyContent='space-between'
        padding={'12px'}
    >
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
            <Text alignItems={'center'} marginRight={16}>Cancel</Text>
        </Flex>
    </Flex>
  )
}
