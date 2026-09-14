import { X } from "lucide-react"

function DineEaseNotification({ message, onClose }) {
  if (!message) return null

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg px-4 pt-4">
      <div className="bg-white border border-gray-200 shadow-[0_15px_50px_rgba(0,0,0,0.12)] rounded-2xl px-5 py-4 flex items-center justify-between gap-4 animate-[slideDown_0.4s_ease-out]">
        <p className="font-[DM_Sans] text-sm font-medium text-[#171717]">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-gray-400 hover:text-black transition-colors duration-200"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

export default DineEaseNotification