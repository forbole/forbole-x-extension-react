import {useRecoilState} from "recoil";
import {themeState} from "../../../recoil/general";
import { makeStyles} from '@material-ui/styles'

const useStyles = () => {
    const [theme] = useRecoilState(themeState)

    // hacky way to override mui colors
    const styleOverride: { [index: string]: any } = {
        light: {
            indicator: {
                backgroundColor: '#5C7BFF',
                color: '#5C7BFF'
            }
        },
        dark: {
            indicator: {
                backgroundColor: '#E6E6E6',
                color: '#E6E6E6'
            }
        },
    }

    return makeStyles(
        () => ({   indicator: {
                ...styleOverride[theme].indicator,
                width: '8px' // mui uses 8px incremental spacing
            },
            tab:{
                '& .MUI-selected': {
                    ...styleOverride[theme].indicator,
                },
            },
            customTab: {
                minWidth: 80
            }})
    )();
};

export default useStyles;