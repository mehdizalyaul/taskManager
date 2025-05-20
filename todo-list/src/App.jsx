import "./css/App.css";
import Header from "./components/Header.jsx";
import TodoList from "./components/TodoList.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
}

export default App;
