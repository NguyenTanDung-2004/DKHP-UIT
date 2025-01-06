import React, { useState } from "react";
import { resetPassword } from "../../services/authServices";
import { ClipLoader } from "react-spinners";

const ForgetPasswordModal = ({ isOpen, onClose }) => {
  const [account, setAccount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleChangeAccount = (e) => setAccount(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setIsSuccess(false);
    try {
      const response = await resetPassword(account);
      if (response.ok) {
        setIsSuccess(true);
        setMessage("Vui lòng kiểm tra email để nhận mật khẩu mới");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reset password");
      }
    } catch (error) {
      setError(error.message || "Lỗi khi đặt lại mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-[400px]  overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-xl">QUÊN MẬT KHẨU</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {!isSuccess && (
            <div className="flex flex-col">
              <div className="mb-4 flex flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Tài khoản:
                </label>
                <input
                  type="text"
                  name="account"
                  value={account}
                  onChange={handleChangeAccount}
                  className="mt-1 block w-full border rounded px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
          )}

          {message && (
            <div className="text-black mb-4 text-center">{message}</div>
          )}
          {error && (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          )}
          <div className="flex justify-end mt-4 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-2"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="bg-[#2F6BFF] text-white py-2 px-4 rounded shadow-xl hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color={"white"} loading={loading} size={20} />
              ) : (
                "Đặt lại mật khẩu"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgetPasswordModal;
