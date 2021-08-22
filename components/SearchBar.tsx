import React, { ChangeEvent } from 'react';
import { Input } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';

interface Props {
    search: string;
    onChange: (value: string) => void;
}
export const SearchBar: React.FC<Props> = (props) => {
    return (
        <Box borderBlockEndWidth="2px" h="100px" p="20px" >
            <Input
                placeholder="Search Mission"
                value={props.search}
                onChange={(ev: ChangeEvent<HTMLInputElement>) => {props.onChange(ev.currentTarget.value)}}
            />
        </Box>
    )
}