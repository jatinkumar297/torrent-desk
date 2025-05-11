import React from "react"
import clsx from "clsx"

export default function Button({ className, prefix, suffix, children, error,...props }) {
	return (
		<button
			className={clsx(
				"h-auto input-component transition-colors duration-200 ease-in gap-1.5 bg-secondary hover:bg-accent",
				error ? "border-red-500/20 bg-red-500/15 text-red-500 hover:bg-red-500/25" : null,
				className
			)}
			{...props}
		>
			{prefix}
			{children}
			{suffix}
		</button>
	)
}
