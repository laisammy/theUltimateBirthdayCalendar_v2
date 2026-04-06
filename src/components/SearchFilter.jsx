export default function SearchFilter({searchQuery, setSearchQuery, selectedTag, setSelectedTag, tags, onClear}) {
    return(
        <div className="flex flex-wrap items-center gap-3 bg-white rounded-full">
            <div className="relative">
                <input type="text" placeholder="Search by name or notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                className="pl-4 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none w-64"/>
            </div>

            <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none bg-white cursor-pointer">
                <option value="">All Tags</option>
                {tags.map((tag) =>(
                    <option key={tag} value={tag}>
                        {tag}
                    </option>
                ))}
            </select>
            {(searchQuery || selectedTag) && (
            <button onClick={onClear} 
            className="px-5 py-2 bg-gray-100 text-gray-600 font-medium rounded-full hover:bg-gray-200 transition-colors">
                Clear
            </button>
            )}
        </div>
    )

}