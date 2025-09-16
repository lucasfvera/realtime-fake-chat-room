import { Dashboard } from "./pages/Dashboard";
import { Deals } from "./pages/Deals";


export interface RouterProps {
    route: 'dashboard' | 'deals'
}

export const Router = ({ route }: RouterProps) => {
    let Route;



    switch (route) {
        case "dashboard":
            Route = Dashboard
            break;
        case "deals":
            Route = Deals
            break;

    }

    return <Route />
}