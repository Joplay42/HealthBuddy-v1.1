"use client";
import { SearchBar, Tablet } from "@/components";
import { foodProps } from "@/types";
import { fetchDataFromApi, writeToFirestoreWithRandomIds } from "@/utils/seed";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const AdminDatabase = () => {
  // State hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [terms, setTerms] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [seedItem, setSeedItem] = useState<string[]>([]);
  const [fetchedFoods, setFetchedFoods] = useState<foodProps[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Add keyword to the list
  const addKeyword = useCallback((newItem: string) => {
    setTerms((prev) => [...prev, newItem]);
    setSearchTerm(""); // Reset input
  }, []);

  // Remove keyword from the list
  const removeKeyword = useCallback((item: string) => {
    setTerms((prev) => prev.filter((term) => term !== item));
  }, []);

  // Log messages to the state
  const logMessage = useCallback((message: string) => {
    setLogs((prev) => [...prev, message]);
  }, []);

  // Add seed item to the list
  const addSeedItem = useCallback((item: string) => {
    setSeedItem((prev) => [...prev, item]);
  }, []);

  // Verify food availability in the database
  const handleVerification = useCallback(async () => {
    setLoading(true);
    setLogs([]);
    setIsSeeding(false);

    for (const term of terms) {
      try {
        const res = await fetch(`/api/foods?search=${term}`);
        const data = await res.json();

        if (res.ok) {
          logMessage(`${term} is already in the database.`);
          removeKeyword(term);
        } else {
          logMessage(`${term} is not in the database.`);
          addSeedItem(term);
          setIsSeeding(true);
        }
      } catch (error) {
        logMessage(`Error verifying ${term}: ${error}`);
      }
    }

    setLoading(false);
  }, [terms, logMessage, removeKeyword, addSeedItem]);

  // Fetch data for seeding
  const handleSeeding = useCallback(async () => {
    try {
      setSeedItem([]); // Reset seed items
      const res = await fetchDataFromApi(seedItem);
      console.log(res);
      if (res) {
        setFetchedFoods(res);
        setShowConfirmation(true);
      }
    } catch (err) {
      console.error("Seeding failed:", err);
    }
  }, [seedItem]);

  // Write fetched data to Firestore
  const handleWriting = useCallback(async () => {
    setShowConfirmation(false);

    if (fetchedFoods.length > 0) {
      await writeToFirestoreWithRandomIds(fetchedFoods);
      console.log("Data successfully written to Firestore.");
      setIsSeeding(false);
    } else {
      console.log("No valid foods to write.");
    }
  }, [fetchedFoods]);

  // Capture console logs into state
  useEffect(() => {
    const originalConsoleLog = console.log;

    console.log = (...args) => {
      const formattedMessage = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
        )
        .join(" ");

      setLogs((prev) => [...prev, formattedMessage]);
      originalConsoleLog(...args);
    };

    return () => {
      console.log = originalConsoleLog; // Restore original console.log
    };
  }, []);

  return (
    <div className="w-full p-5 space-y-6">
      <h1 className="font-semibold text-2xl text-center mb-10">
        Add Food to Database
      </h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSubmit={() => addKeyword(searchTerm)}
      />

      {terms.length > 0 && (
        <div className="flex flex-wrap gap-x-2">
          {terms.map((term, index) => (
            <Tablet
              key={index}
              text={term}
              onClose={() => removeKeyword(term)}
            />
          ))}
        </div>
      )}

      {logs.length > 0 && (
        <div className="space-y-2">
          {logs.map((log, index) => (
            <p key={index} className="text-red-500">
              {log}
            </p>
          ))}
        </div>
      )}

      {isSeeding && (
        <div className="flex flex-row space-x-4">
          <button
            className="flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
            type="button"
            disabled={loading}
            onClick={handleSeeding}
          >
            Seed the Database
            {loading && (
              <Image src="/loading.gif" width={40} height={40} alt="Loading" />
            )}
          </button>

          {showConfirmation && (
            <button
              className="flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
              type="button"
              disabled={loading}
              onClick={handleWriting}
            >
              Write to Database
            </button>
          )}
        </div>
      )}

      <button
        className="flex items-center gap-2 justify-center py-4 px-3 rounded-xl hover:opacity-75 transition ease-in-out duration-300 bg-black text-white w-full disabled:opacity-60"
        type="button"
        disabled={loading}
        onClick={handleVerification}
      >
        Verify Data
        {loading && (
          <Image src="/loading.gif" width={40} height={40} alt="Loading" />
        )}
      </button>
    </div>
  );
};

export default AdminDatabase;
