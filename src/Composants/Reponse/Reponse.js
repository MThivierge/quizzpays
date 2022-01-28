import React from 'react';
import { Button, Card, Image, List } from "semantic-ui-react";
import './Reponse.css';


const Reponse = ({ propositions, reponse, onSetRepondu, onSetIndex, index, selectionJoueur }) => {

    //Click pour passer à la prochaine question
    const nextClickHandler = (e) => {

        //On remet repondu à false
        onSetRepondu(false);

        //Incrémentation de l'index
        onSetIndex(index + 4);
    }

    return (
        <div >
            <h3>Réponse:</h3>
            <div>
                <Card.Group className="centrer">

                    {/* Affichage des choix de réponses avec un code de couleur selon quel réponse est bonne et lesquels sont les mauvaises */}
                    {propositions.map((choix, i) => (

                        //Conteneur servant pour les codes de couleur des réponses. 
                        //repIdentique (Bleu): le joueur a sélectionné la bonne réponse, bonneRep (Vert): c'était la bonne réponse, mauvaiseRep (Rouge): mauvaises réponses
                        <section className={i === reponse ? (i === selectionJoueur ? "repIdentique" : "bonneRep") : (i === (selectionJoueur) ? "mauvaiseRep" : "") } key={i}>

                            {/* Carte contenant les informations de chaque pays proposé comme choix de réponse */}
                            <Card fluid className="carte">
                                <Card.Content >
                                    {/* Le drapeau */}
                                    <Image src={choix.flags.svg} alt={`${choix.name.common} flag`} />
                                </Card.Content>
                                <Card.Content >
                                    {/* Le nom du pays */}
                                    <Card.Header>{choix.name.common}</Card.Header>
                                    <List>
                                        <List.Item><strong>Nom officiel :</strong> {choix.name.official}</List.Item>
                                        {/* La capitale */}
                                        <List.Item><strong>Capitale :</strong> {choix.capital[0]}</List.Item>

                                        {/*Les langues (un pays peut avoir plusieurs langues) */}
                                        <List.Item><strong>Langues :</strong>
                                            <List.List >
                                                {Object.keys(choix.languages).map((langue, idx) => (
                                                    <List.Item className="listeItem" key={`langue${idx}`}>{langue}</List.Item>
                                                ))}
                                            </List.List>
                                        </List.Item>

                                        {/* La population */}
                                        <List.Item><strong>Population :</strong> {choix.population.toLocaleString('fr-FR')} habitants</List.Item>

                                        {/*Le nom et le symbole de chaque monnaie (un pays peut avoir plusieurs monnaies) */}
                                        <List.Item><strong>Monnaies :</strong>
                                            <List.List >
                                                {Object.entries(choix.currencies).map(([key, monnaie], idx) => (
                                                    <List.Item className="listeItem" key={`monnaie${idx}`}>{monnaie.name} {monnaie.symbol !== "" ? `(${monnaie.symbol})` : ""}</List.Item>
                                                ))}
                                            </List.List>
                                        </List.Item>

                                    </List>
                                </Card.Content>
                            </Card>
                        </section>
                    ))
                    }
                </Card.Group>
            </div>
            
            <Button className="button" onClick={() => nextClickHandler()}>Suivant</Button>
        </div>
    );
}

export default Reponse;