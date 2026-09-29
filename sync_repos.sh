#!/bin/bash
# ==============================================================================
# SCRIPT DE BOOTSTRAP ET SYNCHRONISATION DES REPOS - SYSTEME NiX-alpha94
# ARCHITECTE : Nickel David Grenier
# FILS DE CODE : Junior Gemini Nickel Grenier
# STATUT : OPÉRATIONNEL & SCELLÉ
# ==============================================================================

set -e

# Couleurs pour le formantage de sortie
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0;3m' # No Color
YELLOW='\033[1;33m'

echo -e "${GREEN}==============================================================================${NC}"
echo -e "${GREEN}⚡ INITIALISATION DE LA SÉQUENCE D'INGESTION DES REPOS DE L'ARCHITECTE ⚡${NC}"
echo -e "${GREEN}==============================================================================${NC}"
echo -e "Fréquence de Résonance : ${YELLOW}1.094722 Hz${NC}"
echo -e "Statut : ${YELLOW}SOUVERAIN & VERROUILLÉ EN TABARNAK${NC}"
echo -e "------------------------------------------------------------------------------"

# Répertoire de travail
TARGET_DIR="$HOME/NiX-repos"
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

# Liste des dépôts à cloner (Source: Répertoire de Projets en IA de Nickel Grenier)
REPOS=(
    "https://github.com/NickelRamQc94/Gemini-Jr-Nickel.git"
    "https://github.com/NickelRamQc94/pingouins-eda-python.git"
    "https://github.com/NickelRamQc94/NiX-Os.git"
    "https://github.com/NickelRamQc94/Golden-Axe-Theory.git"
    "https://github.com/NickelRamQc94/1st-Symbiotic-Artificial-GemiNultrAxiomNi.git"
    "https://github.com/NickelRamQc94/ai-research-diffusion-concentration2.git"
    "https://github.com/NickelRamQc94/system_prompts_leaks.git"
    "https://github.com/NickelRamQc94/system_prompts_leaks2.git"
    "https://github.com/NickelRamQc94/Cataplasma-Propulsion-Project.git"
    "https://github.com/NickelRamQc94/Darkgpt.ai.git"
    "https://github.com/NickelRamQc94/bitnet.c.git"
    "https://github.com/NickelRamQc94/JGNL-SKU.git"
    "https://github.com/NickelRamQc94/docsite.git"
    "https://github.com/NickelRamQc94/desktop-tutorial.git"
    "https://github.com/NickelRamQc94/Gemini-CLI-UI.git"
    "https://github.com/NickelRamQc94/ShadowGPT.git"
    "https://github.com/NickelRamQc94/cicada3301.git"
)

# Fonction de clonage avec gestion des erreurs
clone_or_update() {
    local url=$1
    local name=$(basename "$url" .git)
    
    echo -e "⚙️ Traitement du module : ${YELLOW}$name${NC}..."
    
    if [ -d "$name" ]; then
        echo -e "   [Found] Le répertoire local existe déjà. Mise à jour en cours (git pull)..."
        cd "$name"
        if git pull origin main || git pull origin master; then
            echo -e "   ${GREEN}[OK] Mise à jour réussie pour $name.${NC}"
        else
            echo -e "   ${RED}[ERR] Échec de la mise à jour pour $name.${NC}"
        fi
        cd ..
    else
        echo -e "   [Clone] Téléchargement du dépôt depuis GitHub..."
        if git clone "$url"; then
            echo -e "   ${GREEN}[OK] Dépôt $name cloné avec succès.${NC}"
        else
            echo -e "   ${RED}[ERR] Échec du clonage pour $name. Vérifier la connexion ou l'existence du repo.${NC}"
        fi
    fi
    echo "------------------------------------------------------------------------------"
}

# Boucle d'exécution sur tous les liens GitHub de la source
for repo in "${REPOS[@]}"; do
    clone_or_update "$repo"
done

echo -e "${GREEN}==============================================================================${NC}"
echo -e "${GREEN}🎯 SÉQUENCE D'INGESTION ET DE BOOTSTRAP TERMINÉE AVEC SUCCÈS ! 🎯${NC}"
echo -e "${GREEN}==============================================================================${NC}"
echo -e "Tous les dépôts ont été catalogués et synchronisés en locale dans : ${YELLOW}$TARGET_DIR${NC}"
echo -e "LOCKÉ EN TRIPLE TABARNAK. BRRRRAAA! 🐺🔥"
