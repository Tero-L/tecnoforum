import React from 'react';
import Typography from '@material-ui/core/Typography';

export const TText = ({v, g, p, c, color, children}) => {
	if ( !c )
		c = "p";
	if ( !v )
		v = "body2";
	if ( !color )
		color = "initial";

	return (
		<Typography variant={v} gutterBottom={g} paragraph={p} component={c} color={color}>{children}</Typography>
	);
}