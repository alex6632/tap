# Modules utilisés

Mongoose
-------
Mongoose joue le rôle d'orm. Il permet une meilleure utilisation des requêtes et une simplification du code. Avec ses propriété pré-concues, le code est plus lisible et les performances sont toutes aussi bonnes.

bcrypt
-------
Ce module permet d'encrypter une chaine de caractère. Je l'ai utilisé pour générer un hash à partir du mot de passe entré par l'utilisateur et ainsi pouvoir comparer les 2 mots de passe encrypté et ne jamais stocker le mot de passe en clair.

dotenv
-------
Ce module m'a permis de stocker des valeurs générique à tout le projet tel que le port, l'url de mongo ainsi que le jwt secret. Il n'est jamais commité et peut également permettre de différencier les environnements de travail (developpement vs production).

jsonwebtoken
-------
Le classique pour génerer un token qui permet par la suite de vérifier que l'utilisateur a bien accès à la page qu'il tente d'accéder et vérifier qu'il est bien authentifié.

nodemon
-------
J'ai utilisé ce module pour ne pas avoir à relancer le serveur node.js à chaque modification.

passport
-------
Ce module me permet la gestion de l'authentification ainsi que la sécurisation des routes API.