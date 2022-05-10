import React from "react";
import { ImageIndex } from "./style";

interface BulletProps{
    active?: boolean;
}

export function Bullet({active = false}:BulletProps){
    return(
        <ImageIndex active={active} />
    );
}