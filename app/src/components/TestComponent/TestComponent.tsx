import useTestComponent from "./useTestComponent";

function TestComponentDatabases() {
  const {content} = useTestComponent("databases");
  return content;
}

function TestComponentCollections() {
  const {content} = useTestComponent("collections");
  return content;
}

export default function TestComponent({ dbQuery }: { dbQuery: string }) {
  return (
    <>
      {dbQuery === "databases" ? (
        <div style={{marginTop: "30px", marginBottom: "30px"}}>
          <TestComponentDatabases />
        </div>
      ) : (
        <div style={{marginTop: "30px", marginBottom: "30px"}}>
          <TestComponentCollections />
        </div>
      )}
    </>
  )
}