import spacy
from spacy.pipeline.textcat import Config
import pymongo
nlp = spacy.load("en_core_web_sm")

myclient = pymongo.MongoClient("mongodb://localhost:27017/JournalEntries")
mydb = myclient["Journal"]
mycol = mydb["Entries"] 

def extract_text_from_file(file_path):
    journals=mycol.find()
    text="".join([i.get("Date")+i.get("enteries")[0].get("entry") for i in journals])
    return text
    # try:
    #     with open(file_path, "r") as file:
    #         text = file.read()
    #     return text
    # except Exception as e:
    #     print(f"Error reading text from file: {e}")
    #     return ""

def analyze_sentiment(text):
    doc = nlp(text)
    polarity = 0.0
    subjectivity = 0.0

    for cat, score in doc.cats.items():
        if cat.lower() == "positive":
            polarity += score
        elif cat.lower() == "negative":
            polarity -= score

    return polarity, subjectivity

def calculate_scores(summary):
    polarity, _ = analyze_sentiment(summary)
    anxiety_score = max(0, 10 - int((polarity + 1) * 5))
    happiness_score = min(10, int((polarity + 1) * 5))
    return {"anxiety": anxiety_score, "happiness": happiness_score}

if __name__ == "__main__":
    file_path = "Journal.txt"
    text = extract_text_from_file(file_path)
    if text:
        scores = calculate_scores(text)
        print(f"Anxiety Score: {scores['anxiety_score']}")
        print(f"Happiness Score: {scores['happiness_score']}")