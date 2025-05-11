import clsx from "clsx"
import React from "react"

export default function Progress({ value = 0, className, loading, ...props }) {
	return (
		<div
			{...props}
			className={clsx(
				"h-2.5 rounded-full w-full overflow-hidden bg-accent border border-accent-highlight relative",
				className
			)}
		>
			{loading ? (
				<span class='loader bg-white h-full block absolute top-0 left-0 box-border w-1/3' />
			) : (
				<span className='bg-white h-full block' style={{ width: `${Math.min(value, 100)}%` }} />
			)}
		</div>
	)
}
