import React from "react"
import clsx from "clsx"

export default function Button({ className, prefix, suffix, children, ...props }) {
	return (
		<button
			className={clsx(
				"h-auto input-component transition-colors duration-200 ease-in gap-2 bg-secondary hover:bg-accent",
				// error ? "border-red-500 bg-red-500/10" : null,
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
