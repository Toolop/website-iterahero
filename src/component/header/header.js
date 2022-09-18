import React, { useState, } from 'react'
import {
    Flex,
    Text,
    Icon,
    useDisclosure,
} from '@chakra-ui/react'
import { ImExit } from 'react-icons/im'
import { AiOutlineMenu } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux';
import Draw from '../draw/draw';


const Header = () => {

    const { routeName } = useSelector(
        state => state.userReducer,
    );
    console.log(routeName)

    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <Flex
            height={'80px'}
            bg={'#ffff'}
            padding={'20px'}
            justifyContent="space-between"
            alignItems={'center'}
            flexDirection={'row'}
            shadow='0 0 0 1px rgba(0, 0, 0, 0.1)'
        >
            <Icon as={AiOutlineMenu} fontSize="xl" color={"#09322D"}
                display={{
                    lg: 'none',
                }}
                onClick={onOpen}
            />

            <Draw data={{
                onclose: onClose,
                isopen: isOpen,
            }} />

            <Text color={'black'}>
                {routeName}
            </Text>

            <Flex flexDirection={'row'}>
                <Flex>
                    <Icon cursor={'pointer'} onClick={()=> window.open("someLink", "_blank")} as={ImExit} color={"#09322D"} fontSize="xl" />
                </Flex>
            </Flex>
        </Flex>
    )
}
export default Header