import { useState, useEffect } from "react";

export default function BirthdayForm({birthday, onSubmit, onCancel}) {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        tags: '',
        notes: ''
    });

    useEffect(() => {
        if (birthday) {
            setFormData({
                name: birthday.name || '',
                date: birthday.date || '',
                tags: birthday.tags || '',
                notes: birthday.notes || ''
            });
        } else {
            setFormData({
                name: '',
                date: '',
                tags: '',
                notes: ''
            });
        }
    }, [birthday]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSave = { ...formData };

        onSubmit(dataToSave);

        if (!birthday) {
            setFormData({
                name: "",
                date: "",
                tags: "",
                notes: ""
            });
        }
    };


    return(
        <form onSubmit = {handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100 min-w-md">
            <div className="text-2xl font-bold text-gray-800 mb-6">
                {birthday ? 'Edit Birthday' : 'Add New Birthday'}
            </div>
            <div className="grid gap-6">
                <div> {/* Name Input */}
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name *
                    </label>
                    <input type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all" placeholder="e.g., John Doe"/>
                </div>

                <div> {/* Date Input */}
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Birthday Date *
                    </label>
                    <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"/>
                </div>

                <div> {/* Tag Input */}
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags (comma separated)
                    </label>
                    <select
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select a tag</option>
                        <option value="Family">Family</option>
                        <option value="Friends">Friends</option>
                        <option value="Work">Work</option>
                    </select>
                </div>

                <div> {/* Note Input */}
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notes
                    </label>
                    <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}              // Sets height to 3 lines
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all resize-none" placeholder="e.g., Favorite cake, gift ideas..."/>
                </div>

                <div className="flex gap-4 pt-2"> {/* Buttons */}
                    <button type="submit" className="flex-1 px-6 py-3 bg-linear-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                    {birthday ? 'Update Birthday' : 'Add Birthday'}
                    </button>

                    <button type="button" onClick={onCancel} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">
                    Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}