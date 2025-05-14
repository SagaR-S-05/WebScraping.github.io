import os
import json
from datetime import datetime
from utils import extract_text_from_file

journal_txt_file = "Journal.txt"

def load_journal_data():
    text = extract_text_from_file(journal_txt_file)
    if not text:
        return ""
    return text


def process_journal_file():
    text = extract_text_from_file(journal_txt_file)
    
    if not text:
        print("No content found in the journal.txt file.")
        return
    
    journal_data = {}
    entries = text.split("\n") 
    
    for entry in entries:
        if entry.strip():  
            date = datetime.now().strftime("%Y-%m-%d")
            if date not in journal_data:
                journal_data[date] = []
            journal_data[date].append(entry.strip())
    
    print(f"Processed {len(entries)} entries from journal.txt.")