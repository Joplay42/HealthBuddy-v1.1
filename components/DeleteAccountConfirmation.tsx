// Props import
import { DeleteAccountConfirmationProps } from "@/types";
// Utils function import
import { deleteAccount } from "@/utils";

/**
 * This component is used to show a confirmation when deleting the account. It can set the error
 * if something is wrong and it can set the state of visibility.
 *
 * @param setState Set the visibility
 * @param setError Set the error message
 * @returns
 */
const DeleteAccountConfirmation = ({
  setState,
  setError,
}: DeleteAccountConfirmationProps) => {
  // This async arrow function is calling the deleteAccount method from utils
  const handleSubmit = async () => {
    // Handles all the error and displays it
    try {
      // Delete the account from firebase
      await deleteAccount();
    } catch (error: any) {
      // The error code that arrives frequently
      if (error.code == "auth/requires-recent-login") {
        // Show the error
        setError(
          "You need to re-login to delete this account. (auth/requires-recent-login)"
        );
      } else {
        // Show another error
        setError(error.message);
      }
    }
  };

  return (
    // DeleteAccountConfirmation container
    <div className="justify-center items-center w-full ">
      <div className="w-full max-h-full">
        <div className="relative">
          {/** Set the padding */}
          <div className="p-4 md:p-5 text-center">
            {/** Title */}
            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
              Are you sure you want to delete this account?
            </h3>
            {/** Button to delete account */}
            <button
              onClick={handleSubmit}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I&apos;m sure
            </button>
            {/** Button to cancel */}
            <button
              onClick={() => setState(false)}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountConfirmation;
