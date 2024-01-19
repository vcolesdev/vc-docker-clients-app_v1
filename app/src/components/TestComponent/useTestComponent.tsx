import { useEffect, useState } from "react";

interface ICustomResponse {
  data: any,
  message: string,
  route: string,
  timestamp: Date | null
}

let customResponse: ICustomResponse = {
  data: null,
  message: "",
  route: "",
  timestamp: null,
};

/**
 * Custom hook for TestComponent to test the connection to the Express server.
 * Only to be used with TestComponent. Not intended for use with other components.
 * @param type - The type of data to fetch from the server. Either "databases" or "collections".  This reflects the dbQuery prop of TestComponent.
 */
export default function useTestComponent(type: string) {
  let content;
  const component: string = `TestComponent${type === "databases" ? "Databases" : "Collections"}`;

  const initialState = customResponse;
  const [data, setData] = useState<typeof initialState>(initialState);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from the server
  useEffect(() => {
    const endpoint = type;
    const printErrMsg = (error: any) => `Error fetching data from ${component}'s useEffect(): ${error}`;

    if (endpoint !== "databases" && endpoint !== "collections") {
      throw new Error(`Invalid endpoint: ${endpoint}. Please choose "collections" or "databases".`);
    }

    const fetchData = async () => {
      fetch(`http://api.clientsapp.local:8080/${endpoint}/`)
        .then(res => res.json())
        .then(json => {
          console.log(`Response: `, json);
          setData(json);
        });
    };
    fetchData()
      .catch((error) => console.error(printErrMsg(error)))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  content = (
    <>
      <h2>Hello, from <code>{component}</code></h2>
      <p><code>{component}</code> is used to test the connection to the Express server.</p>
      <div>
        {isLoading ? (
          <p>Loading data from the server...</p>
        ) : (
          <>
            <h3>Received data from the server:</h3>
            {data && (<p>Message: <code>{data.message}</code></p>)}
            {data && (<p>Route: <code>{data.route}</code></p>)}
            {data.data ? (
              <>
                <div>
                  <p>Data:</p>
                </div>
              </>
            ) : (
              <p>No data received from the server.</p>
            )}
          </>
        )}
      </div>
    </>
  );

  return {
    content,
    data,
    initialState,
    isLoading,
    setData,
    setIsLoading,
  };
}