function Loader() {
    return (
        <div className="loader-container w-full absolute flex justify-center items-center top-0 left-0 h-screen bg-white bg-opacity-50">
            <div
                className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
                role="status"
                aria-label="Loading"
            ></div>
        </div>
    );
}

export default Loader;
