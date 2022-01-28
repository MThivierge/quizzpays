import { useEffect, useState } from "react/cjs/react.development";
import { Button } from "semantic-ui-react";
import Question from "./Question/Question";
import Reponse from "./Reponse/Reponse";
import { NavLink, Redirect } from "react-router-dom";

//Nous avons fait un fichier json au cas où l'API ne fonctionne pas
//import paysData from "../Json/quiz.json";


const Quizz = (props) => {

    //Récupération du type de quizz (soit capitale, soit drapeau)
    const type = props.match.params.typeQuizz;

    //Booléen pour savoir si le quizz est lancé ou non
    const [lance, setLance] = useState(false);

    //Table contenant les données récupérées de l'API
    const [pays, setPays] = useState([]);

    //Index servant à savoir à quel groupe de 4 pays le quizz est rendu dans la table des pays
    const [index, setIndex] = useState(0);

    //Table contenant les 4 pays de la question active
    const [propositions, setPropositions] = useState(['', '', '', '']);

    //Index indiquant laquelle des propositions est la réponse active
    const [reponse, setReponse] = useState(Math.floor(Math.random() * 4));

    //Booléen pour savoir si le joueur a répondu
    //Quand le joueur a répondu, on affiche les réponses
    const [repondu, setRepondu] = useState(false);

    //Total du score
    const [score, setScore] = useState(0);

    //state qui prend la valeur du selected dans le composant question
    const [selection, setSelection] = useState(0);

    //Fonction pour la requête de l'API
    const onClickCategorie = (region) => {
        fetch(`https://restcountries.com/v3.1/region/${region}?fields=name,capital,flags,currencies,languages,population`)
            .then((response) => response.json())
            .then((data) => setPays(
                //On récupère aléatoirement 32 pays pour avoir 8 questions (4 pays par question)
                data.sort(() => Math.random() - Math.random()).slice(0, 32)
            ));

        //Si l'API ne fonctionne pas:
        //setPays(paysData.data);
    }

    //useEffect utilisé pour entrer les premières valeurs du tableau propositions
    useEffect(() => {
        if (index < pays.length){
            setPropositions(pays.slice(index, index + 4));
            setLance(true); //Le quizz est lancé
        } 
    }, [pays])

    //useEffect utilisé pour changer le state proposition et le state reponse quand l'index change
    useEffect(() => {
        setReponse(Math.floor(Math.random() * 4));
        if (index < pays.length) setPropositions(pays.slice(index, index + 4));
    }, [index]);

    //Fonction qui retourne la question active selon le type de quizz choisi
    const poserQuestion = () => {

        if (type === "capitale") return (<h2>{propositions[reponse].capital} est la capitale de quel pays?</h2>);

        else if (type === "drapeau") return (
            <div>
                <h2>À quel pays appartient ce drapeau?</h2>
                {propositions[reponse].flags ? <img src={propositions[reponse].flags.svg} alt="Désolé, un problème est survenu" height='250px' /> : undefined}
            </div>
        );

    }

    if (type !== "capitale" && type !== "drapeau") {
        //Si le type donné ne correspond pas à "capitale" ou "drapeau", le joueur a accédé au composant quizz sans choisir le type, on le redirige donc vers l'accueil.
        return (
            <Redirect to="/" />
        )
    }
    else {
        return (
            <div>
                {// Si le state lance est à true, le joueur a choisi une catégorie.
                lance ?

                    // Si la longueur du tableau pays est plus grande que 0, le téléchargement des données de l'API est terminé. Sinon le téléchargement n'est pas terminé
                    pays.length > 0 ?

                        // Si l'index est plus petit que la longueur du tableau, il reste des question à poser. Sinon l'index est arrivé au bout du tableau et on affiche le score
                        index < pays.length ?
                            <div>
                                {poserQuestion()}
                                
                                {//Si le state répondu est à false, on affiche les choix de la question.
                                !repondu ?
                                    <Question propositions={propositions} reponse={reponse} onSetRepondu={setRepondu} onSetScore={setScore} leScore={score} onSetSelection={setSelection} />
                                    : //Si le state repondu est à true on affiche la réponse
                                    <Reponse propositions={propositions} reponse={reponse} onSetRepondu={setRepondu} onSetIndex={setIndex} index={index} selectionJoueur={selection} />
                                }
                            </div>
                            : // Si l'index est arrivé au bout du tableau, on affiche le score
                            <div>
                                <h1>Votre score: </h1>
                                <h2>{score}/{pays.length / 4}</h2>

                                {/* Bouton qui redirige vers l'accueil*/}
                                <Button class="ui button"as={NavLink} to="/">Faire un autre quizz</Button>

                            </div> /* Fin index < pays.length ?*/

                        : // Si la longueur du tableau pays est plus petite que 0, le téléchargement des données de l'API n'est pas terminé 
                        <p>Téléchargement des questions...</p> /* Fin pays.length > 0 ?*/

                    : // Si le state lance est à false, le joueur doit choisir une catégorie
                    <div>
                        <h2>Choisissez une catégorie:</h2>
                        <Button onClick={() => onClickCategorie('africa')}>Afrique</Button>
                        <Button onClick={() => onClickCategorie('americas')}>Amériques</Button>
                        <Button onClick={() => onClickCategorie('asia')}>Asie</Button>
                        <Button onClick={() => onClickCategorie('europe')}>Europe</Button>

                    </div> /* Fin lance ?*/
                }
            </div>
        )
    }
}

export default Quizz;