import clsx from "clsx"
import React from "react"

export default function Progress({ value = 0, className, ...props }) {
	return (
		<div
			{...props}
			className={clsx(
				"h-3 rounded-full w-full overflow-hidden bg-accent border border-accent-highlight",
				className
			)}
		>
			<span className="bg-white h-full block" style={{ width: `${Math.min(value, 100)}%` }} />
		</div>
	)
}
