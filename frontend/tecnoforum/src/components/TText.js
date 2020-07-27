import React from 'react';
import Typography from '@material-ui/core/Typography';

export const TText = ({v, g, p, children}) => {
	if ( v )
	{
		return (
			<Typography variant={v} gutterBottom={g} paragraph={p}>{children}</Typography>
		);
	}

	return (
		<Typography variant="body2" gutterBottom={g} paragraph={p}>{children}</Typography>
	);
}