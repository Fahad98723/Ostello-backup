import styled from 'styled-components';

export const Container = styled.div`
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
    
    &.show {
        display:flex;
        justify-content:space-between;
    }

    @media screen and (min-width:768px) {
        display:none !important;
    }
`