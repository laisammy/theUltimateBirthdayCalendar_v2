export default function BirthdayList({birthdays, onEdit, onDelete}) {
    const formatDate = (dateStr) => {
        if (!dateStr || !dateStr.includes("-")) return "Invalid date";

        try {
            const [year, month, day] = dateStr.split("-");
            const date = new Date(2000, parseInt(month) - 1, parseInt(day));
            return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        } catch {
            return "Invalid date";
        }
    };

    if (!birthdays || birthdays.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                <p className="text-gray-500 text-lg">No birthdays found. Add one to get started!</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {birthdays.map((birthday) => {
            if (!birthday || !birthday.id) return null;

            return (
                <div key={birthday.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800">
                                {birthday.name || 'Unnamed'}
                            </h3>

                            <p className="text-yellow-600 font-semibold">
                                {formatDate(birthday.date)}
                            </p>

                            {birthday.tags && birthday.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                {birthday.tags.split(',').map((tag, i) => (
                                    <span
                                    key={i}
                                    className="px-3 py-1 text-sm bg-pink-100 text-orange-700 rounded-full"
                                    >
                                    {tag.trim()}
                                    </span>
                                ))}
                                </div>
                            )}

                            {birthday.notes && (
                                <p className="text-gray-500 mt-2 text-sm">{birthday.notes}</p>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button onClick={() => onEdit(birthday)} className="px-4 py-2 text-sm font-medium text-yellow-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                Edit
                            </button>
                            <button onClick={() => onDelete(birthday.id)} className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            );
            })}
        </div>
    );
}