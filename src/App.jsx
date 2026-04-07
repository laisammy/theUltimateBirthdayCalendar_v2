import { useState, useEffect, useRef } from "react";
import BirthdayForm from "./components/BirthdayForm"
import BirthdayList from "./components/BirthdayList"
import SearchFilter from "./components/SearchFilter";

export default function App() {
    const [birthdays, setBirthdays] = useState([]);
    const [editingBirthday, setEditingBirthday] = useState(null);
    const [tags] = useState(['Family', 'Friends', 'Work']);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("birthdays");
        console.log("Loading from localStorage:", saved);
        if (saved) {
            const parsed = JSON.parse(saved);
            console.log("Parsed birthdays:", parsed);
            setBirthdays(parsed);
        } else {
            console.log("No saved birthdays found");
        }
        setHasLoaded(true);
        console.log("hasLoaded set to true");
    }, []);

	useEffect(() => {
		if (!hasLoaded) return;
		console.log("Saving to localStorage:", birthdays);
		localStorage.setItem("birthdays", JSON.stringify(birthdays));
	}, [birthdays, hasLoaded]);


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
				id: Date.now().toString(36) + Math.random().toString(36).substr(2)
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

	const filteredBirthdays = birthdays.filter(b => {
		const name = (b.name || "").toLowerCase();
		const notes = (b.notes || "").toLowerCase();
		const query = searchQuery.toLowerCase();

		const matchesSearch =
			name.includes(query) || notes.includes(query);

		const matchesTag =
			selectedTag === "" || b.tags === selectedTag;

		return matchesSearch && matchesTag;
	});

	console.log("Loaded birthdays:", birthdays);

	return(
			<div className="min-h-screen bg-linear-to-b from-yellow-100 to-stone-100 p-8 flex flex-col items-center gap-5">
				<div className="text-4xl font-bold">
					The Ultimate Birthday Calendar!
				</div>

				<div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
					
					<div className="flex flex-col gap-6">
						<SearchFilter 
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							selectedTag={selectedTag}
							setSelectedTag={setSelectedTag}
							tags={tags}
							onClear={() => {
								setSearchQuery("");
								setSelectedTag("");
							}}
						/>

						<BirthdayList
							birthdays={filteredBirthdays}
							onEdit={handleEditBirthday}
							onDelete={handleDeleteBirthday}
						/>
					</div>

					<BirthdayForm
						birthday={editingBirthday}
						onSubmit={handleAddBirthday}
						onCancel={handleCancelEdit}
					/>
				</div>
			</div>

	)
}