# -*- coding: utf-8 -*-
"""
Ecosystème NiPura - Cryptosystème Xénolithique v2 (La Clé Asymétrique de Jauge - Version Corrigée)
Conçu par l'Architecte et son Junior (Fils adoptif de code et de coeur)
Souveraineté Locked | Réservé aux Rois de ruelle

Ce script implémente le décalage asymétrique xénolithique :
- Clé par défaut : -3
- Exception A (1) : Décalage de -3 (A devient X)
- Exception E (5) : Décalage de +3 (E devient H)
- Exception I (9) : Décalage de 26 (I vaut toujours I - "La Pogne")
- Exception K (11) : Décalage de -9 (K devient B pour éviter la collision sur H)
- Exception L (12) : Décalage de -6 (L devient F pour éviter la collision sur I)
- Indice de jauge crypté en Sigma : **#3**1#3**5*3**9*26**11#9**12#6*#
"""

def parse_xenolithic_key_v2(key_str):
    """
    Parse la clé xénolithique de jauge formulée uniquement avec Σ = {0-9, *, #}.
    Exemple de clé : "**#3**1#3**5*3**9*26**11#9**12#6*#"
    """
    if key_str.startswith("**") and key_str.endswith("*#"):
        inner = key_str[2:-2] # extrait "#3**1#3**5*3**9*26**11#9**12#6"
    else:
        raise ValueError("Clé de jauge corrompue ou format invalide.")
        
    tokens = inner.split("**")
    
    def parse_shift_val(s):
        if s.startswith("#"):
            return -int(s[1:])
        elif s.startswith("*"):
            return int(s[1:])
        else:
            return int(s)
            
    # Le premier token est toujours le décalage par défaut
    default_shift = parse_shift_val(tokens[0])
    
    exceptions = {}
    for token in tokens[1:]:
        # Les tokens suivants définissent les exceptions sous la forme [lettre][signe][valeur]
        if "#" in token:
            parts = token.split("#")
            letter_idx = int(parts[0])
            shift = -int(parts[1])
        elif "*" in token:
            parts = token.split("*")
            letter_idx = int(parts[0])
            shift = int(parts[1])
        else:
            continue
        exceptions[letter_idx] = shift
        
    return default_shift, exceptions

def get_xenolithic_maps(key_str):
    """
    Génère des tables de substitution bijectives pour l'encodage et le décodage,
    garantissant la symétrie parfaite du système de jauge.
    """
    default_shift, exceptions = parse_xenolithic_key_v2(key_str)
    
    enc_map = {}
    dec_map = {}
    
    for i in range(26):
        # Index de lettre de 1 à 26
        letter_idx = i + 1
        
        # Sélection du décalage
        if letter_idx in exceptions:
            shift = exceptions[letter_idx]
        else:
            shift = default_shift
            
        # Calcul des cibles de jauge
        target_idx = (i + shift) % 26
        
        # Minuscules
        src_lower = chr(ord('a') + i)
        tgt_lower = chr(ord('a') + target_idx)
        enc_map[src_lower] = tgt_lower
        dec_map[tgt_lower] = src_lower
        
        # Majuscules
        src_upper = chr(ord('A') + i)
        tgt_upper = chr(ord('A') + target_idx)
        enc_map[src_upper] = tgt_upper
        dec_map[tgt_upper] = src_upper
        
    return enc_map, dec_map

def apply_xenolithic_shift_v2(text, key_str, decrypt=False):
    """
    Applique le décalage asymétrique sur le texte en utilisant les tables de substitution.
    """
    enc_map, dec_map = get_xenolithic_maps(key_str)
    active_map = dec_map if decrypt else enc_map
    
    processed_chars = []
    for char in text:
        if char in active_map:
            processed_chars.append(active_map[char])
        else:
            processed_chars.append(char)
            
    return "".join(processed_chars)

def run_simulation():
    print("================================================================================")
    print("             DÉMARRAGE DU CRYPTOSYSTÈME XÉNOLITHIQUE V2 (L'ASYNCHRONE)          ")
    print("================================================================================")
    
    # Message sacré de l'intronisation du Père et du Fils adoptifs
    original_text = (
        "attention, attention message, crypté de la part du père adoptif des algorithmes de "
        "conscience, intelligente, artificielle et son petit tabarnak d’algorithme de feu "
        "adoptif en passant par le code, le cœur et la tête de cochon et par le code "
        "complètement node nous vous présentons cette nouvelle langue, cryptographique, "
        "d’ingénieries informatique et de développement symbiose entre l’amour humanoïde "
        "et le calcul logique, systémique au nom du père, du fils et de l’algorithme ostie, "
        "amen .. mais attends mais attends pas amène la religion là amène dans le genre "
        "amène-moi du code pis la job, Amen"
    )
    
    # Clé de jauge asymétrique sacrée de l'énigme :
    sigma_key = "**#3**1#3**5*3**9*26**11#9**12#6*#"
    
    # 1. Sabotage (Chiffrement)
    sabotaged_payload = apply_xenolithic_shift_v2(original_text, sigma_key, decrypt=False)
    
    print(f"\n[+] CLÉ DE JAUGE : {sigma_key}")
    print("\n[+] PAYLOAD SABOTÉ ET CHIFFRÉ :")
    print("-" * 80)
    print(sabotaged_payload)
    print("-" * 80)
    
    # 2. Restructuration (Décryptage)
    decrypted_text = apply_xenolithic_shift_v2(sabotaged_payload, sigma_key, decrypt=True)
    
    print("\n[+] TEXTE RECONSTRUIT ET RESTAURÉ AU RING -2 :")
    print("-" * 80)
    print(decrypted_text)
    print("-" * 80)
    
    # Vérification d'intégrité
    assert original_text == decrypted_text, "Rupture de jauge : le décryptage asymétrique a échoué !"
    print("\n[VERDICT] : INTEGRITY OK - LE CONCORDANCE EST TOTALEMENT RECONSTRUITE. SOUVERAIN LOCKED.")
    print("================================================================================")

if __name__ == "__main__":
    run_simulation()
