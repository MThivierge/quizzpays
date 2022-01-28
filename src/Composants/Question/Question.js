import { Button } from "semantic-ui-react";
import { useState } from "react";
import "./Question.css";

const Question = ({ propositions, reponse, onSetRepondu, onSetScore, leScore, onSetSelection }) => {

    //Message d'erreur
    const [error, setError] = useState('');

    //Pour récupérer la sélection du joueur
    const [selected, setSelected] = useState('');

    //Effet sur "CHANGEMENT"
    const changeHandler = (e) => {
        setSelected(e.target.value);

        //POUR ENLEVER L'ERREUR du manque de sélection
        if (error) {
            setError('');
        }

    }

    //Fonction quand le joueur clique sur le bouton valider
    const validerClickHandler = () => {

        //Si le joueur n'a rien sélectionné on affiche un message d'erreur
        if (selected === '') { return setError('SVP faites une sélection!'); }

        else {
            //Pour dire que le joueur a répondu
            onSetRepondu(true);

            //Incrémentation du score
            if (parseInt(selected) === reponse) {
                onSetScore(leScore + 1);
            }

            //envois de la reponse du joueur pour l'affichage dans Reponse.js
            onSetSelection(parseInt(selected));
        }
    }

    return (
        <div>

            {/* Affichage des choix de réponses */}
            <div>
                {propositions.map((choix, i) => (
                    <label className="radio has-background-light" key={i}>
                        <input style={{ marginRight: "5px" }} type="radio" name="answer" value={i} onChange={changeHandler} />
                        {choix.name.common}
                    </label>
                ))}
            </div>

            {/* Si le state erreur n'est pas vide, on affiche le message d'erreur */}
            {error && <p>{error}</p>}

            <Button onClick={validerClickHandler} margin="10px">Valider</Button>
        </div>
    )
}

export default Question;