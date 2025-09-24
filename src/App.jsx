import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import GoalDetail from "./pages/GoalDetail";
import NewGoalForm from "./pages/NewGoalForm";

function App () {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/new-goal" element={<NewGoalForm />} />
                <Route path="/goals/:id" element={<GoalDetail />} />
            </Routes>
        </div>
    )
}
export default App;