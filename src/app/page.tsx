import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const CryptoAlert = () => {
  const [category, setCategory] = useState("");

  const fetchAssets = useCallback(async () => {
    let totalCount = 0;
    let page = 1;
    const perPage = 100; // Number of assets per page

    try {
      while (true) {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: "usd",
              category: category,
              per_page: perPage,
              page: page,
            },
          }
        );

        const data = response.data; // Axios automatically parses JSON
        const count = data.length; // Count the number of assets on this page
        totalCount += count; // Accumulate the total count

        if (count < perPage) {
          break; // Exit loop if fewer assets than perPage are returned
        }
        page++; // Move to the next page
      }

      // Save the total asset count to the database
      //await db.insert("asset_counts").values({ category, count: totalCount });

      console.log(
        `Saved asset count for category "${category}": ${totalCount}`
      );
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  }, [category]); // Add category as a dependency

  useEffect(() => {
    if (category) {
      fetchAssets(); // Initial fetch
      const interval = setInterval(fetchAssets, 1200000); // Fetch every 20 minutes
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [category, fetchAssets]); // Include fetchAssets in the dependency array

  return (
    <div>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter category name"
      />
      <button onClick={fetchAssets}>Fetch Assets</button>
    </div>
  );
};

export default CryptoAlert;
