import { useState } from "react";
import BirthdayForm from "./components/BirthdayForm"
import BirthdayList from "./components/BirthdayList"

export default function App() {
	const [birthdays, setBirthdays] = useState([]);
	const [editingBirthday, setEditingBirthday] = useState(null);

	const handleAddBirthday = (formData) => {
		if (editingBirthday) {
			// Update existing birthday
			setBirthdays(birthdays.map(b =>
				b.id === editingBirthday.id
					? { ...formData, id: b.id }
					: b
			));
			setEditingBirthday(null);
		} else {
			// Add new birthday
			const newBirthday = {
				...formData,
				id: crypto.randomUUID()
			};
			setBirthdays([...birthdays, newBirthday]);
		}
	};

	const handleEditBirthday = (birthday) => {
		setEditingBirthday(birthday);
	};

	const handleDeleteBirthday = (id) => {
		setBirthdays(birthdays.filter(b => b.id !== id));
	};

	const handleCancelEdit = () => {
		setEditingBirthday(null);
	};

	return(
		<div className="min-h-screen bg-linear-to-b from-yellow-100 to-stone-100 flex flex-col items-center justify-center gap-5 p-8">
			<div className="text-4xl font-bold">
				The Ultimate Birthday Calendar!
			</div>
			<div className="w-full max-w-2xl space-y-6">
				<BirthdayForm
					birthday={editingBirthday}
					onSubmit={handleAddBirthday}
					onCancel={handleCancelEdit}
				/>
				<BirthdayList
					birthdays={birthdays}
					onEdit={handleEditBirthday}
					onDelete={handleDeleteBirthday}
				/>
			</div>
		</div>
	)
}