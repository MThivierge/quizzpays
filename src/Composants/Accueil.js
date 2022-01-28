import { NavLink } from "react-router-dom";
import { Button} from "semantic-ui-react"

const Accueil = () => {

    return (
        <div>
            <h2>Choisissez le type de quizz : </h2>
            {/* Bouton qui redirige vers le quizz des capitales*/}
            <Button as={NavLink} to="/quizz/capitale">Les capitales</Button>

            {/* Bouton qui redirige vers le quizz des drapeaux*/}
            <Button as={NavLink} to="/quizz/drapeau">Les drapeaux</Button>
            
        </div>
    )
}

export default Accueil;