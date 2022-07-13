import React from 'react'
import {
    Box,
    Flex,
    Image,
    Text,
  } from "@chakra-ui/react";

export default function AccountCard() {
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
                src={'https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-1/189105409_2894014560916768_4280136462667900254_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=ahHQYgroQXYAX8fFcSK&_nc_ht=scontent.fhan3-2.fna&oh=00_AT8GrQS0jgTIy0euSvPRoKHane9Y1FqjvUPK74wM6JTjAw&oe=62F45297'}
            /> 
            <Text>Account name</Text>
        </Flex>
        <Flex>
            <Text marginRight={16}>Update</Text>
            <Text marginRight={16}>Cancel</Text>
        </Flex>
    </Flex>
  )
}
