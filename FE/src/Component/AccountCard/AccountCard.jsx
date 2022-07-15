import React from 'react'
import {
    Box,
    Flex,
    Image,
    Text,
  } from "@chakra-ui/react";

export default function AccountCard(account) {
  return (
    <Flex display={'flex'} marginTop='6vh' border={'1px solid'}
        justifyContent='space-between'
        padding={'12px'}
    >
        <Flex display={'flex'}>
            <Image
                height={50}
                width={50}
                borderRadius={100}
                marginRight={16}
                src={account.avatar}
            /> 
            <Text>Account name {account.accountname}</Text>
        </Flex>
        <Flex>
            <Text marginRight={16}>Update</Text>
            <Text marginRight={16}>Cancel</Text>
        </Flex>
    </Flex>
  )
}
