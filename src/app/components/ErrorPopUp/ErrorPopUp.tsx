import React from "react";

const ErrorPopUp: React.FC<{
  errorMessage: string;
  onClose: () => void;
}> = ({ errorMessage, onClose }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl max-w-[600px] max-h-[80vh] overflow-y-auto z-50">
        <div className="flex flex-col gap-5 pr-8 pl-8 pb-4 pt-4 rounded-2xl max-w-[600px] max-h-min">
          <h2 className="text-3xl font-semibold">Error</h2>
          <p>{errorMessage}</p>
          <div className="flex justify-end align-bottom">
            <button
              onClick={onClose}
              className="sticky bg-status text-white p-2 rounded-md w-24 bottom-0 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopUp;
