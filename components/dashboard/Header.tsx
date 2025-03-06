"use client";
// component import
import { HeaderSqueleton, PageName } from "@/components";
import { useFirebaseAuth } from "@/context/UserContext";
import { fetchDataFromApi, writeToFirestoreWithRandomIds } from "@/utils/seed";
import { useRouter } from "next/navigation";

/**
 * This component is the dashboard header, it displays the current page and the
 * username
 *
 * @returns
 */
const Header = () => {
  // The context to get the currentUser
  const user = useFirebaseAuth();

  // Create router hooks
  const router = useRouter();

  // Manage the loading states
  const isLoading = !user;

  if (isLoading) {
    return <HeaderSqueleton />;
  }

  /**
   * This function is used only for development to populate the database for the food
   */
  const handleButtonClick = async () => {
    router.push("/dashboard?modal=admin", { scroll: false });

    /**try {
      // First, fetch data from the API
      const fetchedFoods = await fetchDataFromApi();
      console.log(fetchedFoods);

      // Then, write the fetched data to Firestore
      if (fetchedFoods && fetchedFoods.length > 0) {
        await writeToFirestoreWithRandomIds(fetchedFoods);
        console.log("Data successfully written to Firestore.");
      } else {
        console.log("No valid foods to write.");
      }
    } catch (err) {
      console.error(err);
    }**/
  };

  return (
    // Header container
    <div className="flex justify-between items-center pr-12">
      <div className="py-9 pl-12 border-b border-neutral-300">
        {/** Displays the current page name */}
        <PageName />
        {/** Displays a nice greeting message */}
        <p className="text-md">
          {/** TO DO - DISPLAY THE USERNAME */}
          Welcome back <span className="font-bold">{user.displayName}👋</span>
        </p>
      </div>
      {/** Only for development delete once in production */}
      <button onClick={handleButtonClick}>Dev mode</button>
    </div>
  );
};

export default Header;
