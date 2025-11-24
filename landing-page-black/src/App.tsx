import Description from "./components/Description";

function App() {
  return (
    <div
      className="bg-[url(./assets/Background.png)] bg-cover sm:bg-center bg-no-repeat min-h-screen w-full max-w-full overflow-x-hidden box-border"
      style={{
        backgroundPosition: "center top",
      }}
      translate="no"
    >
      <Description label="Black" title="Vencendo a Procrastinação" />
    </div>
  );
}

export default App;
