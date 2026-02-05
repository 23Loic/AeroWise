# 🦉 AeroWize - Biodiversity & Incident System

Système de gestion de la biodiversité et des incidents aéroportuaires avec interface moderne et chatbot IA intégré.

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances**
```bash
npm install
```

2. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

3. **Build pour la production**
```bash
npm run build
```

## 📁 Structure du projet

```
aerowize/
├── index.html              # Point d'entrée HTML
├── package.json            # Dépendances et scripts
├── vite.config.js          # Configuration Vite
└── src/
    ├── main.jsx            # Point d'entrée React
    ├── App.jsx             # Composant principal
    └── App.css             # Styles globaux
```

## 🎨 Fonctionnalités

### Interface principale
- ✅ **Header responsive** avec logo, date picker, filtres et profil utilisateur
- ✅ **Carte interactive** avec marqueurs géolocalisés (incidents, observations, signalements)
- ✅ **Panneau de filtres latéral** (type, espèce, criticité)
- ✅ **Panneau de détails** pour chaque incident avec toutes les informations contextuelles
- ✅ **Chatbot IA intégré** pour l'analyse conversationnelle

### Design
- 🎨 **Thème sombre moderne** avec dégradés subtils
- 🎨 **Glassmorphism** (transparence + blur)
- 🎨 **Animations fluides** (pulse, hover effects)
- 🎨 **Typographie élégante** avec hiérarchie claire
- 🎨 **Palette sobre** : bleus cyan (#0ea5e9) avec accents rouges/verts

### Composants

#### 1. Header
- Logo AeroWize
- Sélecteur de dates
- Badge de filtres actifs
- Indicateur de statut système (Online/Offline)
- Compteur d'agents actifs
- Notifications
- Paramètres
- Avatar utilisateur

#### 2. FilterSidebar
- Filtres par type d'événement (incidents, observations, signalements)
- Filtre par espèce
- Filtre par niveau de risque
- Widget de statistiques en temps réel
- Bouton de réinitialisation

#### 3. MapView
- Carte avec grille de fond
- Marqueurs animés avec effet pulse
- Labels au survol
- Contrôles de couches (Satellite/Topographique)
- Légende avec compteurs
- Toggle vue Marqueurs/Heatmap
- Piste d'aéroport simulée
- Info footer

#### 4. DetailPanel
- Header avec titre et actions
- Badge de risque
- Section espèce avec image et alerte
- Métadonnées (temps, localisation)
- Conditions météo (3 widgets)
- Résumé de l'incident
- Détails additionnels (6 champs)
- Incidents similaires
- Chatbot IA intégré

#### 5. Chatbot
- Header avec icône AI
- Zone de messages scrollable
- Messages utilisateur (alignés à droite, fond bleu)
- Messages assistant (alignés à gauche, fond gris)
- Input avec bouton d'envoi
- Horodatage des messages

## 🔧 Personnalisation

### Couleurs
Les couleurs sont définies via CSS variables dans `App.css` :

```css
:root {
  --bg-primary: #0a0e1a;
  --accent-primary: #0ea5e9;
  --red: #ef4444;
  --green: #10b981;
  /* ... */
}
```

### Données
Les données sont actuellement simulées dans `App.jsx`. Pour connecter à une API :

1. Remplacer le tableau `incidents` par un appel API
2. Utiliser `useEffect` pour charger les données au montage
3. Gérer le state avec `useState` ou un state manager (Redux, Zustand)

## 📊 Prochaines étapes

### Backend
- [ ] Créer API REST ou GraphQL
- [ ] Connecter PostgreSQL + PostGIS
- [ ] Intégrer Neo4j pour le graphe de connaissances
- [ ] Configurer Qdrant pour la recherche vectorielle
- [ ] Implémenter les workflows Agno

### Frontend
- [ ] Intégrer vraie carte Leaflet/Mapbox
- [ ] Ajouter filtres avancés (rayon, dates complexes)
- [ ] Implémenter la vue Heatmap
- [ ] Connecter chatbot à un LLM (Claude, GPT)
- [ ] Ajouter upload de photos
- [ ] Créer formulaire de signalement terrain (PWA mobile)

### DevOps
- [ ] Configurer CI/CD
- [ ] Docker containerization
- [ ] Tests unitaires (Vitest)
- [ ] Tests E2E (Playwright)

## 🛠️ Technologies utilisées

- **Frontend**: React 18, Vite
- **Styles**: CSS pur (pas de framework CSS)
- **Carte**: React-Leaflet (à intégrer)
- **Build**: Vite (rapide, moderne)

## 📝 Notes de développement

### Performance
- Les marqueurs utilisent des `position: absolute` pour éviter le reflow
- Les animations sont en CSS pur (pas de JS) pour de meilleures performances
- Le blur et la transparence utilisent `backdrop-filter` (attention navigateurs anciens)

### Accessibilité
- Tous les boutons sont cliquables au clavier
- Les contrastes de couleurs respectent WCAG AA
- Les labels sont présents sur tous les inputs

### Compatibilité
- Testé sur Chrome 120+, Firefox 120+, Safari 17+
- Support mobile à améliorer (responsive à finaliser)

## 📄 Licence

Projet SAE BUT Informatique 3ème année - AeroWize

---

Développé avec ❤️ pour la gestion de la biodiversité aéroportuaire