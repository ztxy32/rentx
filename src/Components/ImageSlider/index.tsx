import React from "react";
import {Container, ImageIndexes, ImageIndex, CarImageWrapper, CarImage,} from "./style";

interface Props {
    imageUrl: string[],
}

export function ImageSlider({imageUrl}: Props){
    return(
        <Container>
            <ImageIndexes>
                <ImageIndex active={true}></ImageIndex>
                <ImageIndex active={false}></ImageIndex>
                <ImageIndex active={false}></ImageIndex>
                <ImageIndex active={false}></ImageIndex>
            </ImageIndexes>

            <CarImageWrapper>
                <CarImage source={{uri: imageUrl[0]}} resizeMode="contain"/>
            </CarImageWrapper>
        </Container>
    );
}