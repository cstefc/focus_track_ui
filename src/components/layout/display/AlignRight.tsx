import {Stack} from "@mui/material";

export interface IAlignRightProps {
    children?: React.ReactNode;
}

export const AlignRight = ({children}: IAlignRightProps) => {
    return (
        <Stack direction={"row"}
               spacing={"8px"}
               display={"flex"}
               margin={1}
               justifyContent={"flex-end"}
        >
            {children}
        </Stack>)
}