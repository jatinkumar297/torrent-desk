import React from "react"
import LabelWrapper from "./LabelWrapper.jsx"
import clsx from "clsx"

export default function Input({
	label,
	labelClassName,
	prefix,
	suffix,
	className,
	type,
	value,
	textArea,
	error,
	displayValue,
	...props
}) {
	return (
		<LabelWrapper
			label={label}
			className={clsx(props.disabled ? "opacity-50" : null, labelClassName)}
			required={props.required}
		>
			<div
				className={clsx(
					"h-auto input-component transition-colors duration-200 ease-in",
					error ? "border-red-500 bg-red-500/10" : null,
					className
				)}
			>
				{typeof prefix === "string" ? (
					prefix
				) : prefix?.element ? (
					prefix?.element
				) : prefix?.Icon ? (
					<prefix.Icon className={"shrink-0 size-5 opacity-80 " + (prefix.className || "")} />
				) : null}

				{!textArea ? (
					<input
						type={type || "text"}
						{...(type === "file" ? {} : { value })}
						{...props}
						className={clsx(
							"flex-1 bg-none border-none outline-none min-w-0",
							props.inputClassName
						)}
					/>
				) : (
					<textarea
						{...{ value, ...props }}
						className={clsx(
							"flex-1 bg-none border-none outline-none min-w-0 min-h-[10vh]",
							props.inputClassName
						)}
					/>
				)}

				{displayValue && displayValue}

				{suffix?.element ? (
					suffix?.element
				) : suffix?.Icon ? (
					<suffix.Icon className={"shrink-0 size-5 opacity-80 " + (suffix.className || "")} />
				) : null}
			</div>
			{error ? <small className="text-red-500 block mt-1">{error}</small> : null}
		</LabelWrapper>
	)
}
