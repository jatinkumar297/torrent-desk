import { HiLocationMarker } from "react-icons/hi"
import { LuArrowLeft } from "react-icons/lu"
import { Link } from "react-router-dom"

export default function Header() {
	return (
		<header
			className="sticky -top-[1px] flex justify-between items-center px-hr py-5 z-[1000] transition-all duration-300 ease-in-out"
		>
			<Link href={"/"} className="flex items-center gap-2">
				{pathname !== "/" && (
					<div>
						<LuArrowLeft className="size-[22px] shrink-0" />
					</div>
				)}
				<span className="font-bold text-2xl tracking-tight">NodeTorrent</span>
			</Link>
			<div className="flex items-center gap-2">
				<HiLocationMarker className="text-white" size={22} />
				<span>Gondia</span>
			</div>
		</header>
	)
}
