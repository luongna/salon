import styled from '@emotion/styled';
import { MdLocationOn } from 'react-icons/md';
import { BiSolidPhone } from 'react-icons/bi';
import React from 'react';

const Branch = ({ address, phone }) => {
    return (
        <Wrapper>
            <Text>
                <LocationIcon />
                {address}
            </Text>
            <Text>
                <PhoneIcon />
                {phone}
            </Text>
        </Wrapper>
    );
};

const Wrapper = styled.div({
    backgroundColor: '#fff',
    padding: '5px 15px',

    ':hover': {
        backgroundColor: 'black',
        color: 'pink',
    },
});

const Text = styled.div({
    display: 'grid',
    gridTemplateColumns: '20px 1fr',
});

const LocationIcon = styled(MdLocationOn)({
    transform: 'translateY(4px)',
});

const PhoneIcon = styled(BiSolidPhone)({
    transform: 'translateY(3px)',
});

export default Branch;
