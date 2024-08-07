import React from "react";

const Layout = (props: React.PropsWithChildren<Record<string, unknown>>) => {
	return (
		<>
			<main>{props.children}</main>
		</>
	);
};

export default Layout;
