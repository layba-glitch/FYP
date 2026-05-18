import joblib

# Load both versions
tok1 = joblib.load('models/dl/tokenizer.pkl')
tok2 = joblib.load('models/dl/tokenizer2.pkl')
tok3 = joblib.load('models/dl/tokenizer_backend.pkl')

# Let's check a "Red Flag" word like 'urgent'
# Most job scam datasets have 'urgent' in the top 50 words
print(f"Tokenizer 1 index for 'urgent': {tok1.word_index.get('urgent')}")
print(f"Tokenizer 2 index for 'urgent': {tok2.word_index.get('urgent')}")
print(f"Tokenizer 3 index for 'urgent': {tok3.word_index.get('urgent')}")