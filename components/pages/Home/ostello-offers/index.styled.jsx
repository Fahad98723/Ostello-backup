import styled from 'styled-components';

export const Container = styled.div`

    width:100%;
    margin:0 auto;
    
    .single-offer {
        width: 280px;
        height:280px;
    }

    &.offer .rec-pagination {
        margin-top:80px
    }

    &.offer .rec.rec-dot_active {
        width: 130px ;
        height:1px;
        border-radius: 5px;
        background-color: rgba(125, 35, 224, 1);
        border:none;
        box-shadow:0 0 1px 3px rgb(125 35 224 / 100%);
    }

    &.offer .rec-dot {
        height: 2px;
        width:30px;
        background-color: rgba(125, 35, 224, 0.3);
        border-radius: 5px;
        box-shadow:0 0 1px 3px rgb(125 35 224 / 30%);
    }

    @media screen and (max-width:768px) {
        &.offer .rec-pagination {
            display: none;
        }

        .single-offer {
            width:160px;
            height:160px;
        }
    }

    @media screen and (max-width:500px) {
        &.offer .rec .rec-item-wrapper {
            margin:0 5px;
            width:150px !important;
        }
    }
`