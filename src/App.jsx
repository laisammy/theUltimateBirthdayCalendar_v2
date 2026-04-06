import BirthdayForm from "./components/BirthdayForm"

export default function App() {
	return(
		<div className="min-h-screen bg-linear-to-b from-yellow-100 to-stone-100 flex flex-col items-center justify-center gap-5 p-8">
			<div className="text-4xl font-bold">
				The Ultimate Birthday Calendar!
			</div>
			<div>
				<BirthdayForm/>
			</div>
		</div>
	)
}