"use client";
// Props import
import { cardProps, settingsCardProps } from "@/types";
// Utils function import
import { changeAccountName, confirmEmail, resetPassword } from "@/utils";
// Hooks import
import { useState } from "react";
// Nextjs image import
import Image from "next/image";
// Component import
import { AlertBox, DeleteAccountConfirmation } from "@/components/";
import { useRouter } from "next/navigation";

/**
 * This component is displaying each different form to handle the settings. The parameter
 * card has an id, title, description, input and button.
 *
 * @param card The card information
 * @returns
 */
const SettingsCard = ({ card }: cardProps) => {
  // FirstName state
  const [firstName, setFirstName] = useState("");
  // LastName state
  const [lastName, setLastName] = useState("");
  // Email state
  const [email, setEmail] = useState("");
  // Error state
  const [error, setError] = useState("");
  // Loading state
  const [loading, setLoading] = useState(false);
  // Success state
  const [succes, setSucces] = useState(false);
  // Message state
  const [message, setMessage] = useState("");
  // AccountDelete state
  const [accountDelete, setAccountDelete] = useState(false);
  // Router hooks
  const router = useRouter();

  // This arrow function is handling the submit event for each form depending of the type of the card
  const handleSubmit = async ({ event }: settingsCardProps) => {
    // Prevent reload
    event.preventDefault();
    // Set the loading animation to true
    setLoading(true);
    // Default state
    setError("");
    setMessage("");
    setSucces(false);

    // Handling the reset password
    if (card.title == "Reset password") {
      try {
        // Utils function to reset the password
        await resetPassword({ email });
        // Set the confirmation message
        setMessage("A reset password email has been sent!");
        setSucces(true);
        // Handling the error
      } catch (error: any) {
        setError(error.message);
      }
      // Handling the account confirmation
    } else if (card.title == "Confirm account") {
      try {
        // Utils function to send a confirmation email to confirm the account
        await confirmEmail();
        setMessage("An account confirmation email has been sent!");
        setSucces(true);
      } catch (error: any) {
        setError(error.message);
      }
      // Handling the account name change
    } else if (card.title == "Account name") {
      try {
        // Utils function to change the first and last name of the user
        await changeAccountName({ firstName: firstName, lastName: lastName });
        setMessage("The account's name has been changed!");
        setSucces(true);
      } catch (error: any) {
        setError(error.message);
      }
      // Handling the account deletion
    } else if (card.title == "Delete account") {
      // Set the state to true to display a confirmation message
      setAccountDelete(true);
    } else if (card.title == "Set objective") {
      const url = router.push("/dashboard/setting?modal=objective", {
        scroll: false,
      });
    } else if (card.title == "Create food") {
      const url = router.push("/dashboard/setting?modal=addfood", {
        scroll: false,
      });
    } else if (card.title == "Create recipe") {
      const url = router.push("/dashboard/setting?modal=addrecipe&index=1", {
        scroll: false,
      });
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    // Make the loading animation stop
    setLoading(false);
  };

  return (
    <div id={card.id} className="p-10 bg-white rounded-xl w-full space-y-2">
      {/** Form container */}
      <form onSubmit={(e) => handleSubmit({ event: e })}>
        {/** Title */}
        <h1 className="text-2xl font-semibold">{card.title}</h1>
        {/** Description */}
        <p className="pb-4">{card.description}</p>
        <hr className="border-neutral-400" />
        <div className="lg:flex gap-x-5 pt-4 pb-10">
          {/** If the card has an input to enter */}
          {card.input.length == 1 ? (
            <div className="flex flex-col w-full gap-y-2">
              {/** Display the label above */}
              <label className="font-bold">{card.input[0]}</label>
              {/** Display the input */}
              <input
                className="border-2 border-black rounded-lg px-3 py-2"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
          ) : (
            // If there is 2 inputs, for the first and lastName
            card.input.length > 1 && (
              <>
                <div className="flex flex-col w-full gap-y-2">
                  {/** label obove */}
                  <label className="font-bold">{card.input[0]}</label>
                  {/** The firstName input */}
                  <input
                    className="border-2 border-black rounded-lg  px-3 py-2"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                  />
                </div>
                <div className="flex flex-col w-full gap-y-2">
                  {/** Last Name label */}
                  <label className="font-bold">{card.input[1]}</label>
                  {/** The last Name input */}
                  <input
                    className="border-2 border-black rounded-lg  px-3 py-2"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                  />
                </div>
              </>
            )
          )}
        </div>
        {/** Error handling */}
        {error && <p className="text-red-500">{error}</p>}
        {/** Display a success message */}
        {succes && (
          // The alertBox component to display the message
          <AlertBox variant="success" setVisibility={setSucces}>
            {message}
          </AlertBox>
        )}
        {/** If the user want to delete the account */}
        {accountDelete && (
          // Delete account confirmation component
          <DeleteAccountConfirmation
            setState={setAccountDelete}
            setError={setError}
          />
        )}
        {/** Submit button */}
        <button
          className={`flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 hover:transition ease-in-out duration-300  text-white w-full disabled:opacity-60 ${
            // handle the button color and style depneding of the card
            card.title === "Delete account" && accountDelete
              ? "hidden"
              : card.title === "Delete account"
              ? "bg-red-500"
              : "bg-black"
          }`}
          type="submit"
          disabled={loading}
        >
          {/** The button text */}
          {card.button}
          {/** Make the loading animation */}
          {loading && (
            <Image
              src="/loading.gif"
              width={40}
              height={40}
              alt="Loading gif"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default SettingsCard;
