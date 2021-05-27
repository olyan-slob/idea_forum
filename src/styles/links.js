import MaterialLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Link } from 'react-router-dom'

const InternalLink = ({ to, children, style }) => {
    return (
        <MaterialLink component={Link} style={style} to={to}>
            {children}
        </MaterialLink>
    )
}

const HeaderLink = ({ to, children }) => {
    return (
        <Typography variant="h3">
            <MaterialLink
                component={Link}
                to={to}
                color="inherit"
                style={{
                    color: '#181219',
                    fontFamily: 'Crimson Text',
                }}
            >
                {children}
            </MaterialLink>
        </Typography>
    )
}

export { InternalLink, HeaderLink }
