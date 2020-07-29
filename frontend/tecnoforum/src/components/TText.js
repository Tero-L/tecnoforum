import React from 'react';
import Typography from '@material-ui/core/Typography';

export const TText = ({v, g, p, c, children}) => {
	if ( !c )
		c = "p";
	if ( !v )
		v = "body2";

	return (
		<Typography variant={v} gutterBottom={g} paragraph={p} component={c}>{children}</Typography>
	);
}