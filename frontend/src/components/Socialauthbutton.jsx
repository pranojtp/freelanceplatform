
function SocialAuthButton({ icon: Icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-gray-50 transition-colors duration-200 mb-3"
    >
      {/* <Icon className="w-5 h-5 mr-3" /> Render the passed Icon component */}
      {text}
    </button>
  );
}

export default SocialAuthButton;