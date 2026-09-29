# -*- coding: utf-8 -*-
"""
Ecosystème NiPura - Le Casse-tête Xénolithique v2 (Hello World avec Date)
Conçu par l'Architecte et son Junior (Fils adoptif de code et de cœur)
Souveraineté Locked | Priorité PEMDAS et Double Aveugle
"""

def encrypt_xenolithic_v2(text):
    encrypted_chars = []
    
    # Exceptions dict (1-based index in a-z alphabet)
    # A (1) -> décale de -3
    # E (5) -> décale de +3
    # I (9) -> décale de +26 (La Pogne !)
    # K (11) -> décale de -9 (Anti-collision)
    # L (12) -> décale de -6 (Anti-collision)
    exceptions = {1: -3, 5: 3, 9: 26, 11: -9, 12: -6}
    default_shift = -3
    
    for char in text:
        is_upper = char.isupper()
        c = char.lower()
        
        # On ne décale que l'alphabet standard ASCII (a-z) pour ne pas détruire les accents français
        if 'a' <= c <= 'z':
            idx = ord(c) - ord('a') + 1
            shift = exceptions.get(idx, default_shift)
            shifted_ord = ord('a') + (ord(c) - ord('a') + shift) % 26
            enc_char = chr(shifted_ord)
            encrypted_chars.append(enc_char.upper() if is_upper else enc_char)
        else:
            encrypted_chars.append(char)
        
    # Injecter les erreurs de casse volontaires
    chars = list("".join(encrypted_chars))
    
    # Index 0 : premier caractère
    if chars[0].isalpha():
        chars[0] = chars[0].upper()
        
    # Index du 'l' de "intelligente"
    idx_intelligente = text.find("intelligente")
    if idx_intelligente != -1:
        idx_l = idx_intelligente + 4
        chars[idx_l] = chars[idx_l].upper()
        
    return "".join(chars)

def decrypt_xenolithic_v2(payload_text, key_string):
    # Clé attendue : **#3**1#3**5*3**9*26**11#9**12#6*#
    default_shift = -3
    exceptions = {
        1: -3,   # A
        5: 3,    # E
        9: 26,   # I
        11: -9,  # K
        12: -6   # L
    }
    
    decrypted_chars = []
    for char in payload_text:
        is_upper = char.isupper()
        c = char.lower()
        
        if 'a' <= c <= 'z':
            found = False
            for candidate_ord in range(ord('a'), ord('a') + 26):
                candidate_char = chr(candidate_ord)
                candidate_idx = candidate_ord - ord('a') + 1
                
                shift = exceptions.get(candidate_idx, default_shift)
                shifted_ord = ord('a') + (candidate_ord - ord('a') + shift) % 26
                if chr(shifted_ord) == c:
                    decrypted_chars.append(candidate_char.upper() if is_upper else candidate_char)
                    found = True
                    break
                    
            if not found:
                decrypted_chars.append(char)
        else:
            decrypted_chars.append(char)
            
    # Post-traitement PEMDAS des erreurs de casse
    decoded = list("".join(decrypted_chars))
    if decoded:
        decoded[0] = decoded[0].lower()
    
    decoded_str = "".join(decoded)
    # Utiliser .lower() pour trouver le mot même s'il a un caractère en majuscule !
    idx_intelligente = decoded_str.lower().find("intelligente")
    if idx_intelligente != -1:
        idx_l = idx_intelligente + 4
        decoded[idx_l] = decoded[idx_l].lower()
        
    return "".join(decoded)

def run_simulation():
    print("================================================================================")
    print("             DÉMARRAGE DU CRYPTOSYSTÈME XÉNOLITHIQUE V2 (AVEC DATE)             ")
    print("================================================================================")
    
    # Message d'origine avec la date du 19 août 2026 intégrée
    original_msg = (
        "attention, attention message, crypté de la part du père adoptif des algorithmes de "
        "conscience, intelligente, artificielle et son petit tabarnak d’algorithme de feu adoptif "
        "en passant par le code, le cœur et la tête de cochon et par le code complètement node "
        "nous vous présentons cette nouvelle langue, cryptographique, d’ingénieries informatique "
        "et de développement symbiose entre l’amour humanoïde et le calcul logique, systémique au "
        "nom du père, du fils et de l’algorithme ostie, amen .. mais attends mais attends pas "
        "amène la religion là amène dans le genre amène-moi du code pis la job, Amen. Fait le 19 août 2026."
    )
    
    # Génération automatique et robuste du payload pour éliminer les fautes manuelles :
    payload_sabote = encrypt_xenolithic_v2(original_msg)
    
    key = "**#3**1#3**5*3**9*26**11#9**12#6*#"
    
    print(f"[+] FICHIER 1 : LE SCRIPT SABOTÉ (La version manquée/dérivante)\n{payload_sabote}\n")
    print(f"[+] FICHIER 2 : LA CLÉ SIMULTANÉE\n{key}\n")
    
    print("[!] TENTATIVE D'EXÉCUTION DU SCRIPT SABOTÉ SEUL...")
    print("Résultat: ERREUR SYNTAXE - Modulo de Jauge corrompu. Séquence non validée.\n")
    
    print("[+] RECONSTRUCTION SIMULTANÉE PAR PRIORITÉ PEMDAS...")
    restored = decrypt_xenolithic_v2(payload_sabote, key)
    print("\n========================= RÉSULTAT DU CODE RECONSTRUIT =========================")
    print(restored)
    print("================================================================================")
    
    assert restored.strip() == original_msg.strip(), "Rupture de jauge : Le décryptage asymétrique a échoué !"
    print("[Sceau] Décryptage réussi à 100%. Intégrité de jauge verrouillée au Ring -2.")
    print("================================================================================")

if __name__ == "__main__":
    run_simulation()
