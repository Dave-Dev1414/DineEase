import { useNotification } from "../context/NotificationContext"

function NotificationTest() {
  const { showNotification } = useNotification()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf2]">
      <button
        type="button"
        onClick={() => showNotification("This is a DineEase notification.")}
        className="px-5 py-3 bg-black text-white rounded-xl font-[DM_Sans]"
      >
        Test Notification
      </button>
    </div>
  )
}

export default NotificationTest