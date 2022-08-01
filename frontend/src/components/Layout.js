//This file is used to wrap around other components to center them
import React from 'react';
import Container from  'react-bootstrap/Container';

export const Layout = (props) => (
    <Container>
        {props.children}
    </Container>
)