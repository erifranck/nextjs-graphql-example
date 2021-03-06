import { Box } from '@chakra-ui/layout';
import { Center, Image } from '@chakra-ui/react';
import image from 'next/image';
import React from 'react';

interface Props { 
    imageUrl: string;
    missionName: string;
    rocketName: string;
    missionDetails?: string;
    onClick?: () => void;
}
export const Card: React.FC<Props> = (props) => {
    return (
        <Box borderWidth="1px" borderRadius="lg" shadow="xs" onClick={ () => { if (props.onClick) props.onClick() }} >
            <Box h="300px" overflow="hidden" borderBlockEndWidth="2px" >
                <Center>
                    <Image src={props.imageUrl} />
                </Center>
            </Box>
            <Center>
                <Box boxSize="sm" pt="20px" overflow="hidden" >
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h2"
                        fontSize="xl"
                        textTransform="uppercase"
                        lineHeight="tight"
                        isTruncated
                    >
                        {props.missionName}
                    </Box>
                    <Box
                        mt="1"
                        color="gray.400"
                        fontWeight="semibold"
                        as="span"
                        fontSize="md"
                        textTransform="uppercase"
                        lineHeight="tight"
                    >
                        {props.rocketName}
                    </Box>
                    <Box
                        mt="5"
                        color="gray.700"
                        fontWeight="semibold"
                        as="p"
                        fontSize="md"
                        textTransform="capitalize"
                        lineHeight="tight"
                    >
                        {props.missionDetails || `this mission doesn't have details to show`}
                    </Box>
                </Box> 
            </Center>
        </Box>
    )
}